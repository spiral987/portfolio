'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Illustration } from '@/domain/entities/illustration';
import { IllustrationCard } from '@/app/components/IllustrationCard';
import { IllustrationTimeline } from '@/app/components/IllustrationTimeline';

type Props = {
  illustrations: Illustration[];
};

export const IllustrationGallery = ({ illustrations }: Props) => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [isTimelineVisible, setIsTimelineVisible] = useState(true); //最初は表示
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // イラストの年からユニークな年リストを作成し、降順にソート
  const years = useMemo(() => {
    const uniqueYears = [...new Set(illustrations.map(i => new Date(i.createdAt).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [illustrations]);


  // スクロール時にタイムラインを表示し、一定時間後に非表示にする
  useEffect(() => {
    const handleScroll = () => {
      setIsTimelineVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsTimelineVisible(false);
      }, 1500); // 1.5秒間スクロールがなければ非表示にする
    };

    window.addEventListener('scroll', handleScroll);

    // ページ読み込み2秒後に一度非表示にする
    const initialTimeout = setTimeout(() => {
      setIsTimelineVisible(false);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      clearTimeout(initialTimeout);
    };
  }, []);

  // スクロールを監視してactiveYearを更新するロジック
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = parseInt(entry.target.getAttribute('data-year-anchor')!, 10);
            setActiveYear(year);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // 画面の中央に来たものを判定
        threshold: 0,
      }
    );

    Object.values(yearRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(yearRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [years]);
  
  // 最初の年をアクティブにする
  useEffect(() => {
    if (years.length > 0 && activeYear === null) {
      setActiveYear(years[0]);
    }
  }, [years, activeYear]);

  // 3列の配列を作成
  const columns: Illustration[][] = [[], [], []];

    // イラストを各列に順番に振り分ける
  illustrations.forEach((illustration, index) => {
    columns[index % 3].push(illustration);
  });

  return (
  <div className="relative">
      <div className="flex gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex w-1/3 flex-col gap-4">
            {column.map((illustration, index) => {
               const year = new Date(illustration.createdAt).getFullYear();
               // 各年の最初のイラストにだけアンカーを設置するためのロジック
               const isFirstOfYear = !illustrations.slice(0, colIndex + (index * 3)).some(
                 (prevIllu) => new Date(prevIllu.createdAt).getFullYear() === year
               );

              return(
                <div
                  key={illustration.id}
                  id={isFirstOfYear ? `year-${year}` : undefined}
                  data-year-anchor={year}
                  ref={(el) => {
                    if (isFirstOfYear) {
                      yearRefs.current[year] = el;
                    }
                  }}
                >
                  <IllustrationCard illustration={illustration} />
                </div>
              );
            })}
          </div>
        ))}
        </div>
      <div
        className='fixed right-8 top-1/2 -translate-y-1/2 h-1/2 z-40 transition-opacity duration-300'>
        <IllustrationTimeline years={years} activeYear={activeYear} />
      </div>
      </div>
  );
};
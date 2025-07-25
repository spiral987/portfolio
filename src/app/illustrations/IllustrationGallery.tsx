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
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // イラストの年からユニークな年リストを作成し、降順にソート
  const years = useMemo(() => {
    const uniqueYears = [...new Set(illustrations.map(i => new Date(i.createdAt).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [illustrations]);

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

  let lastYear: number | null = null;

  return (
    <div className="relative">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0">
        {illustrations.map((illustration) => {
          const year = new Date(illustration.createdAt).getFullYear();
          const isFirstOfYear = year !== lastYear;
          lastYear = year;
          
          return (
            <div 
              key={illustration.id} 
              // 各年の最初のカードにアンカーを設置
              id={isFirstOfYear ? `year-${year}` : undefined}
              data-year-anchor={year}
              ref={(el) => (yearRefs.current[year] = el)}
              className="break-inside-avoid" // CSS columnsのバグを避けるための微調整
            >
              <IllustrationCard illustration={illustration} />
            </div>
          );
        })}
      </div>
      <IllustrationTimeline years={years} activeYear={activeYear} />
    </div>
  );
};
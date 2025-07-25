'use client';

type Props = {
  years: number[];
  activeYear: number | null;
};

export const IllustrationTimeline = ({ years, activeYear }: Props) => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-1/2 hidden lg:flex flex-col justify-between items-center z-40">
      <div className="absolute top-0 left-1/2 -ml-[1px] h-full w-[2px] bg-gray-300 dark:bg-gray-700" />
      {years.map((year) => (
        <a
          key={year}
          href={`#year-${year}`} // あとでこのIDを持つ要素にジャンプさせる
          className="relative flex items-center justify-center w-8 h-8"
        >
          <span
            className={`absolute h-3 w-3 rounded-full transition-all duration-300 ${
              activeYear === year
                ? 'bg-blue-500 scale-150'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
          />
          <span
            className={`absolute left-[-60px] text-sm font-bold transition-all duration-300 ${
              activeYear === year
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {year}
          </span>
        </a>
      ))}
    </div>
  );
};
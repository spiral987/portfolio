// src/app/components/HeroHeader.tsx
import { FaChevronDown } from 'react-icons/fa';

// 1. props の型定義を追加
type Props = {
  children?: React.ReactNode; // 子要素を受け取れるようにする (オプション)
};

// 2. props ({ children }) を受け取る
export const HeroHeader = ({ children }: Props) => {
  return (
    <div className="hero-header">
      {/* 3. hero-content で子要素をラップして中央に配置 */}
      {/* globals.css の定義 により、これが中央に表示されます */}
      {children && (
        <div className="hero-content">
          {children}
        </div>
      )}

      <a
        href="#main-content"
        className="absolute bottom-10 right-1/32 -translate-x-1/2 z-10 m-10"
        aria-label="Scroll down to main content"
      >
        {/* ★ アイコンの色も背景に埋もれないよう白に変更します */}
        <FaChevronDown className="text-6xl text-black dark:text-white opacity-70" />
      </a>
    </div>
  );
};
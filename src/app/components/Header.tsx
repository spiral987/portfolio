// src/components/Header.tsx
'use client'; // インタラクティブな機能（メニューの開閉）のため、クライアントコンポーネントにする

import { useState } from 'react';
import Link from 'next/link';

// ハンバーガーメニューのアイコン
const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Portfolio
        </Link>

        {/* ハンバーガーメニューボタン (モバイル用) */}
        <button onClick={toggleMenu} className="hamburger-button">
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* ナビゲーションメニュー */}
        <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <Link href="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/illustrations" onClick={() => setIsOpen(false)}>Illustrations</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};
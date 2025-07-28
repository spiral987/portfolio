'use client';

import { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

export const ThemeToggle = () => {
  // 'light' または 'dark' のテーマ状態を管理
  const [theme, setTheme] = useState('light');

  // コンポーネントが読み込まれた時に、localStorageやOSの設定からテーマを決定
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // themeの状態が変更されたら、<html>タグに 'dark' クラスを付け外しする
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

 return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 border-2 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`absolute inset-y-0 left-0 flex items-center justify-center h-full w-7 transition-transform duration-300 transform ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full bg-white${
            theme === 'dark' ? ' dark:bg-black' : ''
        }`}>
          {theme === 'dark' ? (
            <FaMoon />
          ) : (
            <FiSun />
          )}
        </span>
      </span>
    </button>
  );
};
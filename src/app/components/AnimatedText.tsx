// src/app/components/AnimatedText.tsx
'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js'; // 'typed.js' をインポート

/**
 * "Hi, I'm " に続けて、複数のテキストを
 * タイピング・削除・ループ表示するコンポーネント
 */
export const AnimatedText = () => {
  // Typed.jsがアタッチするDOM要素（入れ替わるテキスト部分）への参照
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        // ★ 1. "I'm " の後ろに来る部分だけを配列にします
        strings: [
          "spiraludon.",
          "an application developer.",
          "an illustrator.", // "illustratr" から修正しました
          "a HCI researcher."
        ],
        typeSpeed: 100,  // タイピングの速さ
        backSpeed: 30,   // バックスペースの速さ

        backDelay: 1500,

        loop: true,     // ループを有効に

        // ★ 2. smartBackspace: false にします
        // (次の文字列との共通部分を残さない設定)
        smartBackspace: false,

        showCursor: true,
        cursorChar: '|',
      });

      // コンポーネントがアンマウントされる時にインスタンスを破棄
      return () => {
        typed.destroy();
      };
    }
  }, []); // 空の配列[]で、マウント時に1回だけ実行

  return (
    <h1
      className="text-4xl md:text-6xl font-bold  drop-shadow-md"
      style={{
        display: 'flex',
        justifyContent: 'center',
        // ★ 複数行になっても中央揃えになるように高さを確保
        minHeight: '7.5rem', // text-6xl (3.75rem) の約2行分
        // ★ テキストが折り返した場合も中央揃えにする
        textAlign: 'center',
        color: '#ffffff',
        mixBlendMode: 'difference',
      }}
    >
      <div>
        {/* whiteSpace: 'pre' で "I'm " の後のスペースが維持されるようにします */}
        <span style={{ whiteSpace: 'pre' }}>Hi, I&apos;m </span>

        {/* Typed.js はこの span の中身だけを書き換えます */}
        <span ref={el} />
      </div>
    </h1>
  );
};
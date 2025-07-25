'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import Image from 'next/image';

// キャラクターの画像を設定
const walkingSprites = [
  '/character.png', // 歩き画像1
  '/cursor.png', // 歩き画像2
];
const idleSprite = '/next.svg'; // 停止時の画像

export const DraggableCharacter = () => {
  // キャラクターの状態を管理
  const [action, setAction] = useState<'walking' | 'idle'>('walking');
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [spriteIndex, setSpriteIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 位置とドラッグの制御
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  // タイマーとアニメーションフレームの参照を保持
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // キャラクターの「次の行動」をランダムに決定するロジック
  useEffect(() => {
    const decideNextAction = () => {
      if (isDragging) return; // ドラッグ中は行動を変えない

      const random = Math.random();
      
      if (random < 0.6) { // 60%の確率で歩き続ける
        setAction('walking');
        // さらに、歩いている時に5%の確率で気まぐれに方向転換
        if (Math.random() < 0.1) {
          setDirection(d => (d === 'left' ? 'right' : 'left'));
        }
      } else if (random < 0.95) { // 35%の確率で立ち止まる
        setAction('idle');
      } else { // 5%の確率で強制的に方向転換して歩き出す
        setAction('walking');
        setDirection(d => (d === 'left' ? 'right' : 'left'));
      }
    };

    // 2〜5秒ごとに、次の行動を決定するタイマー
    const scheduleNextAction = () => {
      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }
      actionTimeoutRef.current = setTimeout(() => {
        decideNextAction();
        scheduleNextAction(); // 次のタイマーを予約
      }, 2000 + Math.random() * 3000); // 2〜5秒のランダムな間隔
    };

    if (!isDragging) {
      scheduleNextAction();
    }

    return () => {
      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }
    };
  }, [isDragging]);


  // キャラクターを実際に動かすアニメーションループ
  useEffect(() => {
    const animate = () => {
      // "walking"状態で、かつドラッグ中でない時だけ動かす
      if (action === 'walking' && !isDragging) {
        const screenWidth = window.innerWidth;
        const characterWidth = 80;
        let currentX = x.get();

        const moveAmount = direction === 'right' ? 0.5 : -0.5; // 少しゆっくりに
        currentX += moveAmount;
        x.set(currentX);

        // パラパラ漫画
        setSpriteIndex((Math.floor(Date.now() / 200)) % walkingSprites.length);
        
        // 画面端での反転
        if (currentX > screenWidth / 2 - characterWidth / 2) {
          setDirection('left');
        } else if (currentX < -screenWidth / 2 + characterWidth / 2) {
          setDirection('right');
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [action, isDragging, direction, x]);


  const startDrag = (event: React.PointerEvent) => {
    setIsDragging(true);
    dragControls.start(event);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // 表示する画像を現在の行動に合わせて決定
  const currentSprite = (action === 'walking' && !isDragging) ? walkingSprites[spriteIndex] : idleSprite;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      onPointerDown={startDrag}
      onDragEnd={stopDrag}
      dragMomentum={false}
      className="fixed bottom-5 left-1/2 z-50 cursor-grab active:cursor-grabbing"
      style={{
        x,
        y,
        scaleX: direction === 'right' ? 1 : -1,
      }}
    >
      <Image
        src={currentSprite}
        alt="Walking Character"
        width={80}
        height={80}
        priority
        className="pointer-events-none"
      />
    </motion.div>
  );
};
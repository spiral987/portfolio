'use client'; // ユーザーの操作を扱うため、クライアントコンポーネントにします

import { motion } from 'framer-motion';
import Image from 'next/image';

export const DraggableCharacter = () => {
  return (
    <motion.div
      drag // このコンポーネントをドラッグ可能にする
      dragMomentum={false} // 慣性をなくし、マウスにピッタリ追従させる
      className="fixed bottom-5 left-1/2 z-50 cursor-grab active:cursor-grabbing"
      style={{ x: "-50%" }} // 中央揃えのための初期位置調整
    >
      <Image
        src="/character.png" // あなたが用意したキャラクターの画像パス
        alt="Draggable Character"
        width={80} // イラストのサイズを調整
        height={80}
        priority // 常に表示される要素なので、優先的に読み込む
        className="pointer-events-none" // 画像自体がクリックイベントを奪わないようにする
      />
    </motion.div>
  );
};
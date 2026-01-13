// src/app/template.tsx
'use client'

import { motion } from 'framer-motion'

// ここにアニメーションのパターンを定義します
const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'tween', duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
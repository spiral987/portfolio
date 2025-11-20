// src/app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 管理画面など隠したいパスがある場合は以下のように記述
      // disallow: '/private/',
    },
    sitemap: 'https://spiral987.vercel.app/sitemap.xml',
  };
}
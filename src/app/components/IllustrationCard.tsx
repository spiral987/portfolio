import { Illustration } from '@/domain/entities/illustration';
import Image from 'next/image';
import Link from 'next/link';

export const IllustrationCard = ({ illustration }: { illustration: Illustration }) => (
  <Link href="#"> {/* TODO: イラスト詳細ページへのリンクを後で追加 */}
    <div className="group block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      {illustration.images.length > 0 && (
        <div className="overflow-hidden">
          <Image
            src={illustration.images[0].url.value}
            alt={illustration.images[0].altText}
            height={300}
            width={300}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{illustration.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate">{illustration.description}</p>
      </div>
    </div>
  </Link>
);
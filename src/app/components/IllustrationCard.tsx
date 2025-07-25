import { Illustration } from '@/domain/entities/illustration';
import Image from 'next/image';
import Link from 'next/link';

export const IllustrationCard = ({ illustration }: { illustration: Illustration }) => (
  <Link 
    href={`/illustrations/${illustration.id}`} 
    className="group block overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-lg"
    data-year={new Date(illustration.createdAt).getFullYear()}
  >
      {illustration.images.length > 0 && (
        <div className="overflow-hidden">
          <Image
            src={illustration.images[0].url.value}
            alt={illustration.images[0].altText}
            height={300}
            width={300}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

  </Link>
);
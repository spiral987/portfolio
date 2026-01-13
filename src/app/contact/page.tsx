// src/app/contact/page.tsx

import { GetContactInfoUseCase } from '@/use-cases/contact/getContactInfoUseCase';
import { FileSystemContactRepository } from '@/infrastructure/repositories/file-system/fileSystemContactRepository';
import { FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiPixiv } from 'react-icons/si';

export default async function ContactPage() {
  const contactRepository = new FileSystemContactRepository();
  const getContactInfoUseCase = new GetContactInfoUseCase(contactRepository);
  const contactInfo = await getContactInfoUseCase.execute();

  return (
    <main>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
          Contact
        </h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            お問い合わせは、以下のメールアドレスまたはSNSまでお気軽にご連絡ください。
          </p>
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-gray-600 dark:text-gray-400" />
              <a href={`mailto:${contactInfo.email.value}`} className="text-blue-500 hover:underline">
                {contactInfo.email.value}
              </a>
            </div>

            {/* GitHub */}
            {contactInfo.githubUrl && (
              <div className="flex items-center gap-4">
                <FaGithub className="text-2xl text-gray-600 dark:text-gray-400" />
                <a href={contactInfo.githubUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {contactInfo.githubUrl.value}
                </a>
              </div>
            )}

            {/* Twitter/X */}
            {contactInfo.twitterUrl && (
              <div className="flex items-center gap-4">
                <FaTwitter className="text-2xl text-gray-600 dark:text-gray-400" />
                <a href={contactInfo.twitterUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {contactInfo.twitterUrl.value}
                </a>
              </div>
            )}

            {/* Pixiv */}
            {contactInfo.pixivUrl && (
              <div className="flex items-center gap-4">
                <SiPixiv className="text-2xl text-gray-600 dark:text-gray-400" />
                <a href={contactInfo.pixivUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {contactInfo.pixivUrl.value}
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
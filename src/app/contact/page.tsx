// src/app/contact/page.tsx

import { GetContactInfoUseCase } from '@/use-cases/contact/getContactInfoUseCase';
import { FileSystemContactRepository } from '@/infrastructure/repositories/file-system/fileSystemContactRepository';

export default async function ContactPage() {
  const contactRepository = new FileSystemContactRepository();
  const getContactInfoUseCase = new GetContactInfoUseCase(contactRepository);
  const contactInfo = await getContactInfoUseCase.execute();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
        Contact
      </h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          お問い合わせは、以下のメールアドレスまたはSNSまでお気軽にご連絡ください。
        </p>
        <div className="space-y-4">
          <p>
            <strong className="font-semibold">Email:</strong>
            <a href={`mailto:${contactInfo.email.value}`} className="ml-2 text-blue-500 hover:underline">
              {contactInfo.email.value}
            </a>
          </p>
          {contactInfo.githubUrl && (
            <p>
              <strong className="font-semibold">GitHub:</strong>
              <a href={contactInfo.githubUrl.value} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                {contactInfo.githubUrl.value}
              </a>
            </p>
          )}
          {contactInfo.twitterUrl && (
            <p>
              <strong className="font-semibold">Twitter/X:</strong>
              <a href={contactInfo.twitterUrl.value} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                {contactInfo.twitterUrl.value}
              </a>
            </p>
          )}
           {contactInfo.pixivUrl && (
            <p>
              <strong className="font-semibold">Pixiv:</strong>
              <a href={contactInfo.pixivUrl.value} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                {contactInfo.pixivUrl.value}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
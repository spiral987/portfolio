// src/app/components/Footer.tsx

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-8 mt-16 text-sm text-gray-500 dark:text-gray-400">
      <p>© {currentYear} spiraludon. All rights reserved.</p>
    </footer>
  );
};
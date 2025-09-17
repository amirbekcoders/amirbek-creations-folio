import { Language } from "./LanguageToggle";

interface FooterProps {
  currentLanguage: Language;
}

const footerContent = {
  en: {
    copyright: "© 2024 Nodirbekov Amirbek. All rights reserved.",
    builtWith: "Built with React, TypeScript & Tailwind CSS"
  },
  ru: {
    copyright: "© 2024 Нодирбеков Амирбек. Все права защищены.",
    builtWith: "Создано с React, TypeScript и Tailwind CSS"
  },
  uz: {
    copyright: "© 2024 Nodirbekov Amirbek. Barcha huquqlar himoyalangan.",
    builtWith: "React, TypeScript va Tailwind CSS bilan yaratilgan"
  }
};

export const Footer = ({ currentLanguage }: FooterProps) => {
  const content = footerContent[currentLanguage];

  return (
    <footer className="py-8 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            {content.copyright}
          </p>
          <p className="text-sm opacity-80">
            {content.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
};
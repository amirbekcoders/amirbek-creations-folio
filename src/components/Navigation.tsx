import { useState, useEffect } from "react";
import { LanguageToggle, Language } from "./LanguageToggle";

interface NavigationProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const navigationLabels = {
  en: {
    about: "About",
    projects: "Projects",
    technologies: "Technologies",
    contact: "Contact"
  },
  ru: {
    about: "Обо мне",
    projects: "Проекты",
    technologies: "Технологии",
    contact: "Контакт"
  },
  uz: {
    about: "Men haqimda",
    projects: "Loyihalar",
    technologies: "Texnologiyalar",
    contact: "Aloqa"
  }
};

export const Navigation = ({ currentLanguage, onLanguageChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const labels = navigationLabels[currentLanguage];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">
            Amirbek
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {labels.about}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {labels.projects}
            </button>
            <button
              onClick={() => scrollToSection("technologies")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {labels.technologies}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {labels.contact}
            </button>
          </div>

          <LanguageToggle
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </nav>
  );
};
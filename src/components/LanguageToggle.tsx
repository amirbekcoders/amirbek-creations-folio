import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export type Language = "en" | "ru" | "uz";

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: "en" as Language, name: "EN", fullName: "English" },
  { code: "ru" as Language, name: "RU", fullName: "Русский" },
  { code: "uz" as Language, name: "UZ", fullName: "O'zbek" },
];

export const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth"
      >
        <Globe size={16} />
        <span className="font-medium">{languages.find(l => l.code === currentLanguage)?.name}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-lg shadow-elegant p-2 min-w-32 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth hover:bg-accent ${
                currentLanguage === language.code ? "bg-accent text-accent-foreground" : "text-foreground"
              }`}
            >
              {language.fullName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
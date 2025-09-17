import { Language } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  currentLanguage: Language;
}

const heroContent = {
  en: {
    greeting: "Hello, I'm",
    name: "Nodirbekov Amirbek",
    title: "Frontend Developer & Designer",
    description: "I create sleek, modern designs with smooth interactivity and animations to deliver seamless user experiences. My focus is on bringing designs to life with clean code and beautiful interfaces.",
    cta: "View My Work"
  },
  ru: {
    greeting: "Привет, я",
    name: "Нодирбеков Амирбек",
    title: "Frontend Разработчик и Дизайнер",
    description: "Я создаю современные дизайны с плавными интерактивными элементами и анимациями для создания безупречного пользовательского опыта. Моя цель - воплощать дизайны в жизнь с помощью чистого кода и красивых интерфейсов.",
    cta: "Посмотреть Работы"
  },
  uz: {
    greeting: "Salom, men",
    name: "Nodirbekov Amirbek",
    title: "Frontend Dasturchi va Dizayner",
    description: "Men zamonaviy dizaynlar yarataman, silliq interaktivlik va animatsiyalar bilan mukammal foydalanuvchi tajribasini taqdim etaman. Mening maqsadim - toza kod va chiroyli interfeyslar bilan dizaynlarni hayotga tatbiq etishdir.",
    cta: "Ishlarimni Ko'rish"
  }
};

export const HeroSection = ({ currentLanguage }: HeroSectionProps) => {
  const content = heroContent[currentLanguage];

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <p className="text-gray-medium text-lg mb-4 font-medium">
            {content.greeting}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            {content.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-dark mb-8 font-light">
            {content.title}
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            {content.description}
          </p>
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-gray-dark transition-smooth px-8 py-3 text-lg font-medium"
          >
            {content.cta}
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-gray-medium" size={24} />
      </div>
    </section>
  );
};
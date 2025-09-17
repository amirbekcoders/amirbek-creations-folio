import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { TechnologiesSection } from "../components/TechnologiesSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Language } from "../components/LanguageToggle";

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <HeroSection currentLanguage={currentLanguage} />
      <ProjectsSection currentLanguage={currentLanguage} />
      <TechnologiesSection currentLanguage={currentLanguage} />
      <ContactSection currentLanguage={currentLanguage} />
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Index;

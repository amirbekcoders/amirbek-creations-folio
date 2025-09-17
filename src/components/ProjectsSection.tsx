import { Language } from "./LanguageToggle";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import project images
import britlexImage from "@/assets/britlex-food-project.jpg";
import beautySalonImage from "@/assets/beauty-salon-project.jpg";

interface ProjectsSectionProps {
  currentLanguage: Language;
}

const projectsContent = {
  en: {
    title: "Featured Projects",
    subtitle: "Recent work showcasing modern design and development",
    projects: [
      {
        title: "Britlex Food Website",
        description: "A modern, responsive website for Britlex Food. The design combines minimalist aesthetics with smooth animations for an enhanced user experience.",
        technologies: ["HTML", "CSS", "JavaScript", "SASS"],
        image: britlexImage
      },
      {
        title: "Beauty Salon Website",
        description: "Designed a beautiful, simple website for a beauty salon with a clean layout and subtle animations to make the user experience smooth and enjoyable.",
        technologies: ["ReactJS", "CSS", "Figma", "JavaScript"],
        image: beautySalonImage
      }
    ],
    viewProject: "View Project",
    viewCode: "View Code"
  },
  ru: {
    title: "Избранные Проекты",
    subtitle: "Недавние работы, демонстрирующие современный дизайн и разработку",
    projects: [
      {
        title: "Сайт Britlex Food",
        description: "Современный, адаптивный сайт для Britlex Food. Дизайн сочетает минималистичную эстетику с плавными анимациями для улучшенного пользовательского опыта.",
        technologies: ["HTML", "CSS", "JavaScript", "SASS"],
        image: britlexImage
      },
      {
        title: "Сайт Салона Красоты",
        description: "Разработал красивый, простой сайт для салона красоты с чистым макетом и тонкими анимациями для плавного и приятного пользовательского опыта.",
        technologies: ["ReactJS", "CSS", "Figma", "JavaScript"],
        image: beautySalonImage
      }
    ],
    viewProject: "Посмотреть Проект",
    viewCode: "Посмотреть Код"
  },
  uz: {
    title: "Taniqli Loyihalar",
    subtitle: "Zamonaviy dizayn va ishlab chiqishni namoyish etuvchi so'nggi ishlar",
    projects: [
      {
        title: "Britlex Food Veb-sayti",
        description: "Britlex Food uchun zamonaviy, moslashuvchan veb-sayt. Dizayn minimalistik estetika va silliq animatsiyalarni birlashtiradi.",
        technologies: ["HTML", "CSS", "JavaScript", "SASS"],
        image: britlexImage
      },
      {
        title: "Go'zallik Saloni Veb-sayti",
        description: "Go'zallik saloni uchun chiroyli, oddiy veb-sayt yaratdim. Toza tartib va nozik animatsiyalar bilan foydalanuvchi tajribasini yaxshiladim.",
        technologies: ["ReactJS", "CSS", "Figma", "JavaScript"],
        image: beautySalonImage
      }
    ],
    viewProject: "Loyihani Ko'rish",
    viewCode: "Kodni Ko'rish"
  }
};

export const ProjectsSection = ({ currentLanguage }: ProjectsSectionProps) => {
  const content = projectsContent[currentLanguage];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.projects.map((project, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:shadow-hover border-border bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video bg-gray-light rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {project.title}
                </h3>
                <p className="text-gray-medium mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    <ExternalLink size={16} />
                    {content.viewProject}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-medium hover:text-foreground transition-smooth"
                  >
                    <Github size={16} />
                    {content.viewCode}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
import { Language } from "./LanguageToggle";

interface TechnologiesSectionProps {
  currentLanguage: Language;
}

const technologiesContent = {
  en: {
    title: "Technologies & Tools",
    subtitle: "Tools and technologies I use to bring ideas to life",
    categories: [
      {
        name: "Frontend Development",
        technologies: [
          { name: "HTML5", level: 95, color: "bg-orange-500" },
          { name: "CSS3 / SASS", level: 90, color: "bg-blue-500" },
          { name: "JavaScript", level: 88, color: "bg-yellow-500" },
          { name: "ReactJS", level: 85, color: "bg-cyan-500" }
        ]
      },
      {
        name: "Design & Tools",
        technologies: [
          { name: "Figma", level: 92, color: "bg-purple-500" },
          { name: "Git", level: 80, color: "bg-red-500" },
          { name: "Responsive Design", level: 95, color: "bg-green-500" }
        ]
      }
    ]
  },
  ru: {
    title: "Технологии и Инструменты",
    subtitle: "Инструменты и технологии, которые я использую для воплощения идей",
    categories: [
      {
        name: "Frontend Разработка",
        technologies: [
          { name: "HTML5", level: 95, color: "bg-orange-500" },
          { name: "CSS3 / SASS", level: 90, color: "bg-blue-500" },
          { name: "JavaScript", level: 88, color: "bg-yellow-500" },
          { name: "ReactJS", level: 85, color: "bg-cyan-500" }
        ]
      },
      {
        name: "Дизайн и Инструменты",
        technologies: [
          { name: "Figma", level: 92, color: "bg-purple-500" },
          { name: "Git", level: 80, color: "bg-red-500" },
          { name: "Адаптивный Дизайн", level: 95, color: "bg-green-500" }
        ]
      }
    ]
  },
  uz: {
    title: "Texnologiyalar va Vositalar",
    subtitle: "G'oyalarni hayotga tatbiq etish uchun foydalanadigan vositalar va texnologiyalar",
    categories: [
      {
        name: "Frontend Dasturlash",
        technologies: [
          { name: "HTML5", level: 95, color: "bg-orange-500" },
          { name: "CSS3 / SASS", level: 90, color: "bg-blue-500" },
          { name: "JavaScript", level: 88, color: "bg-yellow-500" },
          { name: "ReactJS", level: 85, color: "bg-cyan-500" }
        ]
      },
      {
        name: "Dizayn va Vositalar",
        technologies: [
          { name: "Figma", level: 92, color: "bg-purple-500" },
          { name: "Git", level: 80, color: "bg-red-500" },
          { name: "Moslashuvchan Dizayn", level: 95, color: "bg-green-500" }
        ]
      }
    ]
  }
};

export const TechnologiesSection = ({ currentLanguage }: TechnologiesSectionProps) => {
  const content = technologiesContent[currentLanguage];

  return (
    <section id="technologies" className="py-24 bg-gray-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {content.categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="animate-slide-up"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-8">
                {category.name}
              </h3>
              
              <div className="space-y-6">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="animate-scale-in"
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (techIndex * 0.1)}s` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{tech.name}</span>
                      <span className="text-sm text-gray-medium">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${tech.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${tech.level}%`,
                          animationDelay: `${(categoryIndex * 0.2) + (techIndex * 0.1) + 0.5}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
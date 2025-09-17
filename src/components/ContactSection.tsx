import { Language } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

interface ContactSectionProps {
  currentLanguage: Language;
}

const contactContent = {
  en: {
    title: "Let's Work Together",
    subtitle: "Ready to bring your ideas to life? Let's create something amazing together.",
    form: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message"
    },
    info: {
      email: "amirbek@example.com",
      phone: "+998 90 123 45 67",
      location: "Tashkent, Uzbekistan"
    },
    social: "Follow me on social media"
  },
  ru: {
    title: "Давайте Работать Вместе",
    subtitle: "Готовы воплотить ваши идеи в жизнь? Давайте создадим что-то удивительное вместе.",
    form: {
      name: "Ваше Имя",
      email: "Ваш Email",
      message: "Ваше Сообщение",
      send: "Отправить Сообщение"
    },
    info: {
      email: "amirbek@example.com",
      phone: "+998 90 123 45 67",
      location: "Ташкент, Узбекистан"
    },
    social: "Подписывайтесь в социальных сетях"
  },
  uz: {
    title: "Keling Birga Ishlaymiz",
    subtitle: "G'oyalaringizni hayotga tatbiq etishga tayyormisiz? Keling birga ajoyib narsalar yaratamiz.",
    form: {
      name: "Ismingiz",
      email: "Emailingiz",
      message: "Xabaringiz",
      send: "Xabar Yuborish"
    },
    info: {
      email: "amirbek@example.com",
      phone: "+998 90 123 45 67",
      location: "Toshkent, O'zbekiston"
    },
    social: "Ijtimoiy tarmoqlarda kuzating"
  }
};

export const ContactSection = ({ currentLanguage }: ContactSectionProps) => {
  const content = contactContent[currentLanguage];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <form className="space-y-6">
              <div>
                <Input
                  placeholder={content.form.name}
                  className="w-full p-4 border-border bg-card text-foreground placeholder:text-gray-medium"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={content.form.email}
                  className="w-full p-4 border-border bg-card text-foreground placeholder:text-gray-medium"
                />
              </div>
              <div>
                <Textarea
                  placeholder={content.form.message}
                  rows={6}
                  className="w-full p-4 border-border bg-card text-foreground placeholder:text-gray-medium resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-gray-dark transition-smooth py-4 text-lg font-medium"
              >
                {content.form.send}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-medium">Email</p>
                  <p className="text-lg font-medium text-foreground">{content.info.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-medium">Phone</p>
                  <p className="text-lg font-medium text-foreground">{content.info.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-medium">Location</p>
                  <p className="text-lg font-medium text-foreground">{content.info.location}</p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-gray-medium mb-4">{content.social}</p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    <Github size={16} />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
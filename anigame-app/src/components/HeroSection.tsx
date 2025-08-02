import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="AniGame Festival" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-pulse">
            AniGame
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
            Festival Geek - 3ª Edição
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 text-lg text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>7 de Julho</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Faculdade Funetrte</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <span>08:00 às 22:00</span>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O maior evento de anime e games da região está chegando! 
            Prepare-se para um dia repleto de atividades, concursos, feira geek e muito mais!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="neon" 
              size="lg"
              onClick={() => navigate('/ingressos')}
              className="text-lg px-8 py-3"
            >
              Comprar Ingresso
            </Button>
            <Button 
              variant="cyber" 
              size="lg"
              onClick={() => navigate('/programacao')}
              className="text-lg px-8 py-3"
            >
              Ver Programação
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
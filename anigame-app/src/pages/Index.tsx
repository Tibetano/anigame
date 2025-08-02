import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SponsorsSection from '@/components/SponsorsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Store, Music } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const activitiesAnimation = useScrollAnimation();
  const sponsorsAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const activities = [
    {
      icon: Music,
      title: 'Shows e Apresentações',
      description: 'Performances de cosplay, bandas de anime songs e apresentações especiais durante todo o dia.',
    },
    {
      icon: Trophy,
      title: 'Concursos',
      description: 'Competições de cosplay, gaming, quiz de animes e muito mais com prêmios incríveis.',
    },
    {
      icon: Store,
      title: 'Feira Geek',
      description: 'Estandes com produtos exclusivos, colecionáveis, mangás, action figures e muito mais.',
    },
    {
      icon: Calendar,
      title: 'Workshops',
      description: 'Aprenda técnicas de desenho, confecção de cosplay e desenvolvimento de games.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Activities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Atividades do Evento
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma experiência completa para todos os fãs de anime e games
            </p>
          </div>
          
          <div 
            ref={activitiesAnimation.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
              activitiesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {activities.map((activity, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-card border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 ${
                  activitiesAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: activitiesAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <activity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                  <p className="text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div 
        ref={sponsorsAnimation.elementRef}
        className={`transition-all duration-700 ${
          sponsorsAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <SponsorsSection />
      </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div 
          ref={ctaAnimation.elementRef}
          className={`container mx-auto px-4 text-center transition-all duration-700 ${
            ctaAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Não Perca Esta Oportunidade!
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de fãs de anime e games no maior evento da região. 
            Garante já seu ingresso!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="lg" onClick={() => window.location.href = '/ingressos'}>
              Comprar Ingresso Agora
            </Button>
            <Button variant="cyber" size="lg" onClick={() => window.location.href = '/programacao'}>
              Ver Programação Completa
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">AniGame 2024</h3>
              <p className="text-muted-foreground">
                O maior festival de anime e games da região. 
                Uma experiência inesquecível para toda a comunidade geek.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Contato</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 contato@anigame.com.br</p>
                <p>📱 (11) 99999-9999</p>
                <p>📍 Faculdade Funetrte</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Redes Sociais</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>🔗 @anigamebrasil</p>
                <p>📘 /AniGameOficial</p>
                <p>📺 /AniGameYT</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AniGame. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

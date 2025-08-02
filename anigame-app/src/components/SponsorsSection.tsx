import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'gold' | 'silver' | 'bronze';
  website?: string;
}

const mockSponsors: Sponsor[] = [
  { id: '1', name: 'TechCorp Gold', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop', tier: 'gold', website: 'https://techcorp.com' },
  { id: '2', name: 'GameStudio Gold', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop', tier: 'gold' },
  { id: '3', name: 'AnimePro Silver', logo: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=200&h=100&fit=crop', tier: 'silver' },
  { id: '4', name: 'GeekStore Silver', logo: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=200&h=100&fit=crop', tier: 'silver' },
  { id: '5', name: 'LocalBiz Bronze', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop', tier: 'bronze' },
  { id: '6', name: 'StartupTech Bronze', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop', tier: 'bronze' },
  { id: '7', name: 'CafeTech Bronze', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop', tier: 'bronze' },
];

const SponsorsSection = () => {
  const sortedSponsors = mockSponsors.sort((a, b) => {
    const tierOrder = { gold: 0, silver: 1, bronze: 2 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  const tierColors = {
    gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    silver: 'bg-gradient-to-r from-gray-300 to-gray-500',
    bronze: 'bg-gradient-to-r from-orange-400 to-orange-600',
  };

  const tierLabels = {
    gold: 'OURO',
    silver: 'PRATA',
    bronze: 'BRONZE',
  };

  const getCardSize = (tier: string) => {
    switch (tier) {
      case 'gold': return 'md:col-span-2 lg:col-span-3';
      case 'silver': return 'md:col-span-1 lg:col-span-2';
      default: return 'md:col-span-1';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Nossos Patrocinadores
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça as empresas que tornam o AniGame possível
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {sortedSponsors.map((sponsor) => (
            <Card 
              key={sponsor.id}
              className={`
                ${getCardSize(sponsor.tier)} 
                bg-gradient-card hover:scale-105 transition-all duration-300 
                border-2 hover:border-primary cursor-pointer group
                ${sponsor.tier === 'gold' ? 'hover:shadow-neon' : 
                  sponsor.tier === 'silver' ? 'hover:shadow-cyan' : 
                  'hover:shadow-lg'}
              `}
              onClick={() => sponsor.website && window.open(sponsor.website, '_blank')}
            >
              <div className="p-6 text-center space-y-4">
                <div className="relative">
                  <Badge 
                    className={`
                      absolute -top-2 -right-2 z-10 text-xs font-bold text-white
                      ${tierColors[sponsor.tier]}
                    `}
                  >
                    {tierLabels[sponsor.tier]}
                  </Badge>
                  <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className={`
                  font-semibold group-hover:text-primary transition-colors
                  ${sponsor.tier === 'gold' ? 'text-lg' : 
                    sponsor.tier === 'silver' ? 'text-base' : 
                    'text-sm'}
                `}>
                  {sponsor.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Quer ser nosso patrocinador?
          </p>
          <a 
            href="mailto:patrocinio@anigame.com.br"
            className="text-primary hover:text-primary/80 font-semibold underline"
          >
            Entre em contato conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
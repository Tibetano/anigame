import Header from '@/components/Header';
import SponsorsSection from '@/components/SponsorsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, FileText } from 'lucide-react';

const Sponsors = () => {
  const sponsorshipTiers = [
    {
      tier: 'gold',
      name: 'Patrocínio Ouro',
      price: 'R$ 5.000',
      color: 'from-yellow-400 to-yellow-600',
      benefits: [
        'Logo em destaque no material promocional',
        'Stand premium no evento',
        'Menção em todas as redes sociais',
        'Espaço para ativação de marca',
        'Material promocional nos kits dos participantes',
        'Direito a sorteio de brindes',
        'Logo no palco principal',
        'Certificado de apoio'
      ]
    },
    {
      tier: 'silver',
      name: 'Patrocínio Prata',
      price: 'R$ 3.000',
      color: 'from-gray-300 to-gray-500',
      benefits: [
        'Logo no material promocional',
        'Stand no evento',
        'Menção nas redes sociais',
        'Material promocional básico nos kits',
        'Direito a sorteio de brindes',
        'Logo em banners do evento',
        'Certificado de apoio'
      ]
    },
    {
      tier: 'bronze',
      name: 'Patrocínio Bronze',
      price: 'R$ 1.500',
      color: 'from-orange-400 to-orange-600',
      benefits: [
        'Logo no material promocional',
        'Menção nas redes sociais',
        'Logo em área específica do evento',
        'Certificado de apoio',
        'Relatório pós-evento'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Nossos Patrocinadores
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça as empresas que apoiam o AniGame e torne-se um parceiro
            </p>
          </div>

          {/* Existing Sponsors */}
          <SponsorsSection />

          {/* Sponsorship Opportunities */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Oportunidades de Patrocínio
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Faça parte do maior evento geek da região e conecte sua marca com milhares de fãs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sponsorshipTiers.map((tier) => (
                <Card 
                  key={tier.tier}
                  className={`
                    bg-gradient-card border-2 transition-all duration-300 hover:scale-105
                    ${tier.tier === 'gold' ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' :
                      tier.tier === 'silver' ? 'border-gray-400 shadow-lg shadow-gray-400/20' :
                      'border-orange-400 shadow-lg shadow-orange-400/20'}
                  `}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">
                        {tier.tier === 'gold' ? '🥇' : tier.tier === 'silver' ? '🥈' : '🥉'}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-400 font-bold">✓</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="cyber" 
                      className="w-full"
                      onClick={() => window.location.href = 'mailto:patrocinio@anigame.com.br?subject=Interesse em Patrocínio ' + tier.name}
                    >
                      Quero Patrocinar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Sponsor */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Por que Patrocinar o AniGame?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-lg font-semibold mb-2">Participantes</div>
                  <div className="text-sm text-muted-foreground">Público estimado para 2024</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-secondary mb-2">14h</div>
                  <div className="text-lg font-semibold mb-2">De Evento</div>
                  <div className="text-sm text-muted-foreground">Exposição contínua da marca</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-accent mb-2">18-35</div>
                  <div className="text-lg font-semibold mb-2">Faixa Etária</div>
                  <div className="text-sm text-muted-foreground">Público jovem e engajado</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-lg font-semibold mb-2">Alcance Online</div>
                  <div className="text-sm text-muted-foreground">Redes sociais e streaming</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Entre em Contato
                </CardTitle>
                <p className="text-muted-foreground">
                  Nossa equipe está pronta para criar uma proposta personalizada para sua empresa
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Mail className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="font-semibold">E-mail</h3>
                    <p className="text-muted-foreground">patrocinio@anigame.com.br</p>
                  </div>
                  <div className="space-y-2">
                    <Phone className="h-8 w-8 text-secondary mx-auto" />
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 text-accent mx-auto" />
                    <h3 className="font-semibold">Mídia Kit</h3>
                    <Button variant="outline" size="sm">
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;

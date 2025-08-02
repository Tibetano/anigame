import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Users, Ticket, CreditCard } from 'lucide-react';
import Header from '@/components/Header';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  available: number;
  total: number;
  popular?: boolean;
}

const Tickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const ticketTypes: TicketType[] = [
    {
      id: 'basic',
      name: 'Ingresso Básico',
      price: 25.00,
      description: 'Acesso ao evento principal',
      features: [
        'Acesso a todas as atividades do evento',
        'Participação nos concursos',
        'Acesso à feira geek',
        'Kit básico do participante'
      ],
      available: 150,
      total: 200,
    },
    {
      id: 'premium',
      name: 'Ingresso Premium',
      price: 45.00,
      description: 'Experiência completa com benefícios extras',
      features: [
        'Tudo do ingresso básico',
        'Acesso VIP às atrações',
        'Kit premium com brindes exclusivos',
        'Área de descanso VIP',
        'Meet & greet com convidados especiais',
        'Desconto na praça de alimentação'
      ],
      available: 75,
      total: 100,
      popular: true,
    },
    {
      id: 'vip',
      name: 'Ingresso VIP',
      price: 80.00,
      description: 'Experiência máxima do AniGame',
      features: [
        'Tudo do ingresso premium',
        'Acesso a workshops exclusivos',
        'Sessão de fotos profissional',
        'Camiseta exclusiva do evento',
        'Acesso backstage',
        'Jantar com organizadores',
        'Certificado de participação'
      ],
      available: 20,
      total: 30,
    },
  ];

  const handleBuyTicket = (ticketId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para comprar ingressos",
        variant: "destructive",
      });
      return;
    }

    setSelectedTicket(ticketId);
    
    // Simulação de processo de compra
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para finalizar a compra",
    });
    
    // Aqui seria a integração com sistema de pagamento
    console.log(`Comprando ingresso: ${ticketId}`);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-400';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Ingressos AniGame
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o ingresso perfeito para sua experiência no maior evento geek da região
            </p>
          </div>

          {/* Event Info */}
          <Card className="mb-8 bg-gradient-card border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Data do Evento</h3>
                  <p className="text-muted-foreground">7 de Julho de 2024</p>
                  <p className="text-sm text-muted-foreground">08:00 às 22:00</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-8 w-8 text-secondary" />
                  <h3 className="font-semibold">Local</h3>
                  <p className="text-muted-foreground">Faculdade Funetrte</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Ticket className="h-8 w-8 text-accent" />
                  <h3 className="font-semibold">Ingressos Restantes</h3>
                  <p className="text-muted-foreground">
                    {ticketTypes.reduce((sum, ticket) => sum + ticket.available, 0)} disponíveis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ticketTypes.map((ticket) => (
              <Card 
                key={ticket.id} 
                className={`
                  relative bg-gradient-card border-2 transition-all duration-300 hover:scale-105
                  ${ticket.popular ? 'border-primary shadow-neon' : 'border-primary/20 hover:border-primary/50'}
                `}
              >
                {ticket.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-hero text-primary-foreground font-bold px-4 py-1">
                    MAIS POPULAR
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-primary">
                    {ticket.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{ticket.description}</p>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-foreground">
                      R$ {ticket.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {ticket.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disponibilidade</span>
                      <span className={getAvailabilityColor(ticket.available, ticket.total)}>
                        {ticket.available}/{ticket.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(ticket.available / ticket.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    variant={ticket.popular ? "neon" : "cyber"}
                    className="w-full"
                    onClick={() => handleBuyTicket(ticket.id)}
                    disabled={ticket.available === 0}
                  >
                    {ticket.available === 0 ? (
                      'Esgotado'
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Comprar Ingresso
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-12 bg-muted/30 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Informações Importantes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Política de Cancelamento</h4>
                  <p>Cancelamentos podem ser feitos até 48h antes do evento com reembolso de 80%.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Entrada no Evento</h4>
                  <p>Apresente o QR Code do seu ingresso na entrada. Documento de identidade obrigatório.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Transferência de Ingresso</h4>
                  <p>Ingressos podem ser transferidos para outras pessoas até 24h antes do evento.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Suporte</h4>
                  <p>Dúvidas? Entre em contato: suporte@anigame.com.br ou (11) 9999-9999.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
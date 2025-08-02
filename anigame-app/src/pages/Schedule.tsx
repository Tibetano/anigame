import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

const Schedule = () => {
  const scheduleData = [
    {
      time: '09:00',
      title: 'Abertura do Evento',
      description: 'Cerimônia de abertura com apresentações especiais',
      location: 'Palco Principal',
      category: 'Geral',
      duration: '30min'
    },
    {
      time: '09:30',
      title: 'Torneio de Fighting Games',
      description: 'Street Fighter 6, Tekken 8 e mais',
      location: 'Arena Gaming',
      category: 'Competição',
      duration: '3h'
    },
    {
      time: '10:00',
      title: 'Palestra: O Futuro dos Animes',
      description: 'Discussão sobre tendências e novidades no mundo dos animes',
      location: 'Auditório',
      category: 'Palestra',
      duration: '1h'
    },
    {
      time: '11:30',
      title: 'Cosplay Contest - Preliminares',
      description: 'Primeira fase do concurso de cosplay',
      location: 'Palco Principal',
      category: 'Cosplay',
      duration: '2h'
    },
    {
      time: '13:00',
      title: 'Intervalo para Almoço',
      description: 'Praça de alimentação disponível',
      location: 'Área de Alimentação',
      category: 'Intervalo',
      duration: '1h30'
    },
    {
      time: '14:30',
      title: 'Apresentação de Dança K-Pop',
      description: 'Grupos locais apresentando coreografias',
      location: 'Palco Secundário',
      category: 'Apresentação',
      duration: '1h'
    },
    {
      time: '15:30',
      title: 'Mesa Redonda: Mangás Indie',
      description: 'Discussão sobre mangás independentes brasileiros',
      location: 'Sala de Debates',
      category: 'Mesa Redonda',
      duration: '1h30'
    },
    {
      time: '17:00',
      title: 'Final do Cosplay Contest',
      description: 'Grande final com premiação',
      location: 'Palco Principal',
      category: 'Cosplay',
      duration: '2h'
    },
    {
      time: '19:00',
      title: 'Show Musical Temático',
      description: 'Apresentação de músicas de animes e games',
      location: 'Palco Principal',
      category: 'Show',
      duration: '1h30'
    },
    {
      time: '20:30',
      title: 'Encerramento',
      description: 'Cerimônia de encerramento e premiações',
      location: 'Palco Principal',
      category: 'Geral',
      duration: '30min'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Competição': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Palestra': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Cosplay': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Show': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Apresentação': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Mesa Redonda': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      default: return 'bg-primary/20 text-primary border-primary/50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Programação
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Confira a programação completa do AniGame 2024
            </p>
          </div>

          {/* Event Info */}
          <Card className="bg-gradient-card border-primary/20 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Clock className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Data</h3>
                  <p className="text-muted-foreground">15 de Dezembro, 2024</p>
                </div>
                <div className="space-y-2">
                  <MapPin className="h-8 w-8 text-secondary mx-auto" />
                  <h3 className="font-semibold">Local</h3>
                  <p className="text-muted-foreground">Centro de Convenções</p>
                </div>
                <div className="space-y-2">
                  <Users className="h-8 w-8 text-accent mx-auto" />
                  <h3 className="font-semibold">Duração</h3>
                  <p className="text-muted-foreground">09:00 às 21:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Timeline */}
          <div className="space-y-4">
            {scheduleData.map((event, index) => (
              <Card key={index} className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-20 flex-shrink-0">
                      <div className="text-2xl font-bold text-primary">{event.time}</div>
                      <div className="text-sm text-muted-foreground">{event.duration}</div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
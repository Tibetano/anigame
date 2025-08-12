import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Ticket, Edit, Save, Loader, Mail } from 'lucide-react';
import Header from '@/components/Header';

const Dashboard = () => {
  const { user, updateUser, isLoading, token } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    cpf: user?.cpf || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  const translateGender = (gender: string) => {
    const translations = {
      'MALE': 'Masculino',
      'FEMALE': 'Feminino',
      'NON_BINARY': 'Não-binário'
    };
    return translations[gender as keyof typeof translations] || gender;
  };


  const handleSave = async () => {
    const success = await updateUser(formData);
    
    if (success) {
      toast({
        title: "Dados atualizados com sucesso!",
        description: "Suas informações foram salvas",
      });
      setIsEditing(false);
    } else {
      toast({
        title: "Erro ao atualizar dados",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResendVerification = async () => {
    if (!user?.email || !token) return;
    
    try {
      setIsResendingVerification(true);
      const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
      const apiPort = import.meta.env.VITE_API_PORT || '8080';
      
      const response = await fetch(`http://${apiHost}:${apiPort}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        toast({
          title: "Email de verificação enviado!",
          description: `Um email de verificação foi enviado para ${user.email}`,
        });
      } else {
        toast({
          title: "Erro ao enviar email",
          description: "Tente novamente mais tarde",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao reenviar verificação:', error);
      toast({
        title: "Erro ao enviar email",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsResendingVerification(false);
    }
  };

  const mockTickets = [
    {
      id: '1',
      eventName: 'AniGame 2024',
      ticketType: 'Ingresso Completo',
      date: '7 de Julho, 2024',
      status: 'Ativo',
      qrCode: 'https://via.placeholder.com/150x150/320%20100%2050/FFFFFF?text=QR',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-lg">
                Bem-vindo, {user.firstName}!
              </p>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user.status === 'VERIFIED' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {user.status === 'VERIFIED' ? 'Verificada' : 'Pendente'}
                </span>
                {user.status === 'PENDING' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendVerification}
                    disabled={isResendingVerification}
                    className="h-7 px-2"
                  >
                    {isResendingVerification ? (
                      <Loader className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Mail className="h-3 w-3 mr-1" />
                    )}
                    {isResendingVerification ? 'Enviando...' : 'Verificar'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center space-x-2">
                <Ticket className="h-4 w-4" />
                <span>Meus Ingressos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Informações Pessoais</span>
                  </CardTitle>
                  <Button
                    variant={isEditing ? "neon" : "cyber"}
                    onClick={() => {
                      if (isEditing) {
                        handleSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                    ) : isEditing ? (
                      <Save className="h-4 w-4 mr-2" />
                    ) : (
                      <Edit className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? 'Salvando...' : isEditing ? 'Salvar' : 'Editar'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Usuário</Label>
                      <Input
                        id="username"
                        value={user.username}
                        disabled
                        className="bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gênero</Label>
                      <Input
                        id="gender"
                        name="gender"
                        value={isEditing ? formData.gender : translateGender(formData.gender)}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              <div className="space-y-6">
                {mockTickets.length > 0 ? (
                  mockTickets.map((ticket) => (
                    <Card key={ticket.id} className="bg-gradient-card border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-primary">
                              {ticket.eventName}
                            </h3>
                            <p className="text-foreground">{ticket.ticketType}</p>
                            <p className="text-muted-foreground">{ticket.date}</p>
                            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                              {ticket.status}
                            </span>
                          </div>
                          
                          <div className="text-center">
                            <img 
                              src={ticket.qrCode} 
                              alt="QR Code do ingresso"
                              className="w-32 h-32 mx-auto border-2 border-primary/30 rounded-lg"
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              Apresente este QR Code na entrada
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-gradient-card border-primary/20">
                    <CardContent className="p-8 text-center">
                      <Ticket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Nenhum ingresso encontrado</h3>
                      <p className="text-muted-foreground mb-6">
                        Você ainda não possui ingressos para o AniGame
                      </p>
                      <Button variant="neon" onClick={() => window.location.href = '/tickets'}>
                        Comprar Ingresso
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
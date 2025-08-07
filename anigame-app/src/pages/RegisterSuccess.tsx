import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  gender: string;
  dateOfBirth: string;
  status: string;
}

const RegisterSuccess = () => {
  const location = useLocation();
  const userData = location.state?.userData as UserData;

  if (!userData) {
    return <Navigate to="/register" replace />;
  }

  const translateGender = (gender: string) => {
    const translations = {
      'MALE': 'Masculino',
      'FEMALE': 'Feminino',
      'NON_BINARY': 'Não-binário'
    };
    return translations[gender as keyof typeof translations] || gender;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl bg-gradient-card border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Cadastro Realizado com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Mail className="h-4 w-4" />
            <AlertDescription className="text-blue-300">
              <strong>Importante:</strong> Um e-mail de verificação foi enviado para <strong>{userData.email}</strong>. 
              Por favor, verifique sua caixa de entrada e siga as instruções para ativar sua conta.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Dados do Usuário:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Nome Completo</Label>
                <p className="font-medium">{userData.firstName} {userData.lastName}</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">CPF</Label>
                <p className="font-medium">{formatCPF(userData.cpf)}</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Usuário</Label>
                <p className="font-medium">{userData.username}</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">E-mail</Label>
                <p className="font-medium">{userData.email}</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Gênero</Label>
                <p className="font-medium">{translateGender(userData.gender)}</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Data de Nascimento</Label>
                <p className="font-medium">{formatDate(userData.dateOfBirth)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button asChild variant="neon" className="flex-1">
              <Link to="/login">
                Fazer Login
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
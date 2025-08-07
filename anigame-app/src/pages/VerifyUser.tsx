import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import Header from '@/components/Header';

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'expired' | 'invalid'>('loading');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setVerificationStatus('invalid');
        return;
      }

      try {
        const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
        const apiPort = import.meta.env.VITE_API_PORT || '8080';
        
        const response = await fetch(`http://${apiHost}:${apiPort}/auth/verify-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setVerificationStatus('success');
        } else {
          const errorData = await response.json().catch(() => null);
          
          // Verifica se é erro de token expirado baseado na resposta ou status
          if (response.status === 410 || (errorData && errorData.message && errorData.message.toLowerCase().includes('expired'))) {
            setVerificationStatus('expired');
          } else {
            setVerificationStatus('invalid');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar conta:', error);
        setVerificationStatus('invalid');
      }
    };

    verifyUser();
  }, [token]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                <Loader className="w-8 h-8 text-primary animate-spin" />
              </div>
              <CardTitle>Verificando sua conta</CardTitle>
              <CardDescription>
                Aguarde enquanto verificamos o token de confirmação...
              </CardDescription>
            </CardHeader>
          </Card>
        );

      case 'success':
        return (
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle className="text-green-600">Conta verificada com sucesso!</CardTitle>
              <CardDescription>
                Sua conta foi verificada com sucesso. Agora você pode acessar todos os recursos da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full">
                <Link to="/login">Fazer Login</Link>
              </Button>
            </CardContent>
          </Card>
        );

      case 'expired':
        return (
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-orange-500/10">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle className="text-orange-600">Token expirado</CardTitle>
              <CardDescription>
                O token de verificação expirou. Um novo token deve ser solicitado para verificar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <Button asChild className="w-full">
                <Link to="/login">Ir para o Login</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Após fazer login, acesse o dashboard e clique no botão "Verificar" para solicitar um novo token.
              </p>
            </CardContent>
          </Card>
        );

      case 'invalid':
        return (
          <Card className="max-w-md mx-auto mt-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-red-600">Token inválido</CardTitle>
              <CardDescription>
                O token informado é inválido. Um novo token deve ser gerado para verificar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <Button asChild className="w-full">
                <Link to="/login">Ir para o Login</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Após fazer login, acesse o dashboard e clique no botão "Verificar" no seu perfil para gerar um novo token.
              </p>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyUser;
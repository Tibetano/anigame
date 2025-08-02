import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    gender: '',
    dateOfBirth: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push("Nome completo é obrigatório");
    if (!formData.username.trim()) errors.push("Usuário é obrigatório");
    if (!formData.email.trim()) errors.push("E-mail é obrigatório");
    if (!formData.password.trim()) errors.push("Senha é obrigatória");
    if (!formData.confirmPassword.trim()) errors.push("Confirmação de senha é obrigatória");
    if (!formData.cpf.trim()) errors.push("CPF é obrigatório");
    if (!formData.gender.trim()) errors.push("Gênero é obrigatório");
    if (!formData.dateOfBirth.trim()) errors.push("Data de nascimento é obrigatória");
    
    if (formData.password !== formData.confirmPassword) {
      errors.push("As senhas não coincidem");
    }
    
    // Validar formato da data
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (formData.dateOfBirth && !dateRegex.test(formData.dateOfBirth)) {
      errors.push("Data de nascimento deve estar no formato dd/mm/aaaa");
    }
    
    // Validar CPF básico (11 dígitos)
    if (formData.cpf && formData.cpf.replace(/\D/g, '').length !== 11) {
      errors.push("CPF deve ter 11 dígitos");
    }
    
    return errors;
  };

  const formatDateForAPI = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    return value;
  };

  const translateGender = (gender: string) => {
    const translations = {
      'MALE': 'Masculino',
      'FEMALE': 'Feminino',
      'NON_BINARY': 'Não-binário'
    };
    return translations[gender as keyof typeof translations] || gender;
  };

  const splitName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;
    return { firstName, lastName };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Erro na validação",
        description: validationErrors[0],
        variant: "destructive",
      });
      return;
    }

    const { firstName, lastName } = splitName(formData.name);
    const formattedDate = formatDateForAPI(formData.dateOfBirth);

    const success = await register({
      username: formData.username,
      password: formData.password,
      firstName,
      lastName,
      cpf: formData.cpf.replace(/\D/g, ''),
      email: formData.email,
      gender: formData.gender,
      dateOfBirth: formattedDate,
    });
    
    if (success) {
      toast({
        title: `Usuário ${success.firstName} registrado com sucesso!`,
        description: (
          <div className="space-y-2">
            <p><strong>ID:</strong> {success.id}</p>
            <p><strong>Username:</strong> {success.username}</p>
            <p><strong>Nome:</strong> {success.firstName} {success.lastName}</p>
            <p><strong>Email:</strong> {success.email}</p>
            <p><strong>CPF:</strong> {success.cpf}</p>
            <p><strong>Gênero:</strong> {translateGender(success.gender)}</p>
            <p><strong>Data de Nascimento:</strong> {success.dateOfBirth}</p>
          </div>
        ),
        action: (
          <Button onClick={() => navigate('/login')} variant="outline" size="sm">
            Ok
          </Button>
        ),
      });
    } else {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente ou use dados diferentes",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'dateOfBirth') {
      formattedValue = formatDate(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl bg-gradient-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Cadastrar no AniGame
          </CardTitle>
          <p className="text-muted-foreground">
            Crie sua conta para acessar o evento
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome Completo e CPF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                  maxLength={14}
                />
              </div>
            </div>

            {/* Usuário e Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Escolha um nome de usuário"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Gênero e Data de Nascimento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione seu gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Feminino</SelectItem>
                    <SelectItem value="NON_BINARY">Não-binário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="text"
                  placeholder="00/00/0000"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Crie uma senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="neon" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Faça login aqui
              </Link>
            </p>
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Voltar ao início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
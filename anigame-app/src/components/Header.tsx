import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    // Store current location for redirect after login
    localStorage.setItem('anigame_redirect', location.pathname);
    navigate('/login');
  };

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Ingressos', href: '/ingressos' },
    { name: 'Programação', href: '/programacao' },
    { name: 'Patrocinadores', href: '/patrocinadores' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="AniGame" className="h-10 w-auto" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AniGame
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={handleLoginClick}>
                  Entrar
                </Button>
                <Button variant="neon" onClick={() => navigate('/registro')}>
                  Cadastrar-se
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-border pt-4 mt-4">
                  {user ? (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate('/dashboard');
                          setIsOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Perfil
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleLoginClick();
                          setIsOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        Entrar
                      </Button>
                      <Button
                        variant="neon"
                        onClick={() => {
                          navigate('/registro');
                          setIsOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        Cadastrar-se
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">Paperly</h1>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive('/shop') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

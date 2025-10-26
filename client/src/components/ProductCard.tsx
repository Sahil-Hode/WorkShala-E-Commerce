import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm transition-smooth hover:shadow-md hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-1">
              {product.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Welcome to{' '}
                <span className="text-primary">Paperly</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Discover premium stationery and office supplies that inspire creativity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/shop">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Browse Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Handpicked favorites from our collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="outline" className="gap-2">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Elevate Your Workspace
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of satisfied customers who have transformed their creative process with our premium stationery.
              </p>
              <Link to="/shop">
                <Button size="lg" className="text-lg px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

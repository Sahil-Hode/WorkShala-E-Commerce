const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-xl font-bold text-primary">Paperly</h2>
          <p className="text-sm text-muted-foreground text-center">
            Premium stationery and office supplies for creatives and professionals
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Paperly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

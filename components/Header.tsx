import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sayfa kaydırıldığında header arka planını değiştir
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sayfa değiştiğinde mobil menüyü kapat
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Portföy', path: '/portfolio' },
    { name: 'İletişim', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-primary/5 py-4 shadow-sm"
          : "bg-transparent   "
      )}
    >
      <div className="max-w-[120rem] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-lg group-hover:bg-accentcyan transition-colors">Sevde Tetik
          </div>
          <span className="font-heading font-semibold text-primary text-lg hidden sm:inline group-hover:text-accentcyan transition-colors">

          </span>
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-paragraph text-base transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full",
                isActive(link.path)
                  ? "text-primary font-semibold after:w-full"
                  : "text-primary/70 hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobil Menü Butonu */}
        <button
          className="md:hidden relative z-50 p-2 text-primary hover:bg-secondary rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobil Menü Overlay */}
        <div className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-heading text-3xl transition-colors",
                isActive(link.path) ? "text-primary font-bold" : "text-primary/60 hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
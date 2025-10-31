import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { OWNER, APP_LOGO } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo-ma-arabic-v2.png" 
              alt="Mohamed Adel Logo" 
              className="h-8 md:h-10 w-auto transition-transform group-hover:scale-110"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm md:text-lg font-bold whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{OWNER.fullName}</span>
              <span className="text-xs text-muted-foreground hidden md:block">{OWNER.title}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className={`relative ${
                    location === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-current={location === item.href ? "page" : undefined}
                >
                  {item.label}
                  {location === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container py-4 space-y-2">
              {/* Mobile Theme Switcher */}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <><Sun className="h-5 w-5 mr-2" /> Light Mode</>
                ) : (
                  <><Moon className="h-5 w-5 mr-2" /> Dark Mode</>
                )}
              </Button>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

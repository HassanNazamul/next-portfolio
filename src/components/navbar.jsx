"use client"

import { useId, useState, useTransition } from "react"
import { GlobeIcon, Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import UserMenu from "@/components/user-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Link, animateScroll as scroll } from "react-scroll"
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links configuration
  const navigationLinks = [
    { to: "about", label: t('about') },
    { to: "experience", label: t('experience') },
    { to: "projects", label: t('projects') },
    { to: "contact", label: t('contact') },
  ]

  // Supported languages configuration
  const languages = [
    { value: "en", label: t('en') },
    { value: "fr", label: t('fr') },
  ]

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll to top handler for Logo click
  const scrollToTop = () => {
    scroll.scrollToTop();
    setIsOpen(false);
  };

  /**
   * Handles language change by replacing the current route with the new locale.
   * @param {string} value - The new locale code (e.g., 'en', 'fr').
   */
  const onLanguageChange = (value) => {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  };

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 pointer-events-auto">
      <div className="
        backdrop-blur-md
        bg-white/60 dark:bg-black/60
        border border-white/20 dark:border-white/10
        shadow-lg
        transition-all duration-300
        px-4 md:px-6
        py-2
        rounded-full
        mx-auto
        max-w-3xl
      ">
        <div className="flex h-14 items-center justify-between">

          {/* Left side: Logo / User - Scrolls to Top */}
          <div
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <UserMenu />
            <span className="font-bold text-lg hidden sm:block tracking-tight text-foreground">Naz.</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                activeClass="text-primary bg-primary/10 font-semibold scale-110"
                className="
                  px-4 py-2 
                  text-sm font-medium 
                  text-muted-foreground hover:text-foreground hover:bg-accent/50
                  rounded-full
                  cursor-pointer
                  transition-all duration-200
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Toggles & Mobile Menu */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <div className="bg-accent/30 rounded-full p-1 border border-white/5">
              <ThemeToggle />
            </div>

            {/* Language Selector */}
            <Select defaultValue={locale} onValueChange={onLanguageChange} disabled={isPending}>
              <SelectTrigger
                id={`language-${id}`}
                className="h-9 w-[70px] border-none bg-accent/30 rounded-full px-3 text-xs font-medium shadow-none focus:ring-0"
              >
                <div className="flex items-center gap-1.5">
                  <GlobeIcon size={14} className="opacity-70" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-xs">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full ml-1"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 p-4 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl md:hidden flex flex-col gap-2"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
                activeClass="text-primary bg-primary/10 font-semibold scale-110"
                onClick={() => setIsOpen(false)}
                className="
                            px-4 py-3
                            text-base font-medium
                            text-foreground
                            hover:bg-accent
                            rounded-xl
                            transition-colors
                            cursor-pointer
                        "
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


// src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Menu, X, ChevronDown, LayoutDashboard, Home, BookOpen,
  Bug, Mountain, RotateCcw, TrendingUp, LogOut, Settings
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import type { Language } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { key: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
  { key: 'homeGrowers', path: '/home-grower', icon: Home },
  { key: 'learningCenter', path: '/learning', icon: BookOpen },
  { key: 'diseaseGuide', path: '/disease-guide', icon: Bug },
  { key: 'soilHealth', path: '/soil-health', icon: Mountain },
  { key: 'cropRotation', path: '/crop-rotation', icon: RotateCcw },
  { key: 'marketDashboard', path: '/market', icon: TrendingUp },
];

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'te', label: 'తె' },
];

export default function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const { user, logout } = useAuth(); // user is null when not logged in
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  // isLoggedIn = user !== null
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(245,237,224,0.95)] backdrop-blur-xl shadow-[0_2px_20px_rgba(92,61,46,0.08)]'
            : 'bg-[rgba(245,237,224,0.9)] backdrop-blur-md'
        } border-b border-[rgba(212,165,116,0.2)]`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Leaf className="w-6 h-6 text-[#C75B39]" />
            <span className="font-['Playfair_Display'] font-bold text-[22px] text-[#5C3D2E]">
              ARGONOVA
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                      active
                        ? 'text-[#5C3D2E] bg-[rgba(199,91,57,0.08)]'
                        : 'text-[#8B7355] hover:text-[#5C3D2E] hover:bg-[rgba(212,165,116,0.1)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t[link.key as keyof typeof t] as string}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#E8E6DC] rounded-full text-[12px] font-semibold text-[#5C3D2E] hover:bg-[#D4A574] hover:bg-opacity-30 transition-colors"
              >
                {languages.find(l => l.code === language)?.label || 'EN'}
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-[rgba(212,165,116,0.2)] py-2 z-50 min-w-[100px]"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5EDE0] transition-colors ${
                            language === lang.code ? 'text-[#C75B39] font-semibold' : 'text-[#5C3D2E]'
                          }`}
                        >
                          {lang.code === 'en' && 'English'}
                          {lang.code === 'hi' && 'हिन्दी'}
                          {lang.code === 'te' && 'తెలుగు'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Auth / User Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[rgba(212,165,116,0.1)] transition-colors"
                >
                  <div className="w-8 h-8 bg-[#C75B39] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-[#5C3D2E]">
                    {user?.fullName?.split(' ')[0] || 'User'}
                  </span>
                </button>
                <AnimatePresence>
                  {userOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-[rgba(212,165,116,0.2)] py-2 z-50 min-w-[180px]"
                      >
                        <div className="px-4 py-2 border-b border-[rgba(212,165,116,0.1)]">
                          <p className="text-sm font-medium text-[#5C3D2E]">{user?.fullName}</p>
                          <p className="text-xs text-[#8B7355]">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#5C3D2E] hover:bg-[#F5EDE0] transition-colors"
                          onClick={() => setUserOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          {t.dashboard || 'Dashboard'}
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#5C3D2E] hover:bg-[#F5EDE0] transition-colors"
                          onClick={() => setUserOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={() => { logout(); setUserOpen(false); }}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#B5422A] hover:bg-[#F5EDE0] transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {t.logout || 'Logout'}
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#5C3D2E] border border-[#5C3D2E] rounded-xl hover:bg-[#5C3D2E] hover:text-white transition-all duration-200"
                >
                  {t.login || 'Login'}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#C75B39] rounded-xl hover:bg-[#A8482D] transition-all duration-200"
                >
                  {t.register || 'Register'}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[rgba(212,165,116,0.1)]"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#5C3D2E]" /> : <Menu className="w-5 h-5 text-[#5C3D2E]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#5C3D2E] pt-[72px]"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 w-full px-6 py-4 rounded-xl text-lg font-medium transition-all ${
                        active
                          ? 'text-[#C75B39] bg-[rgba(199,91,57,0.1)]'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {t[link.key as keyof typeof t] as string}
                    </Link>
                  </motion.div>
                );
              })}
              {!isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 w-full mt-6"
                >
                  <Link to="/login" className="w-full py-3 text-center text-white border border-white/30 rounded-xl font-medium">
                    {t.login || 'Login'}
                  </Link>
                  <Link to="/register" className="w-full py-3 text-center text-white bg-[#C75B39] rounded-xl font-medium">
                    {t.register || 'Register'}
                  </Link>
                </motion.div>
              )}
              {isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 w-full mt-6"
                >
                  <div className="text-white/60 text-sm text-center mb-2">
                    {user?.fullName || 'User'}
                  </div>
                  <Link to="/settings" className="w-full py-3 text-center text-white border border-white/30 rounded-xl font-medium">
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full py-3 text-center text-white bg-red-600/80 rounded-xl font-medium"
                  >
                    {t.logout || 'Logout'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <footer className="bg-[#3D3632] text-white relative overflow-hidden">
      {/* Subtle leaf pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C15 20 5 30 5 40c0 15 15 20 25 15 10 5 25 0 25-15 0-10-10-20-25-35z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }} />

      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[#C75B39]" />
              <span className="font-['Playfair_Display'] font-bold text-xl text-white">ARGONOVA</span>
            </div>
            <p className="text-[#D4A574] text-sm leading-relaxed mb-6">
              {t.empowering}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C75B39] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C75B39] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C75B39] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C75B39] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Tools Column */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <h4 className="text-[#D4A574] font-semibold text-sm mb-5 tracking-wide">{t.tools}</h4>
            <ul className="space-y-3">
              {[
                { label: t.dashboard, path: '/dashboard' },
                { label: t.soilHealth, path: '/soil-health' },
                { label: t.diseaseGuide, path: '/disease-guide' },
                { label: t.cropRotation, path: '/crop-rotation' },
                { label: t.marketDashboard, path: '/market' },
                { label: t.weatherForecasts, path: '/dashboard' },
              ].map(item => (
                <li key={item.path + item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <h4 className="text-[#D4A574] font-semibold text-sm mb-5 tracking-wide">{t.resources}</h4>
            <ul className="space-y-3">
              {[
                { label: t.learningCenter, path: '/learning' },
                { label: t.homeGrowers, path: '/home-grower' },
                { label: t.aiCropGuidance, path: '/dashboard' },
                { label: t.weatherForecasts, path: '/dashboard' },
              ].map(item => (
                <li key={item.path + item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <h4 className="text-[#D4A574] font-semibold text-sm mb-5 tracking-wide">{t.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-white/60">{t.emailAddress}</li>
              <li className="text-white/60">{t.phone}</li>
              <li className="text-white/60">{t.address}</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">{t.copyright}</p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/pages/Login.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password.trim());
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-[72px]">
      {/* Left Panel - Image */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="hidden lg:block w-1/2 relative"
      >
        <img
          src="/images/farmer-portrait-1.jpg"
          alt="Farmer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,61,46,0.5)] to-[rgba(92,61,46,0.8)]" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="font-['Playfair_Display'] font-bold text-3xl mb-4">ARGONOVA</h2>
          <p className="text-white/70 text-lg italic mb-6">"Technology meets tradition for a bountiful harvest."</p>
          <p className="text-white/50 text-sm">50,000+ Farmers | 3 Languages | 30+ Crops</p>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex-1 flex items-center justify-center bg-[#F5EDE0] px-6 py-12"
      >
        <div className="w-full max-w-[420px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="font-['Playfair_Display'] font-bold text-[32px] text-[#5C3D2E] mb-2">
              {t.welcomeBack || 'Welcome Back'}
            </h1>
            <p className="text-[#8B7355] text-sm mb-8">{t.signIn || 'Sign in to your account'}</p>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-[#5C3D2E] mb-2">{t.email || 'Email'}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-[#5C3D2E] text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-[#5C3D2E] mb-2">{t.password || 'Password'}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-[#5C3D2E] text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10 transition-all"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#5C3D2E]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 text-sm text-[#8B7355] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#D4A574] text-[#C75B39] focus:ring-[#C75B39]" />
                {t.rememberMe || 'Remember me'}
              </label>
              <button type="button" className="text-sm text-[#C75B39] hover:underline">{t.forgotPassword || 'Forgot password?'}</button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C75B39] text-white font-semibold rounded-xl hover:bg-[#A8482D] active:scale-[0.98] disabled:opacity-60 transition-all duration-200"
            >
              {loading ? '...' : t.signInButton || 'Sign In'}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-[#8B7355] mt-8"
          >
            {t.noAccount || "Don't have an account?"}{' '}
            <Link to="/register" className="text-[#C75B39] font-medium hover:underline">
              {t.registerLink || 'Register'}
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
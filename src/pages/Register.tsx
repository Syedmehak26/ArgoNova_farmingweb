// src/pages/Register.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Lock, MapPin, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const cropOptions = ['Rice', 'Wheat', 'Maize', 'Tomato', 'Chilli', 'Brinjal', 'Onion', 'Potato', 'Cotton', 'Sugarcane', 'Groundnut', 'Soybean', 'Turmeric', 'Other'];
const roleOptions = ['farmer', 'home_grower', 'terrace_gardener'];
const methodOptions = ['organic', 'chemical', 'mixed'];
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
];
const stateOptions = ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha', 'Madhya Pradesh'];

// Strict validators
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: '',
    district: '',
    town: '',
    crops: [] as string[],
    growingMethod: '' as 'organic' | 'chemical' | 'mixed' | '',
    role: '' as 'farmer' | 'home_grower' | 'terrace_gardener' | '',
    language: '' as 'en' | 'hi' | 'te' | '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleCrop = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) ? prev.crops.filter(c => c !== crop) : [...prev.crops, crop],
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address.';
      if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
      if (!validatePassword(formData.password)) {
        newErrors.password = 'Password: min 8 chars, uppercase, lowercase, number & special character.';
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    } else if (step === 2) {
      if (!formData.state) newErrors.state = 'Please select your state.';
      if (!formData.district.trim()) newErrors.district = 'District is required.';
      if (!formData.town.trim()) newErrors.town = 'Town/City is required.';
      if (formData.crops.length === 0) newErrors.crops = 'Select at least one crop.';
    } else if (step === 3) {
      if (!formData.growingMethod) newErrors.growingMethod = 'Select how you grow.';
      if (!formData.role) newErrors.role = 'Select your role.';
      if (!formData.language) newErrors.language = 'Select your preferred language.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => { if (validateStep()) setStep(step + 1); };
  const goPrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setGeneralError('');
    // Validate all steps again before final submission
    const isValid = (() => {
      // Temporarily set step to 1,2,3 and validate each
      const steps = [1, 2, 3];
      let allValid = true;
      for (const s of steps) {
        const stepValid = (() => {
          const newErrors: Record<string, string> = {};
          if (s === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
            if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address.';
            if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
            if (!validatePassword(formData.password)) {
              newErrors.password = 'Password: min 8 chars, uppercase, lowercase, number & special character.';
            }
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
          } else if (s === 2) {
            if (!formData.state) newErrors.state = 'Please select your state.';
            if (!formData.district.trim()) newErrors.district = 'District is required.';
            if (!formData.town.trim()) newErrors.town = 'Town/City is required.';
            if (formData.crops.length === 0) newErrors.crops = 'Select at least one crop.';
          } else if (s === 3) {
            if (!formData.growingMethod) newErrors.growingMethod = 'Select how you grow.';
            if (!formData.role) newErrors.role = 'Select your role.';
            if (!formData.language) newErrors.language = 'Select your preferred language.';
          }
          setErrors(prev => ({ ...prev, ...newErrors }));
          return Object.keys(newErrors).length === 0;
        })();
        if (!stepValid) allValid = false;
      }
      return allValid;
    })();

    if (!isValid) return;

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        state: formData.state,
        district: formData.district,
        town: formData.town,
        crops: formData.crops,
        growingMethod: formData.growingMethod as 'organic' | 'chemical' | 'mixed',
        role: formData.role as 'farmer' | 'home_grower' | 'terrace_gardener',
        language: formData.language as 'en' | 'hi' | 'te',
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setGeneralError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex pt-[72px]">
      {/* Left Panel */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="hidden lg:block w-5/12 relative"
      >
        <img src="/images/crop-rotation.jpg" alt="Crop Rotation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,61,46,0.5)] to-[rgba(92,61,46,0.8)]" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="font-['Playfair_Display'] font-bold text-3xl mb-4">ARGONOVA</h2>
          <p className="text-white/70 text-lg italic mb-8">"Every great harvest begins with a single step."</p>
          <div className="flex gap-3">
            {[1, 2, 3].map(s => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s < step ? 'bg-[#C75B39] text-white' : s === step ? 'bg-white text-[#5C3D2E]' : 'bg-white/20 text-white/50'
              }`}>
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex-1 flex items-center justify-center bg-[#F5EDE0] px-6 py-12 overflow-y-auto"
      >
        <div className="w-full max-w-[480px]">
          {success ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#7A846B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-['Playfair_Display'] font-bold text-2xl text-[#5C3D2E] mb-2">Welcome to Argonova!</h2>
              <p className="text-[#8B7355]">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <>
              <h1 className="font-['Playfair_Display'] font-bold text-[28px] text-[#5C3D2E] mb-1">
                {step === 1 ? 'Create Account' : step === 2 ? 'Farm Details' : 'Preferences'}
              </h1>
              <p className="text-[#8B7355] text-sm mb-8">
                {step === 1 ? 'Step 1 of 3: Personal Information' : step === 2 ? 'Step 2 of 3: Location & Crops' : 'Step 3 of 3: Growing Preferences'}
              </p>

              {generalError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">
                  {generalError}
                </div>
              )}

              <AnimatePresence mode="wait" custom={step}>
                <motion.div
                  key={step}
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                          <input type="text" value={formData.fullName} onChange={e => update('fullName', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10" placeholder="Your full name" />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                          <input type="email" value={formData.email} onChange={e => update('email', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10" placeholder="your@email.com" />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Mobile Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                          <input type="tel" value={formData.phone} onChange={e => update('phone', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10" placeholder="10-digit mobile number" />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                          <input type="password" value={formData.password} onChange={e => update('password', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10" placeholder="Create a password" />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Confirm Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                          <input type="password" value={formData.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10" placeholder="Confirm your password" />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">State *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355] z-10" />
                          <select value={formData.state} onChange={e => update('state', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] focus:ring-2 focus:ring-[#C75B39]/10 appearance-none">
                            <option value="">Select State</option>
                            {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">District *</label>
                        <input type="text" value={formData.district} onChange={e => update('district', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]" placeholder="Your district" />
                        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Town/City *</label>
                        <input type="text" value={formData.town} onChange={e => update('town', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[rgba(212,165,116,0.3)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]" placeholder="Village or town" />
                        {errors.town && <p className="text-red-500 text-xs mt-1">{errors.town}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-3">What do you grow? *</label>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                          {cropOptions.map(crop => (
                            <button key={crop} type="button" onClick={() => toggleCrop(crop)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                formData.crops.includes(crop) ? 'bg-[#C75B39] text-white border-[#C75B39]' : 'bg-white text-[#5C3D2E] border-[rgba(212,165,116,0.3)] hover:border-[#C75B39]'
                              }`}>
                              {crop}
                            </button>
                          ))}
                        </div>
                        {errors.crops && <p className="text-red-500 text-xs mt-1">{errors.crops}</p>}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">How do you grow? *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {methodOptions.map(method => (
                            <button key={method} type="button" onClick={() => update('growingMethod', method)}
                              className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                                formData.growingMethod === method ? 'bg-[#C75B39] text-white border-[#C75B39]' : 'bg-white text-[#5C3D2E] border-[rgba(212,165,116,0.3)] hover:border-[#C75B39]'
                              }`}>
                              {method.charAt(0).toUpperCase() + method.slice(1)}
                            </button>
                          ))}
                        </div>
                        {errors.growingMethod && <p className="text-red-500 text-xs mt-1">{errors.growingMethod}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">I am a *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {roleOptions.map(role => (
                            <button key={role} type="button" onClick={() => update('role', role)}
                              className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                                formData.role === role ? 'bg-[#C75B39] text-white border-[#C75B39]' : 'bg-white text-[#5C3D2E] border-[rgba(212,165,116,0.3)] hover:border-[#C75B39]'
                              }`}>
                              {role.replace('_', ' ').toUpperCase()}
                            </button>
                          ))}
                        </div>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5C3D2E] mb-2">Preferred Language *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {languageOptions.map(lang => (
                            <button key={lang.code} type="button" onClick={() => update('language', lang.code)}
                              className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                                formData.language === lang.code ? 'bg-[#C75B39] text-white border-[#C75B39]' : 'bg-white text-[#5C3D2E] border-[rgba(212,165,116,0.3)] hover:border-[#C75B39]'
                              }`}>
                              {lang.name}
                            </button>
                          ))}
                        </div>
                        {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button onClick={goPrev} className="flex-1 py-3 border border-[#5C3D2E] text-[#5C3D2E] font-semibold rounded-xl hover:bg-[#5C3D2E] hover:text-white transition-all">
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={goNext} className="flex-1 py-3 bg-[#C75B39] text-white font-semibold rounded-xl hover:bg-[#A8482D] transition-all">
                    Next Step
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-[#C75B39] text-white font-semibold rounded-xl hover:bg-[#A8482D] disabled:opacity-60 transition-all flex items-center justify-center gap-2">
                    {loading ? <span className="animate-spin">🌀</span> : 'Create Account'}
                  </button>
                )}
              </div>

              <p className="text-center text-sm text-[#8B7355] mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-[#C75B39] font-medium hover:underline">Login</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

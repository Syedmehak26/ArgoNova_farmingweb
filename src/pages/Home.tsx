import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import {
  TrendingUp, Sparkles, CloudSun, Mountain, Bug, RotateCcw,
  ChevronDown, Quote, Check, Globe
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const features = [
  { key: 'marketPrices', desc: 'marketPricesDesc', icon: TrendingUp, link: '/market', linkText: 'viewPrices' },
  { key: 'aiCropGuidance', desc: 'aiCropGuidanceDesc', icon: Sparkles, link: '/dashboard', linkText: 'tryAI' },
  { key: 'weatherForecasts', desc: 'weatherForecastsDesc', icon: CloudSun, link: '/dashboard', linkText: 'checkWeather' },
  { key: 'soilAnalysis', desc: 'soilAnalysisDesc', icon: Mountain, link: '/soil-health', linkText: 'analyzeSoil' },
  { key: 'diseaseGuideTitle', desc: 'diseaseGuideDesc', icon: Bug, link: '/disease-guide', linkText: 'diagnose' },
  { key: 'cropRotationTitle', desc: 'cropRotationDesc', icon: RotateCcw, link: '/crop-rotation', linkText: 'planRotation' },
];

const steps = [
  { num: '01', title: 'step1', desc: 'step1Desc', img: '/images/farmer-portrait-1.jpg' },
  { num: '02', title: 'step2', desc: 'step2Desc', img: '/images/dashboard-preview.jpg' },
  { num: '03', title: 'step3', desc: 'step3Desc', img: '/images/farmer-portrait-2.jpg' },
];

const testimonials = [
  {
    quote: 'ARGONOVA helped me increase my tomato yield by 40%. The soil analysis told me exactly what nutrients were missing, and the market dashboard helped me sell at the right time.',
    name: 'Rajesh Kumar',
    location: 'Nalgonda, Telangana',
    farm: 'Vegetable Farmer',
    image: '/images/farmer-portrait-1.jpg',
  },
  {
    quote: 'The disease guide saved my chilli crop. I uploaded a photo, identified the infection within minutes, and got the right organic treatment. My crop recovered in two weeks.',
    name: 'Lakshmi Devi',
    location: 'Guntur, Andhra Pradesh',
    farm: 'Chilli Grower',
    image: '/images/farmer-portrait-2.jpg',
  },
  {
    quote: 'Being a home grower in Hyderabad, I never thought technology could help me. The home grower center taught me terrace gardening step by step. Now I grow 12 vegetables at home!',
    name: 'Arun Reddy',
    location: 'Hyderabad, Telangana',
    farm: 'Home Grower',
    image: '/images/farmer-portrait-1.jpg',
  },
];

const tools = [
  { key: 'soilAnalysis', img: '/images/soil-analysis.jpg', desc: 'soilAnalysisDesc', path: '/soil-health' },
  { key: 'diseaseGuideTitle', img: '/images/disease-guide.jpg', desc: 'diseaseGuideDesc', path: '/disease-guide' },
  { key: 'cropRotationTitle', img: '/images/crop-rotation.jpg', desc: 'cropRotationDesc', path: '/crop-rotation' },
  { key: 'homeGrowers', img: '/images/home-grower.jpg', desc: 'urbanGardening', path: '/home-grower' },
  { key: 'learningCenter', img: '/images/learning-center.jpg', desc: 'fromSoil', path: '/learning' },
  { key: 'marketDashboard', img: '/images/market-scene.jpg', desc: 'marketPricesDesc', path: '/market' },
];

export default function Home() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: easeSmooth },
  };

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            poster="/images/hero-fallback.jpg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Fallback image */}
          {!videoLoaded && (
            <img
              src="/images/hero-fallback.jpg"
              alt="Agricultural fields"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(92,61,46,0.35)] via-[rgba(92,61,46,0.5)] to-[rgba(92,61,46,0.85)]" />

        {/* Hero Content */}
        <div className="relative z-[2] text-center px-6 max-w-[800px] mx-auto pt-[72px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#C8A97E] font-semibold text-[13px] tracking-[0.15em] mb-6"
          >
            {t.heroLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-['Playfair_Display'] font-extrabold text-white text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05]"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
          >
            {t.heroTitle1}
            <br />
            {t.heroTitle2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/85 text-base sm:text-lg leading-relaxed max-w-[560px] mx-auto mt-6"
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              to="/register"
              className="px-8 py-3.5 bg-[#C75B39] text-white font-semibold text-[15px] rounded-xl hover:bg-[#A8482D] hover:scale-[1.02] transition-all duration-200"
            >
              {t.getStarted}
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border border-white text-white font-semibold text-[15px] rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              {t.exploreFeatures}
            </button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-20 left-0 right-0 z-[2] hidden sm:block"
        >
          <div className="flex items-center justify-center gap-8 lg:gap-12">
            {[
              { value: 50000, suffix: '+', label: t.farmersCount },
              { value: 3, suffix: '', label: t.languagesCount },
              { value: 30, suffix: '+', label: t.cropsCount },
              { value: 100, suffix: '+', label: t.rotationPlans },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center gap-8 lg:gap-12">
                <div className="text-center">
                  <div className="font-['JetBrains_Mono'] font-bold text-white text-2xl lg:text-[32px]">
                    <CountUp end={stat.value} duration={2} separator="," />
                    {stat.suffix}
                  </div>
                  <div className="text-white/60 text-xs lg:text-[13px] mt-1">{stat.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-10 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2]"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#F5EDE0] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#C75B39] font-semibold text-xs tracking-[0.12em] mb-3">{t.whatWeOffer}</p>
            <h2 className="font-['Playfair_Display'] font-bold text-[#5C3D2E] text-2xl lg:text-[32px] mb-4">{t.everythingNeeds}</h2>
            <p className="text-[#8B7355] text-base lg:text-lg max-w-[600px] mx-auto">{t.powerfulTools}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-[0_2px_12px_rgba(92,61,46,0.04)] hover:shadow-[0_12px_40px_rgba(92,61,46,0.1)] hover:border-[#D4A574] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C75B39]/10 flex items-center justify-center mb-4 group-hover:bg-[#C75B39]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#C75B39]" />
                  </div>
                  <h3 className="font-semibold text-[#5C3D2E] text-lg mb-2">{t[f.key as keyof typeof t] as string}</h3>
                  <p className="text-[#8B7355] text-sm leading-relaxed mb-4">{t[f.desc as keyof typeof t] as string}</p>
                  <Link to={f.link} className="inline-flex items-center gap-1 text-[#C75B39] font-medium text-sm hover:gap-2 transition-all">
                    {t[f.linkText as keyof typeof t] as string}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#C75B39] font-semibold text-xs tracking-[0.12em] mb-3">{t.howItWorks}</p>
            <h2 className="font-['Playfair_Display'] font-bold text-[#5C3D2E] text-2xl lg:text-[32px] mb-4">{t.farmingSimple}</h2>
            <p className="text-[#8B7355] text-base lg:text-lg">{t.threeSteps}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Timeline connector - desktop */}
            <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-[#D4A574]/30" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                  <img src={step.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(92,61,46,0.5)] to-transparent" />
                  <div className="absolute top-4 left-4 font-['JetBrains_Mono'] font-bold text-5xl text-[#C75B39]/20">
                    {step.num}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C75B39] text-white flex items-center justify-center font-bold text-sm mx-auto mb-4 relative z-10">
                  {step.num.slice(1)}
                </div>
                <h3 className="font-semibold text-[#5C3D2E] text-lg mb-2">
                  {t[step.title as keyof typeof t] as string}
                </h3>
                <p className="text-[#8B7355] text-sm leading-relaxed">
                  {t[step.desc as keyof typeof t] as string}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#5C3D2E] py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#C8A97E] font-semibold text-xs tracking-[0.12em] mb-3">{t.yourDashboard}</p>
            <h2 className="font-['Playfair_Display'] font-bold text-white text-2xl lg:text-[32px] mb-4">{t.everythingGlance}</h2>
            <p className="text-white/60 text-base lg:text-lg">{t.commandCenter}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-[900px] mx-auto"
          >
            {/* Browser Frame */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="bg-[#E8E6DC] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#B5422A]" />
                  <div className="w-3 h-3 rounded-full bg-[#D4943A]" />
                  <div className="w-3 h-3 rounded-full bg-[#7A846B]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-[#8B7355] text-center">
                    dashboard.argonova.in
                  </div>
                </div>
              </div>
              {/* Dashboard Preview Image */}
              <img
                src="/images/dashboard-preview.jpg"
                alt="Dashboard Preview"
                className="w-full h-auto"
              />
            </div>

            {/* Floating Widgets */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -left-4 lg:-left-12 top-8 w-44 bg-white rounded-xl shadow-lg p-4 hidden md:block"
            >
              <div className="text-[#8B7355] text-xs mb-1">{t.temperature}</div>
              <div className="font-['JetBrains_Mono'] font-bold text-[#5C3D2E] text-3xl">32°C</div>
              <div className="flex items-center gap-1 text-[#D4943A] text-xs mt-1">
                <CloudSun className="w-3 h-3" /> Sunny
              </div>
              <div className="text-[#8B7355] text-xs mt-2">{t.humidity}: 65%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="absolute -right-4 lg:-right-12 top-16 w-44 bg-white rounded-xl shadow-lg p-4 hidden md:block"
            >
              <div className="text-[#8B7355] text-xs mb-2">{t.soilHealth}</div>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#E8E6DC" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#C75B39" strokeWidth="4" strokeDasharray={`${78 * 1.26} ${48 * 3.14}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#5C3D2E]">78</span>
                </div>
                <div className="text-xs text-[#8B7355]">Black Cotton<br />Soil</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -left-4 lg:-left-8 bottom-12 w-48 bg-white rounded-xl shadow-lg p-4 hidden md:block"
            >
              <div className="text-[#8B7355] text-xs mb-1">Wheat</div>
              <div className="font-['JetBrains_Mono'] font-bold text-[#C75B39] text-lg">₹2,450/quintal</div>
              <div className="flex items-center gap-1 text-[#7A846B] text-xs mt-1">
                <TrendingUp className="w-3 h-3" /> +1.2%
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5EDE0] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#C75B39] font-semibold text-xs tracking-[0.12em] mb-3">{t.farmerStories}</p>
            <h2 className="font-['Playfair_Display'] font-bold text-[#5C3D2E] text-2xl lg:text-[32px] mb-4">{t.trustedBy}</h2>
            <p className="text-[#8B7355] text-base lg:text-lg">{t.hearFrom}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(92,61,46,0.04)] hover:shadow-[0_12px_40px_rgba(92,61,46,0.1)] transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#C75B39]/15 mb-4" />
                <p className="text-[#5C3D2E] text-base lg:text-lg leading-relaxed italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#5C3D2E] text-sm">{testimonial.name}</p>
                    <p className="text-[#8B7355] text-xs">{testimonial.location}</p>
                  </div>
                  <span className="ml-auto px-2.5 py-1 bg-[#E8E6DC] text-[#8B7355] text-[11px] font-medium rounded-full">
                    {testimonial.farm}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Deep Dive */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#C75B39] font-semibold text-xs tracking-[0.12em] mb-3">{t.exploreTools}</p>
            <h2 className="font-['Playfair_Display'] font-bold text-[#5C3D2E] text-2xl lg:text-[32px] mb-4">{t.powerfulFeatures}</h2>
            <p className="text-[#8B7355] text-base lg:text-lg">{t.fromSoil}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden border border-[rgba(212,165,116,0.15)] shadow-[0_2px_12px_rgba(92,61,46,0.04)] hover:shadow-[0_12px_40px_rgba(92,61,46,0.1)] transition-all duration-300"
              >
                <Link to={tool.path}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={tool.img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#5C3D2E] text-lg mb-2">
                      {t[tool.key as keyof typeof t] as string}
                    </h3>
                    <p className="text-[#8B7355] text-sm mb-3 line-clamp-2">
                      {t[tool.desc as keyof typeof t] as string}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#C75B39] font-medium text-sm">
                      {t.explore}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C3D2E] to-[#3D3632]" />
        <div className="absolute inset-0 bg-[#C75B39] opacity-5" />

        <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-['Playfair_Display'] font-bold text-white text-3xl lg:text-[48px] leading-tight mb-4">
              {t.startFarming}
            </h2>
            <p className="text-white/70 text-base lg:text-lg mb-10">
              {t.joinFarmers}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/register"
                className="px-10 py-4 bg-[#C8A97E] text-[#5C3D2E] font-semibold rounded-xl hover:bg-[#D4B88D] hover:scale-[1.03] transition-all duration-200"
              >
                {t.createAccount}
              </Link>
              <button
                onClick={() => alert('Demo video coming soon!')}
                className="px-10 py-4 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                {t.watchDemo}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <Check className="w-3.5 h-3.5 text-[#7A846B]" />
                {t.freeForever}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <Check className="w-3.5 h-3.5 text-[#7A846B]" />
                {t.noCreditCard}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <Globe className="w-3.5 h-3.5 text-[#7A846B]" />
                {t.threeLanguages}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

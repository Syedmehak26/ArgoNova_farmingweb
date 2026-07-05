// src/pages/Dashboard.tsx

import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Filler } from 'chart.js';
import {
  TrendingUp, TrendingDown, Minus,
  Mountain, Bug, RotateCcw, MessageCircle, BookOpen,
  ChevronRight, Settings, Bell,
  MapPin, Leaf, Sprout, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cropPrices, fertilizerPrices, getPriceHistory } from '../data/marketData';
import Chatbot from '../components/Chatbot';
import { getCurrentWeather, type WeatherData } from '../services/weatherApi';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Filler);

// Mock data for non‑logged‑in users
const mockUserData = {
  fullName: 'Guest Farmer',
  district: 'Vijayawada',
  state: 'Andhra Pradesh',
  crops: ['Rice', 'Tomato', 'Chilli'],
  growingMethod: 'mixed',
  role: 'farmer',
  language: 'en',
  town: 'Vijayawada',
};

export default function Dashboard() {
  const { user } = useAuth();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Use user data if logged in, else mock
  const displayUser = user || mockUserData;

  // Fetch weather based on town (user's town or mock town)
  const town = displayUser.town || 'Vijayawada';

  useEffect(() => {
    getCurrentWeather(town)
      .then(res => {
        if (res.success && res.data) setWeather(res.data as WeatherData);
        setWeatherLoading(false);
      })
      .catch(() => setWeatherLoading(false));
  }, [town]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  // Soil score (mock if not logged in)
  const soilScore = useMemo(() => {
    let score = 60;
    if (displayUser?.growingMethod === 'organic') score += 20;
    if (displayUser?.role === 'terrace_gardener') score += 5;
    return Math.min(score, 100);
  }, [displayUser]);

  const soilChartData = {
    labels: ['Water', 'Fertility', 'Organic', 'pH Balance'],
    datasets: [{
      data: [70, displayUser?.growingMethod === 'organic' ? 80 : 50, displayUser?.growingMethod === 'organic' ? 75 : 45, 70],
      backgroundColor: ['#6B8FA8', '#7A846B', '#C8A97E', '#C75B39'],
      borderWidth: 0,
    }],
  };

  const marketChartData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [{
      label: 'Rice',
      data: getPriceHistory('Rice'),
      borderColor: '#C75B39',
      backgroundColor: 'rgba(199,91,57,0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8B7355', font: { size: 10 } } },
      y: { grid: { color: 'rgba(212,165,116,0.1)' }, ticks: { color: '#8B7355', font: { size: 10 } } },
    },
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Disease alerts – based on first crop (mock or real)
  const firstCrop = displayUser?.crops?.[0] || 'crops';
  const diseaseAlerts = [
    { level: 'Monitor', color: 'bg-[#6B8FA8]', text: `Monitor your ${firstCrop}` },
    { level: 'Medium', color: 'bg-[#D4943A]', text: 'Check soil moisture regularly' },
  ];

  // Show edit profile link only if logged in
  const showEdit = !!user;

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-semibold text-[#5C3D2E] text-xl lg:text-2xl">
              {greeting}, {displayUser.fullName.split(' ')[0] || 'Farmer'} 👋
            </h1>
            <p className="text-[#8B7355] text-sm mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showEdit && (
              <Link to="/settings" className="p-2.5 rounded-xl hover:bg-[rgba(212,165,116,0.1)] text-[#8B7355] transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
            )}
            <button className="p-2.5 rounded-xl hover:bg-[rgba(212,165,116,0.1)] text-[#8B7355] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C75B39] rounded-full" />
            </button>
          </div>
        </motion.div>

        {/* User Profile Card */}
        <motion.div {...fadeUp} transition={{ delay: 0.04 }}
          className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#C75B39] text-white flex items-center justify-center text-xl font-bold">
                {displayUser.fullName.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-[#5C3D2E]">{displayUser.fullName}</h2>
                <p className="text-sm text-[#8B7355] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {displayUser.district}, {displayUser.state}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#5C3D2E]">
              <span className="bg-[#F5EDE0] px-3 py-1 rounded-full flex items-center gap-1">
                <Sprout className="w-4 h-4" /> {displayUser.crops?.join(', ') || 'No crops'}
              </span>
              <span className="bg-[#F5EDE0] px-3 py-1 rounded-full flex items-center gap-1">
                <Leaf className="w-4 h-4" /> {displayUser.growingMethod}
              </span>
              <span className="bg-[#F5EDE0] px-3 py-1 rounded-full flex items-center gap-1">
                <User className="w-4 h-4" /> {displayUser.role?.replace('_', ' ')}
              </span>
              <span className="bg-[#F5EDE0] px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {displayUser.language?.toUpperCase()}
              </span>
            </div>
            {showEdit && (
              <Link to="/settings" className="ml-auto text-[#C75B39] text-sm font-medium hover:underline">
                Edit Profile
              </Link>
            )}
            {!user && (
              <Link to="/auth" className="ml-auto text-[#C75B39] text-sm font-medium hover:underline">
                Register to personalize
              </Link>
            )}
          </div>
        </motion.div>

        {/* Grid Widgets – same as before but use displayUser */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Weather Widget */}
          <motion.div {...fadeUp} transition={{ delay: 0.08 }} className="lg:col-span-1 flex flex-col h-full">
            <div className="bg-gradient-to-br from-[#6B8FA8] to-[#8FAFC0] rounded-2xl p-6 text-white flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20 text-6xl">☀️</div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-sm font-medium opacity-80 mb-4">Weather</div>
                {weatherLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-8 w-20 bg-white/20 rounded" />
                    <div className="h-4 w-16 bg-white/20 rounded" />
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[1,2,3].map(i => <div key={i} className="h-14 bg-white/10 rounded" />)}
                    </div>
                  </div>
                ) : weather ? (
                  <>
                    <div className="font-['JetBrains_Mono'] font-bold text-5xl mb-1">{weather.temperature}°C</div>
                    <div className="text-sm opacity-80 mb-4 capitalize">{weather.description}</div>
                    <div className="grid grid-cols-3 gap-3 text-xs mt-auto">
                      <div className="bg-white/10 rounded-lg p-2 text-center">
                        <span className="opacity-70">Humidity</span>
                        <div className="font-semibold">{weather.humidity}%</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 text-center">
                        <span className="opacity-70">Wind</span>
                        <div className="font-semibold">{weather.windSpeed} km/h</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 text-center">
                        <span className="opacity-70">Rain</span>
                        <div className="font-semibold">{weather.rain || 0}%</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm opacity-80">Weather data unavailable</div>
                )}
                <p className="text-xs opacity-60 mt-4 text-center">{town}, {displayUser.district}</p>
              </div>
            </div>
          </motion.div>

          {/* Soil Health */}
          <motion.div {...fadeUp} transition={{ delay: 0.16 }}
            className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Soil Health</span>
              <Mountain className="w-4 h-4 text-[#8B7355]" />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="w-24 h-24 relative shrink-0">
                <Doughnut data={soilChartData} options={{
                  cutout: '70%',
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-['JetBrains_Mono'] font-bold text-lg text-[#5C3D2E]">{soilScore}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8B7355]">Method: <span className="text-[#5C3D2E] font-medium capitalize">{displayUser.growingMethod}</span></div>
                <div className="text-sm text-[#8B7355]">Crops: <span className="text-[#5C3D2E] font-medium">{displayUser.crops?.length || 0} varieties</span></div>
                <Link to="/soil-health" className="text-[#C75B39] text-xs font-medium mt-2 inline-flex items-center gap-1 hover:underline">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Your Crops */}
          <motion.div {...fadeUp} transition={{ delay: 0.24 }}
            className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Your Crops</span>
              <RotateCcw className="w-4 h-4 text-[#8B7355]" />
            </div>
            <div className="space-y-3 flex-1">
              {(displayUser.crops?.length ? displayUser.crops : ['Tomato', 'Chilli']).slice(0, 4).map(crop => (
                <div key={crop} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8E6DC] flex items-center justify-center text-lg">🌾</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#5C3D2E]">{crop}</div>
                    <div className="w-full bg-[#E8E6DC] rounded-full h-1.5 mt-1">
                      <div className="bg-[#7A846B] h-1.5 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#7A846B]">75%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disease Alerts */}
          <motion.div {...fadeUp} transition={{ delay: 0.32 }}
            className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Disease Alerts</span>
              <Bug className="w-4 h-4 text-[#8B7355]" />
            </div>
            <div className="space-y-3 flex-1">
              {diseaseAlerts.map(alert => (
                <div key={alert.text} className="flex items-center gap-3">
                  <span className={`${alert.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
                    {alert.level}
                  </span>
                  <span className="text-sm text-[#5C3D2E]">{alert.text}</span>
                </div>
              ))}
            </div>
            <Link to="/disease-guide" className="text-[#C75B39] text-xs font-medium mt-4 inline-flex items-center gap-1 hover:underline">
              View Details <ChevronRight className="w-3 h-3" />
            </Link>
          </motion.div>

          {/* Market Trends */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Market Trends</span>
              <Link to="/market" className="text-[#C75B39] text-xs font-medium hover:underline">View Market</Link>
            </div>
            <div className="h-40 flex-1">
              <Line data={marketChartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {cropPrices.slice(0, 5).map(c => (
                <div key={c.commodity + c.variety} className="text-center">
                  <div className="text-xs font-medium text-[#5C3D2E]">{c.commodity}</div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[#C75B39]">₹{c.currentPrice.toLocaleString()}</div>
                  <div className={`flex items-center justify-center gap-0.5 text-[10px] ${c.trend === 'up' ? 'text-[#7A846B]' : c.trend === 'down' ? 'text-[#B5422A]' : 'text-[#8B7355]'}`}>
                    {c.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : c.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {Math.abs(c.change)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fertilizer Prices */}
          <motion.div {...fadeUp} transition={{ delay: 0.48 }}
            className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Fertilizer Prices</span>
              <Link to="/market" className="text-[#8B7355] text-xs hover:underline">View All</Link>
            </div>
            <div className="space-y-3 flex-1">
              {fertilizerPrices.slice(0, 5).map(f => (
                <div key={f.name} className="flex items-center justify-between">
                  <span className="text-sm text-[#5C3D2E]">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono'] text-sm text-[#5C3D2E]">₹{f.currentPrice}</span>
                    {f.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-[#B5422A]" /> : f.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-[#7A846B]" /> : <Minus className="w-3.5 h-3.5 text-[#8B7355]" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Learning Progress */}
          <motion.div {...fadeUp} transition={{ delay: 0.56 }}
            className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Learning Progress</span>
              <BookOpen className="w-4 h-4 text-[#8B7355]" />
            </div>
            <div className="flex items-center gap-4 mb-4 flex-1">
              <div className="w-16 h-16 relative shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#E8E6DC" strokeWidth="4" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#C75B39" strokeWidth="4" strokeDasharray={`${25 * 1.76} ${64 * 2.75}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-sm text-[#5C3D2E]">25%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-[#5C3D2E]">3 of 12 completed</div>
                <div className="text-xs text-[#8B7355]">Keep learning!</div>
              </div>
            </div>
            <Link to="/learning" className="text-[#C75B39] text-xs font-medium hover:underline">Go to Learning</Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div {...fadeUp} transition={{ delay: 0.64 }}
            className="md:col-span-2 lg:col-span-1 bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {[
                { icon: Mountain, label: 'Soil Health', path: '/soil-health' },
                { icon: Bug, label: 'Disease Guide', path: '/disease-guide' },
                { icon: RotateCcw, label: 'Crop Rotation', path: '/crop-rotation' },
                { icon: MessageCircle, label: 'AI Chat', path: '#' },
              ].map(action => (
                <Link key={action.label} to={action.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F5EDE0] hover:bg-[#E8E6DC] transition-colors group">
                  <action.icon className="w-6 h-6 text-[#C75B39] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#5C3D2E] text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
      <Chatbot />
    </div>
  );
}
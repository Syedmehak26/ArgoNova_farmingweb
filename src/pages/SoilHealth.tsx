import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarElement, Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Mountain, Droplets, Sparkles, Beaker, Leaf, Check } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { soilTypes, type SoilType } from '../data/soilData';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const soilIcons: Record<string, string> = {
  alluvial: '🌊', 'black-cotton': '🖤', red: '🔴', laterite: '🧱',
  desert: '🏜️', mountain: '⛰️', peat: '🌿', saline: '🧂',
  loamy: '✨', sandy: '🏖️',
};

export default function SoilHealth() {
  const { t } = useI18n();
  const [selectedSoil, setSelectedSoil] = useState<SoilType>(soilTypes[0]);

  const yieldChartData = {
    labels: selectedSoil.expectedYield.map(y => y.crop),
    datasets: [
      {
        label: 'Expected',
        data: selectedSoil.expectedYield.map(y => y.yield),
        backgroundColor: '#C75B39',
        borderRadius: 6,
      },
      {
        label: 'Average',
        data: selectedSoil.expectedYield.map(y => y.average),
        backgroundColor: '#D4A574',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { font: { size: 11 }, color: '#5C3D2E' } } },
    scales: {
      y: { grid: { color: 'rgba(212,165,116,0.1)' }, ticks: { color: '#8B7355', font: { size: 10 } } },
      x: { grid: { display: false }, ticks: { color: '#8B7355', font: { size: 10 } } },
    },
  };

  const progressBar = (label: string, value: number, color: string) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#5C3D2E] font-medium">{label}</span>
        <span className="font-['JetBrains_Mono'] text-[#8B7355]">{value}%</span>
      </div>
      <div className="h-2.5 bg-[#E8E6DC] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-48 rounded-2xl overflow-hidden mb-8"
        >
          <img src="/images/soil-analysis.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(92,61,46,0.7)] to-transparent flex items-center px-8">
            <div>
              <h1 className="font-['Playfair_Display'] font-bold text-white text-3xl mb-2">{t.soilHealthPageTitle}</h1>
              <p className="text-white/70 text-sm">Select your soil type to get personalized recommendations</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Soil Type Selector */}
          <div className="lg:w-[35%]">
            <h3 className="font-semibold text-[#5C3D2E] mb-4">{t.selectSoil}</h3>
            <div className="grid grid-cols-2 gap-3">
              {soilTypes.map(soil => (
                <motion.button
                  key={soil.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSoil(soil)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedSoil.id === soil.id
                      ? 'border-[#C75B39] bg-[#C75B39]/5'
                      : 'border-transparent bg-white hover:border-[#D4A574]'
                  }`}
                >
                  <div className="text-2xl mb-1">{soilIcons[soil.id]}</div>
                  <div className="text-sm font-medium text-[#5C3D2E]">{soil.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right - Analysis Report */}
          <div className="lg:w-[65%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSoil.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{soilIcons[selectedSoil.id]}</div>
                    <div>
                      <h2 className="font-['Playfair_Display'] font-bold text-xl text-[#5C3D2E]">{selectedSoil.name}</h2>
                      <p className="text-[#8B7355] text-sm">{selectedSoil.description}</p>
                    </div>
                  </div>

                  {/* Properties */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#F5EDE0] rounded-xl p-5">
                      <h4 className="font-semibold text-[#5C3D2E] text-sm mb-4 flex items-center gap-2">
                        <Beaker className="w-4 h-4 text-[#C75B39]" /> Soil Properties
                      </h4>
                      {progressBar(t.waterRetention, selectedSoil.waterRetention, '#6B8FA8')}
                      {progressBar(t.fertility, selectedSoil.fertility, '#7A846B')}
                      {progressBar(t.phLevel, Math.round((selectedSoil.phLevel / 14) * 100), '#C8A97E')}
                      {progressBar(t.organicMatter, selectedSoil.organicMatter, '#C75B39')}
                      <div className="text-sm text-[#8B7355] mt-2">pH Level: <span className="font-['JetBrains_Mono'] font-medium text-[#5C3D2E]">{selectedSoil.phLevel}</span></div>
                    </div>

                    <div className="space-y-4">
                      {/* Recommended Crops */}
                      <div className="bg-[#F5EDE0] rounded-xl p-5">
                        <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-[#7A846B]" /> {t.recommendedCrops}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSoil.recommendedCrops.map(crop => (
                            <span key={crop.name} className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-[#5C3D2E] border border-[rgba(212,165,116,0.2)]">
                              {crop.name} <span className="text-[#7A846B]">{crop.suitability}%</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Fertilizer Advice */}
                      <div className="bg-[#F5EDE0] rounded-xl p-5">
                        <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C8A97E]" /> {t.fertilizerAdvice}
                        </h4>
                        <div className="text-xs text-[#8B7355] space-y-1">
                          <p><span className="font-medium text-[#5C3D2E]">Organic:</span> {selectedSoil.fertilizers.organic}</p>
                          <p><span className="font-medium text-[#5C3D2E]">Chemical:</span> {selectedSoil.fertilizers.chemical}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Irrigation Tips */}
                  <div className="bg-[#F5EDE0] rounded-xl p-5 mb-6">
                    <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#6B8FA8]" /> {t.irrigationTips}
                    </h4>
                    <ul className="space-y-2">
                      {selectedSoil.irrigationTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]">
                          <Check className="w-4 h-4 text-[#7A846B] shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Yield Chart */}
                  <div className="bg-[#F5EDE0] rounded-xl p-5">
                    <h4 className="font-semibold text-[#5C3D2E] text-sm mb-4 flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-[#C75B39]" /> {t.expectedYield}
                    </h4>
                    <div className="h-48">
                      <Bar data={yieldChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

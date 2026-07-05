import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Trash2, ArrowRight, Sprout, Droplets, Shield, TrendingUp, Loader2 } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { crops, generateRotationPlan } from '../data/cropData';

export default function CropRotation() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);
  const [generating, setGenerating] = useState(false);

  const filteredCrops = crops.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleCrop = (id: string) => {
    setSelectedCrops(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    setShowPlan(false);
  };

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowPlan(true);
    }, 1500);
  };

  const plan = generateRotationPlan(selectedCrops);

  const seasonIcons = ['🌸', '☀️', '🍂', '❄️'];
  const seasonNames = ['Spring', 'Summer', 'Monsoon', 'Winter'];

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-48 rounded-2xl overflow-hidden mb-8">
          <img src="/images/crop-rotation.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(92,61,46,0.7)] to-transparent flex items-center px-8">
            <div>
              <h1 className="font-['Playfair_Display'] font-bold text-white text-3xl mb-2">{t.cropRotationPageTitle}</h1>
              <p className="text-white/70 text-sm">Plan optimal crop sequences for maximum yield</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Crop Selection */}
          <div className="lg:w-[45%]">
            <div className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm">
              <h3 className="font-semibold text-[#5C3D2E] mb-4">{t.selectCurrentCrop}</h3>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5EDE0] border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C75B39]/20"
                  placeholder="Search crops..." />
              </div>

              {/* Selected sequence strip */}
              {selectedCrops.length > 0 && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-[#F5EDE0] rounded-xl overflow-x-auto">
                  {selectedCrops.map((id, i) => {
                    const crop = crops.find(c => c.id === id);
                    return (
                      <div key={id} className="flex items-center gap-1 shrink-0">
                        {i > 0 && <ArrowRight className="w-3 h-3 text-[#D4A574]" />}
                        <span className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-[#5C3D2E] whitespace-nowrap">
                          {crop?.icon} {crop?.name}
                        </span>
                        <button onClick={() => toggleCrop(id)} className="text-[#B5422A] hover:bg-[#B5422A]/10 rounded p-0.5"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Crop grid */}
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                {filteredCrops.map(crop => (
                  <motion.button
                    key={crop.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => toggleCrop(crop.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedCrops.includes(crop.id)
                        ? 'border-[#C75B39] bg-[#C75B39]/5'
                        : 'border-transparent bg-[#F5EDE0] hover:border-[#D4A574]'
                    }`}
                  >
                    <div className="text-xl mb-1">{crop.icon}</div>
                    <div className="text-xs font-medium text-[#5C3D2E]">{crop.name}</div>
                    <div className="text-[10px] text-[#8B7355]">{crop.duration}</div>
                  </motion.button>
                ))}
              </div>

              {selectedCrops.length >= 2 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  onClick={generatePlan} disabled={generating}
                  className="w-full mt-4 py-3 bg-[#C75B39] text-white font-semibold rounded-xl hover:bg-[#A8482D] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <>{t.generatePlan} <RotateCcw className="w-4 h-4" /></>}
                </motion.button>
              )}
            </div>
          </div>

          {/* Right - Rotation Plan */}
          <div className="lg:w-[55%]">
            <AnimatePresence>
              {showPlan && plan.sequence.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm mb-6">
                    <h3 className="font-semibold text-[#5C3D2E] mb-6">{t.rotationPlan}</h3>

                    {/* Timeline */}
                    <div className="space-y-4">
                      {plan.sequence.map((crop, i) => (
                        <motion.div
                          key={crop.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }} className="flex items-start gap-4"
                        >
                          <div className="w-12 h-12 bg-[#C75B39]/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                            <span className="text-lg">{seasonIcons[i % 4]}</span>
                            <span className="text-[8px] text-[#8B7355] uppercase">{seasonNames[i % 4]}</span>
                          </div>
                          <div className="flex-1 bg-[#F5EDE0] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{crop.icon}</span>
                              <span className="font-semibold text-[#5C3D2E]">{crop.name}</span>
                              <span className="text-xs text-[#8B7355] bg-white px-2 py-0.5 rounded-full">{crop.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8B7355]">
                              <span>N: {crop.nitrogenUse}</span>
                              <span>Water: {crop.waterRequirement}</span>
                              <span>Family: {crop.family}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: t.soilRecovery, value: plan.soilRecovery, icon: Sprout, color: '#7A846B' },
                      { label: t.pestReduction, value: plan.pestReduction, icon: Shield, color: '#6B8FA8' },
                      { label: t.yieldImprovement, value: plan.yieldImprovement, icon: TrendingUp, color: '#C75B39' },
                      { label: t.waterRequirement, value: plan.waterRequirement === 'High' ? 75 : plan.waterRequirement === 'Medium' ? 50 : 25, icon: Droplets, color: '#6B8FA8', text: plan.waterRequirement },
                    ].map(metric => (
                      <motion.div
                        key={metric.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-5 border border-[rgba(212,165,116,0.15)]"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                          <span className="text-sm font-medium text-[#5C3D2E]">{metric.label}</span>
                        </div>
                        <div className="text-2xl font-bold text-[#5C3D2E]">
                          {metric.text ? metric.text : `${metric.value}%`}
                        </div>
                        {!metric.text && (
                          <div className="w-full bg-[#E8E6DC] rounded-full h-2 mt-2">
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-2 rounded-full" style={{ backgroundColor: metric.color }}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showPlan && (
              <div className="flex items-center justify-center h-full min-h-[300px] text-center">
                <div>
                  <RotateCcw className="w-12 h-12 text-[#D4A574] mx-auto mb-4" />
                  <p className="text-[#8B7355] text-sm">Select 2 or more crops and generate your rotation plan</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

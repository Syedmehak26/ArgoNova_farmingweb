import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout, Droplets, Sun, Maximize, Clock, X,
  Play, AlertTriangle, Check, FlaskConical, Calendar
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { plantGuides, type PlantGuide } from '../data/homeGrowerData';



const difficultyColors = { Easy: 'bg-[#7A846B]', Medium: 'bg-[#D4943A]', Hard: 'bg-[#B5422A]' };

export default function HomeGrower() {
  const { t } = useI18n();
  const [selectedPlant, setSelectedPlant] = useState<PlantGuide | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);

  const openPlant = (plant: PlantGuide) => setSelectedPlant(plant);

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-48 rounded-2xl overflow-hidden mb-8">
          <img src="/images/home-grower.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(92,61,46,0.7)] to-transparent flex items-center px-8">
            <div>
              <h1 className="font-['Playfair_Display'] font-bold text-white text-3xl mb-2">{t.homeGrowerTitle}</h1>
              <p className="text-white/70 text-sm">{t.urbanGardening}</p>
            </div>
          </div>
        </motion.div>

        {/* Plant Guides Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-semibold text-[#5C3D2E] text-lg mb-6">{t.plantGuides}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plantGuides.map((plant, i) => (
              <motion.div
                key={plant.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                onClick={() => openPlant(plant)}
                className="bg-white rounded-2xl border border-[rgba(212,165,116,0.15)] shadow-sm hover:shadow-md cursor-pointer overflow-hidden transition-all"
              >
                <div className="h-32 bg-gradient-to-br from-[#7A846B]/20 to-[#C75B39]/20 flex items-center justify-center">
                  <span className="text-5xl">{plant.id === 'tomato' ? '🍅' : plant.id === 'chilli' ? '🌶️' : plant.id === 'mint' ? '🌿' : plant.id === 'coriander' ? '🌱' : plant.id === 'tulsi' ? '🍃' : plant.id === 'spinach' ? '🥬' : plant.id === 'aloe-vera' ? '🪴' : '🌿'}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#5C3D2E]">{plant.name}</h3>
                    <span className={`${difficultyColors[plant.difficulty]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>{plant.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8B7355]">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{plant.timeToHarvest}</span>
                    <span className="flex items-center gap-1"><Droplets className="w-3 h-3" />{plant.waterNeeds.split(' ')[0]}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Plant Detail Modal */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(92,61,46,0.6)] backdrop-blur-sm flex justify-end"
            onClick={() => setSelectedPlant(null)}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#F5EDE0] w-full max-w-lg h-full overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-[rgba(212,165,116,0.2)] flex items-center justify-between z-10">
                <h2 className="font-['Playfair_Display'] font-bold text-xl text-[#5C3D2E]">{selectedPlant.name}</h2>
                <button onClick={() => setSelectedPlant(null)} className="p-2 hover:bg-[#F5EDE0] rounded-lg">
                  <X className="w-5 h-5 text-[#8B7355]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Droplets, label: t.waterNeeds, value: selectedPlant.waterNeeds },
                    { icon: Sun, label: t.sunlight, value: selectedPlant.sunlight },
                    { icon: Maximize, label: t.potSize, value: selectedPlant.potSize },
                    { icon: Clock, label: t.germinationTime, value: selectedPlant.germinationTime },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl p-3">
                      <stat.icon className="w-4 h-4 text-[#C75B39] mb-1" />
                      <div className="text-[10px] text-[#8B7355] uppercase">{stat.label}</div>
                      <div className="text-xs font-medium text-[#5C3D2E] mt-0.5">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Growing Guide */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-4 flex items-center gap-2"><Sprout className="w-4 h-4 text-[#7A846B]" />{t.growingGuide}</h4>
                  <div className="space-y-4">
                    {selectedPlant.steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-7 h-7 bg-[#C75B39] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                        <div>
                          <div className="font-medium text-[#5C3D2E] text-sm">{step.title}</div>
                          <div className="text-xs text-[#8B7355] mt-0.5">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Care Schedule */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C8A97E]" />{t.careSchedule}</h4>
                  <div className="bg-white rounded-xl p-4 space-y-2">
                    {selectedPlant.careSchedule.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#5C3D2E]">{item.task}</span>
                        <span className="text-[#8B7355]">{item.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Problems */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-[#D4943A]" />{t.commonProblems}</h4>
                  <div className="space-y-2">
                    {selectedPlant.commonProblems.map((prob, i) => (
                      <div key={i} className="bg-white rounded-xl p-4">
                        <div className="font-medium text-[#5C3D2E] text-sm mb-1">{prob.problem}</div>
                        <div className="text-xs text-[#8B7355]">{prob.solution}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organic Fertilizer Tips */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><FlaskConical className="w-4 h-4 text-[#C75B39]" />{t.organicFertilizer}</h4>
                  <ul className="space-y-2">
                    {selectedPlant.fertilizerTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]"><Check className="w-4 h-4 text-[#7A846B] shrink-0 mt-0.5" />{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Watch Video Button */}
                <button
                  onClick={() => setVideoModal(selectedPlant.videoUrl)}
                  className="w-full py-3 bg-[#C75B39] text-white rounded-xl font-semibold text-sm hover:bg-[#A8482D] transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" /> {t.watchVideo}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-black rounded-2xl overflow-hidden max-w-3xl w-full"
            >
              <div className="aspect-video">
                <iframe src={videoModal} className="w-full h-full" allowFullScreen title="Video" />
              </div>
              <div className="p-4 flex justify-end">
                <button onClick={() => setVideoModal(null)} className="text-white/60 hover:text-white text-sm">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

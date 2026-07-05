// src/pages/LearningCenter.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, Clock, User, BookOpen, FileText, Globe, Wrench } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { learningResources, type LearningResource } from '../data/LearningCenter';

const categories = ['All', 'Farmers', 'Home Growers', 'Terrace Gardeners', 'Indoor Growers', 'Vegetable Growers'];
const types = ['All', 'video', 'course', 'pdf', 'article', 'tool'];

const typeIcons = {
  video: <Play size={16} className="inline mr-1" />,
  course: <BookOpen size={16} className="inline mr-1" />,
  pdf: <FileText size={16} className="inline mr-1" />,
  article: <Globe size={16} className="inline mr-1" />,
  tool: <Wrench size={16} className="inline mr-1" />,
};

const typeColors = {
  video: 'bg-blue-100 text-blue-700',
  course: 'bg-green-100 text-green-700',
  pdf: 'bg-red-100 text-red-700',
  article: 'bg-purple-100 text-purple-700',
  tool: 'bg-orange-100 text-orange-700',
};

const typeOrder = ['tool', 'pdf', 'video', 'course', 'article'];

export default function LearningCenter() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalItem, setModalItem] = useState<LearningResource | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = learningResources
    .filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchType = activeType === 'All' || item.type === activeType;
      const matchSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchType && matchSearch;
    })
    .sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type));

  const handleCardClick = (item: LearningResource) => {
    if (item.type === 'video') {
      setModalItem(item);
    } else if (item.type === 'pdf') {
      window.open(item.pdfUrl, '_blank');
    } else if (item.type === 'course' || item.type === 'article') {
      if (item.externalUrl) {
        window.open(item.externalUrl, '_blank');
      } else {
        setModalItem(item); // fallback
      }
    } else {
      setModalItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-24 pb-12 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-[#5C3D2E] mb-3">{t.learningTitle}</h1>
          <p className="text-[#8B7355]">Learn modern agriculture from trusted farmers, universities and experts.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]" size={20} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-xl border border-[#d4a57433] bg-white py-3 pl-12 pr-4 outline-none focus:border-[#C75B39]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl border border-[#d4a57433] bg-white px-5 py-3 hover:border-[#C75B39] transition-colors"
            >
              <Filter size={18} /> Filter
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-[#C75B39] text-white shadow-md'
                        : 'bg-white text-[#5C3D2E] border border-[#d4a57433] hover:bg-[#F8F4EF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeType === type
                        ? 'bg-[#C75B39] text-white shadow-md'
                        : 'bg-white text-[#5C3D2E] border border-[#d4a57433] hover:bg-[#F8F4EF]'
                    }`}
                  >
                    {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-2">No Resources Found</h2>
            <p className="text-[#8B7355]">Try another search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all"
              >
                <div className="relative h-48 bg-gray-200">
                  {item.type === 'video' ? (
                    <>
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/25 flex justify-center items-center">
                        <div className="w-16 h-16 rounded-full bg-[#C75B39] flex items-center justify-center shadow-xl">
                          <Play className="text-white ml-1" size={26} />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 rounded-lg px-2 py-1 text-white text-xs flex items-center gap-1">
                        <Clock size={13} /> {item.duration}
                      </div>
                    </>
                  ) : item.type === 'course' ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                      <BookOpen size={48} className="text-white opacity-60" />
                    </div>
                  ) : item.type === 'pdf' ? (
                    <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                      <FileText size={48} className="text-white opacity-60" />
                    </div>
                  ) : item.type === 'article' ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Globe size={48} className="text-white opacity-60" />
                    </div>
                  ) : item.type === 'tool' ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <Wrench size={48} className="text-white opacity-60" />
                    </div>
                  ) : null}

                  <div className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shadow ${typeColors[item.type]}`}>
                    {typeIcons[item.type]} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="font-semibold text-[#5C3D2E] line-clamp-2 mb-3">{item.title}</h2>
                  <p className="text-sm text-[#8B7355] line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-xs text-[#8B7355]">
                      {item.type === 'video' ? (
                        <>
                          <User size={13} /> {item.channel}
                        </>
                      ) : item.type === 'pdf' ? (
                        <span className="flex items-center gap-1">
                          <FileText size={13} /> {item.pages || '?'} pages
                        </span>
                      ) : item.type === 'course' ? (
                        <span className="flex items-center gap-1">
                          <BookOpen size={13} /> External course
                        </span>
                      ) : item.type === 'article' ? (
                        <span className="flex items-center gap-1">
                          <Globe size={13} /> Read article
                        </span>
                      ) : item.type === 'tool' ? (
                        <span className="flex items-center gap-1">
                          <Wrench size={13} /> Interactive tool
                        </span>
                      ) : null}
                    </span>
                    <span className="bg-[#E8E6DC] rounded-full px-3 py-1 text-xs text-[#5C3D2E]">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal – only for videos and tools (and fallback) */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalItem(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition z-10"
              >
                ✕
              </button>

              {modalItem.type === 'video' && (
                <div className="aspect-video">
                  <iframe
                    src={modalItem.videoUrl}
                    title="Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {modalItem.type === 'tool' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#5C3D2E] mb-2">{modalItem.title}</h2>
                  <p className="text-[#8B7355] mb-4">{modalItem.description}</p>
                  {modalItem.toolIframe ? (
                    <iframe src={modalItem.toolIframe} className="w-full h-[500px] border-0 rounded-xl" title="Tool" />
                  ) : (
                    <div className="bg-[#F5EDE0] p-6 rounded-xl text-center">
                      <p>Tool placeholder – you can embed a weather widget, pH calculator, etc.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback for courses/articles that don't have externalUrl (should not happen) */}
              {(modalItem.type === 'course' || modalItem.type === 'article') && (
                <div className="p-6 text-center">
                  <p className="text-[#8B7355]">This resource opens in a new tab.</p>
                  <button
                    onClick={() => {
                      if (modalItem.externalUrl) {
                        window.open(modalItem.externalUrl, '_blank');
                      }
                      setModalItem(null);
                    }}
                    className="mt-4 px-6 py-2 bg-[#C75B39] text-white rounded-xl"
                  >
                    Open in New Tab
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
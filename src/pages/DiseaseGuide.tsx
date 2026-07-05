import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bug, Upload, X, AlertTriangle, Check, ChevronRight, Leaf, Droplets, Shield, Beaker } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { diseases, cropOptions, type Disease } from '../data/diseaseData';
import { analyzePlantImage, type DiagnosisResult } from '../services/geminiVision';

const severityColors = { High: 'bg-[#B5422A]', Medium: 'bg-[#D4943A]', Low: 'bg-[#6B8FA8]' };

export default function DiseaseGuide() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('All Crops');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [treatmentTab, setTreatmentTab] = useState<'organic' | 'chemical'>('organic');

  // Photo analysis state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const filtered = diseases.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCrop = cropFilter === 'All Crops' || d.crop === cropFilter;
    const matchSeverity = severityFilter === 'All Severities' || d.severity === severityFilter;
    return matchSearch && matchCrop && matchSeverity;
  });

  // Handle image upload and analysis
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start analysis
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzePlantImage(file);
      setAnalysisResult(result);
    } catch (error: any) {
      setAnalysisError(error.message || "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle viewing diagnosis result in modal
  const handleViewDiagnosis = () => {
    if (!analysisResult) return;
    // Convert diagnosis result to disease format
    const diseaseFromResult: Disease = {
      id: analysisResult.diseaseName.toLowerCase().replace(/\s+/g, '-'),
      name: analysisResult.diseaseName,
      nameHi: analysisResult.diseaseNameHi || analysisResult.diseaseName,
      nameTe: analysisResult.diseaseNameTe || analysisResult.diseaseName,
      crop: analysisResult.crop || 'Unknown',
      severity: analysisResult.severity,
      season: 'All',
      symptoms: analysisResult.symptoms,
      causes: analysisResult.causes,
      prevention: analysisResult.prevention,
      organicTreatment: analysisResult.organicTreatment,
      chemicalTreatment: analysisResult.chemicalTreatment,
      fertilizerAdvice: analysisResult.fertilizerAdvice,
    };
    setSelectedDisease(diseaseFromResult);
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-48 rounded-2xl overflow-hidden mb-8">
          <img src="/images/disease-guide.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(92,61,46,0.7)] to-transparent flex items-center px-8">
            <div>
              <h1 className="font-['Playfair_Display'] font-bold text-white text-3xl mb-2">{t.diseaseGuidePageTitle}</h1>
              <p className="text-white/70 text-sm">Identify and treat crop diseases effectively</p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]"
                placeholder={t.searchDiseases}
              />
            </div>
            <select value={cropFilter} onChange={e => setCropFilter(e.target.value)}
              className="px-4 py-3 bg-white border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]">
              {cropOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}
              className="px-4 py-3 bg-white border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]">
              <option>All Severities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </motion.div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((disease, i) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedDisease(disease)}
              className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`${severityColors[disease.severity]} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase`}>
                  {disease.severity}
                </span>
                <span className="text-xs text-[#8B7355] bg-[#E8E6DC] px-2.5 py-1 rounded-full">{disease.crop}</span>
              </div>
              <h3 className="font-semibold text-[#5C3D2E] mb-2">{disease.name}</h3>
              <p className="text-sm text-[#8B7355] line-clamp-2 mb-3">{disease.symptoms[0]}</p>
              <span className="text-[#C75B39] text-xs font-medium flex items-center gap-1">
                {t.viewDetails} <ChevronRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Upload Section with AI Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-[#5C3D2E] to-[#8B7355] rounded-2xl p-8 text-center">
          <Upload className="w-10 h-10 text-[#C8A97E] mx-auto mb-4" />
          <h3 className="font-semibold text-white text-lg mb-2">{t.uploadPhoto}</h3>
          <p className="text-white/60 text-sm mb-4">Take a clear photo of the affected plant part for AI-powered diagnosis</p>
          
          {uploadedImage ? (
            <div className="flex flex-col items-center gap-4">
              <img src={uploadedImage} alt="Uploaded plant" className="max-h-48 rounded-xl shadow-lg" />
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setAnalysisResult(null);
                    setAnalysisError(null);
                  }}
                  className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition"
                >
                  Change Photo
                </button>
                {isAnalyzing ? (
                  <span className="px-4 py-2 bg-[#C75B39] text-white rounded-xl flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : analysisResult ? (
                  <>
                    <button
                      onClick={handleViewDiagnosis}
                      className="px-4 py-2 bg-[#C75B39] text-white rounded-xl hover:bg-[#A8482D] transition"
                    >
                      View Diagnosis
                    </button>
                    <button
                      onClick={() => {
                        // Copy diagnosis to clipboard or share
                        alert(`Diagnosis: ${analysisResult.diseaseName}\nConfidence: ${analysisResult.confidence}%`);
                      }}
                      className="px-4 py-2 bg-[#6B8FA8] text-white rounded-xl hover:bg-[#5A7A8F] transition"
                    >
                      Share Result
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      const input = document.getElementById('file-input') as HTMLInputElement;
                      if (input) input.click();
                    }}
                    className="px-4 py-2 bg-[#C75B39] text-white rounded-xl hover:bg-[#A8482D] transition"
                  >
                    Analyze Photo
                  </button>
                )}
              </div>
              {analysisError && (
                <p className="text-red-300 text-sm">{analysisError}</p>
              )}
              {analysisResult && !analysisError && (
                <div className="bg-white/10 rounded-lg p-4 text-white text-sm max-w-md">
                  <p className="font-semibold">🔍 {analysisResult.diseaseName}</p>
                  <p className="opacity-80">Confidence: {analysisResult.confidence}%</p>
                  <p className="opacity-80">Crop: {analysisResult.crop}</p>
                </div>
              )}
            </div>
          ) : (
            <label className="inline-block px-6 py-3 bg-[#C75B39] text-white rounded-xl cursor-pointer hover:bg-[#A8482D] transition-colors text-sm font-medium">
              Choose Photo
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(92,61,46,0.6)] backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedDisease(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#F5EDE0] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white rounded-t-2xl px-6 py-4 border-b border-[rgba(212,165,116,0.2)] flex items-center justify-between z-10">
                <div>
                  <h2 className="font-['Playfair_Display'] font-bold text-xl text-[#5C3D2E]">{selectedDisease.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`${severityColors[selectedDisease.severity]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>{selectedDisease.severity}</span>
                    <span className="text-xs text-[#8B7355]">{selectedDisease.crop}</span>
                    {selectedDisease.season && (
                      <span className="text-xs text-[#8B7355] bg-[#E8E6DC] px-2 py-0.5 rounded-full">{selectedDisease.season}</span>
                    )}
                  </div>
                </div>
                <button onClick={() => setSelectedDisease(null)} className="p-2 hover:bg-[#F5EDE0] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#8B7355]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><Bug className="w-4 h-4 text-[#B5422A]" /> {t.symptoms}</h4>
                  <ul className="space-y-2">
                    {selectedDisease.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]"><AlertTriangle className="w-4 h-4 text-[#D4943A] shrink-0 mt-0.5" />{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><Leaf className="w-4 h-4 text-[#7A846B]" /> {t.causes}</h4>
                  <ul className="space-y-2">
                    {selectedDisease.causes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]"><ChevronRight className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div>
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-[#6B8FA8]" /> {t.prevention}</h4>
                  <ul className="space-y-2">
                    {selectedDisease.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]"><Check className="w-4 h-4 text-[#7A846B] shrink-0 mt-0.5" />{p}</li>
                    ))}
                  </ul>
                </div>

                {/* Treatments */}
                <div>
                  <div className="flex gap-2 mb-3">
                    <button onClick={() => setTreatmentTab('organic')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${treatmentTab === 'organic' ? 'bg-[#7A846B] text-white' : 'bg-white text-[#5C3D2E]'}`}>
                      {t.organicTreatment}
                    </button>
                    <button onClick={() => setTreatmentTab('chemical')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${treatmentTab === 'chemical' ? 'bg-[#6B8FA8] text-white' : 'bg-white text-[#5C3D2E]'}`}>
                      {t.chemicalTreatment}
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {(treatmentTab === 'organic' ? selectedDisease.organicTreatment : selectedDisease.chemicalTreatment).map((tr, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8B7355]"><Beaker className="w-4 h-4 text-[#C75B39] shrink-0 mt-0.5" />{tr}</li>
                    ))}
                  </ul>
                </div>

                {/* Fertilizer Advice */}
                <div className="bg-[#F5EDE0] rounded-xl p-4">
                  <h4 className="font-semibold text-[#5C3D2E] text-sm mb-2 flex items-center gap-2"><Droplets className="w-4 h-4 text-[#C75B39]" /> {t.fertilizerAdvice}</h4>
                  <p className="text-sm text-[#8B7355]">{selectedDisease.fertilizerAdvice}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
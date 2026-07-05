// src/pages/MarketDashboard.tsx

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineElement, PointElement, LinearScale, CategoryScale,
  Chart as ChartJS, BarElement, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  TrendingUp, TrendingDown, Minus, Search,
  Wheat, Leaf, Apple, Flower2, Cherry, Beaker, Loader2
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { fetchMarketPrices, getPriceChange, getTopCrops, sampleMarketPrices, type MarketPrice } from '../services/marketApi';
import { fertilizerPrices } from '../data/marketData';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Filler);

const commodityIcons: Record<string, React.ElementType> = {
  Rice: Leaf, Wheat: Wheat, Cotton: Flower2, Maize: Cherry,
  Groundnut: Apple, Soybean: Leaf, Chilli: Cherry, Turmeric: Flower2,
  Onion: Apple, Tomato: Cherry, Potato: Leaf, Bajra: Wheat,
  Sugarcane: Flower2, Mustard: Cherry, Chickpea: Leaf,
  'Red Gram': Leaf, 'Green Gram': Leaf, 'Black Gram': Leaf,
};

export default function MarketDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'crops' | 'fertilizers'>('crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('Rice');

  // Market data state
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(sampleMarketPrices);
  const [loading, setLoading] = useState(true);
  const [priceChanges, setPriceChanges] = useState<{ crop: string; price: number; change: number; trend: 'up' | 'down' | 'stable' }[]>([]);
  const [topCrops, setTopCrops] = useState<MarketPrice[]>([]);

  // Fetch market data on mount
  useEffect(() => {
    async function loadMarketData() {
      setLoading(true);
      try {
        const result = await fetchMarketPrices('Andhra Pradesh');
        if (result.success && result.data.length > 0) {
          setMarketPrices(result.data);
          setPriceChanges(getPriceChange(result.data));
          setTopCrops(getTopCrops(result.data, 5));
        } else {
          setMarketPrices(sampleMarketPrices);
          setPriceChanges(getPriceChange(sampleMarketPrices));
          setTopCrops(getTopCrops(sampleMarketPrices, 5));
        }
      } catch (error) {
        console.error('Error loading market data:', error);
        setMarketPrices(sampleMarketPrices);
        setPriceChanges(getPriceChange(sampleMarketPrices));
        setTopCrops(getTopCrops(sampleMarketPrices, 5));
      } finally {
        setLoading(false);
      }
    }
    loadMarketData();
  }, []);

  // Filter crops based on search
  const filteredCrops = marketPrices.filter(c =>
    !searchQuery ||
    c.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.market.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique crop names for the chart
  const uniqueCrops = useMemo(() => {
    return [...new Set(marketPrices.map(p => p.crop))];
  }, [marketPrices]);

  // Set selected commodity to first crop if current selection not available
  useEffect(() => {
    if (uniqueCrops.length > 0 && !uniqueCrops.includes(selectedCommodity)) {
      setSelectedCommodity(uniqueCrops[0]);
    }
  }, [uniqueCrops, selectedCommodity]);

  // Chart data
  const marketChartData = useMemo(() => {
    const cropData = marketPrices.filter(p => p.crop === selectedCommodity);
    const sortedData = cropData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const latestData = sortedData.slice(-30);

    return {
      labels: latestData.map((_, i) => `${i + 1}`),
      datasets: [{
        label: selectedCommodity,
        data: latestData.map(p => p.modalPrice || p.maxPrice),
        borderColor: '#C75B39',
        backgroundColor: 'rgba(199,91,57,0.1)',
        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      }],
    };
  }, [selectedCommodity, marketPrices]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#3D3632',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function (context: any) {
            return '₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8B7355', font: { size: 10 }, maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(212,165,116,0.1)' }, ticks: { color: '#8B7355', font: { size: 10 }, callback: (v: string | number) => '₹' + v } },
    },
    interaction: { intersect: false, mode: 'index' as const },
  };

  const fertChartData = {
    labels: fertilizerPrices.map(f => f.name),
    datasets: [{
      label: 'Current Price',
      data: fertilizerPrices.map(f => f.currentPrice),
      backgroundColor: ['#C75B39', '#D4A574', '#C8A97E', '#8B7355', '#6B8FA8', '#7A846B', '#D4943A', '#5C3D2E'],
      borderRadius: 8,
    }],
  };

  const fertChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8B7355', font: { size: 10 } } },
      y: { grid: { color: 'rgba(212,165,116,0.1)' }, ticks: { color: '#8B7355', font: { size: 10 } } },
    },
  };

  // Get trend for a crop
  const getCropTrend = (cropName: string) => {
    const found = priceChanges.find(p => p.crop === cropName);
    return found || { trend: 'stable', change: 0 };
  };

  // Get top 4 crops for summary cards
  const topFourCrops = topCrops.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] font-bold text-[#5C3D2E] text-3xl">{t.marketTitle}</h1>
            <p className="text-[#8B7355] text-sm mt-1">{t.lastUpdated}: {new Date().toLocaleString('en-IN')}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('crops')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'crops' ? 'bg-[#C75B39] text-white' : 'bg-white text-[#5C3D2E] hover:bg-[#E8E6DC]'}`}>
              {t.cropPrices}
            </button>
            <button onClick={() => setActiveTab('fertilizers')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'fertilizers' ? 'bg-[#C75B39] text-white' : 'bg-white text-[#5C3D2E] hover:bg-[#E8E6DC]'}`}>
              {t.fertilizerPrices}
            </button>
          </div>
        </motion.div>

        {activeTab === 'crops' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#C75B39] animate-spin" />
                <span className="ml-2 text-[#8B7355]">Loading market data...</span>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {topFourCrops.map((crop, i) => {
                    const Icon = commodityIcons[crop.crop] || Leaf;
                    const trend = getCropTrend(crop.crop);
                    return (
                      <motion.div
                        key={crop.crop + crop.variety}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setSelectedCommodity(crop.crop)}
                        className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedCommodity === crop.crop ? 'border-[#C75B39] ring-2 ring-[#C75B39]/10' : 'border-[rgba(212,165,116,0.15)]'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="w-5 h-5 text-[#C75B39]" />
                          {trend.trend === 'up' ? <TrendingUp className="w-4 h-4 text-[#7A846B]" /> :
                            trend.trend === 'down' ? <TrendingDown className="w-4 h-4 text-[#B5422A]" /> :
                              <Minus className="w-4 h-4 text-[#8B7355]" />}
                        </div>
                        <div className="font-['JetBrains_Mono'] font-bold text-[#5C3D2E] text-lg">₹{crop.modalPrice.toLocaleString()}</div>
                        <div className="text-xs text-[#8B7355]">{crop.crop} <span className="text-[10px]">({crop.variety})</span></div>
                        <div className={`text-xs font-medium mt-1 ${trend.trend === 'up' ? 'text-[#7A846B]' : trend.trend === 'down' ? 'text-[#B5422A]' : 'text-[#8B7355]'}`}>
                          {trend.trend === 'up' ? '+' : ''}{trend.change}%
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm mb-8">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <h3 className="font-semibold text-[#5C3D2E]">Price Trend — {selectedCommodity}</h3>
                    <div className="flex flex-wrap gap-1">
                      {uniqueCrops.slice(0, 8).map(crop => (
                        <button
                          key={crop}
                          onClick={() => setSelectedCommodity(crop)}
                          className={`px-2 py-1 text-xs rounded-lg transition ${selectedCommodity === crop
                              ? 'bg-[#C75B39] text-white'
                              : 'bg-[#F5EDE0] text-[#8B7355] hover:bg-[#E8E6DC]'
                            }`}
                        >
                          {crop}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-64">
                    <Line data={marketChartData} options={chartOptions} />
                  </div>
                </motion.div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]"
                    placeholder="Search commodity or market..." />
                </div>

                {/* Data Table */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl border border-[rgba(212,165,116,0.15)] shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[rgba(212,165,116,0.15)] bg-[#F5EDE0]">
                          <th className="text-left px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Commodity</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Variety</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Market</th>
                          <th className="text-right px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Price</th>
                          <th className="text-right px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Change</th>
                          <th className="text-center px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase tracking-wide">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCrops.slice(0, 50).map((crop, i) => {
                          const trend = getCropTrend(crop.crop);
                          return (
                            <motion.tr
                              key={crop.crop + crop.variety + i}
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.02 }}
                              className="border-b border-[rgba(212,165,116,0.08)] hover:bg-[#F5EDE0]/50 transition-colors"
                            >
                              <td className="px-5 py-3.5 font-medium text-[#5C3D2E] text-sm">{crop.crop}</td>
                              <td className="px-5 py-3.5 text-[#8B7355] text-sm">{crop.variety}</td>
                              <td className="px-5 py-3.5 text-[#8B7355] text-sm">{crop.market}</td>
                              <td className="px-5 py-3.5 text-right font-['JetBrains_Mono'] text-sm text-[#5C3D2E]">₹{crop.modalPrice.toLocaleString()}</td>
                              <td className={`px-5 py-3.5 text-right text-sm font-medium ${trend.trend === 'up' ? 'text-[#7A846B]' : trend.trend === 'down' ? 'text-[#B5422A]' : 'text-[#8B7355]'}`}>
                                {trend.trend === 'up' ? '+' : ''}{trend.change}%
                              </td>
                              <td className="px-5 py-3.5 text-center">
                                {trend.trend === 'up' ? <TrendingUp className="w-4 h-4 text-[#7A846B] mx-auto" /> :
                                  trend.trend === 'down' ? <TrendingDown className="w-4 h-4 text-[#B5422A] mx-auto" /> :
                                    <Minus className="w-4 h-4 text-[#8B7355] mx-auto" />}
                              </td>
                            </motion.tr>
                          );
                        })}
                        {filteredCrops.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-5 py-8 text-center text-[#8B7355]">
                              No crops found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 bg-[#F5EDE0] text-xs text-[#8B7355] flex justify-between">
                    <span>Showing {Math.min(filteredCrops.length, 50)} of {filteredCrops.length} entries</span>
                    <span>Source: {marketPrices.length > 0 && marketPrices[0]?.state || 'India'} Market Data</span>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'fertilizers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Fertilizer Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {fertilizerPrices.slice(0, 4).map((fert, i) => (
                <motion.div
                  key={fert.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 border border-[rgba(212,165,116,0.15)] shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Beaker className="w-5 h-5 text-[#C75B39]" />
                    <span className="text-sm font-medium text-[#5C3D2E]">{fert.name}</span>
                  </div>
                  <div className="font-['JetBrains_Mono'] font-bold text-[#5C3D2E] text-lg">₹{fert.currentPrice}</div>
                  <div className="text-xs text-[#8B7355]">{fert.unit}</div>
                  <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${fert.availability === 'Good' ? 'bg-[#7A846B]/10 text-[#7A846B]' :
                      fert.availability === 'Limited' ? 'bg-[#D4943A]/10 text-[#D4943A]' :
                        'bg-[#B5422A]/10 text-[#B5422A]'
                    }`}>
                    {fert.availability}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm mb-8">
              <h3 className="font-semibold text-[#5C3D2E] mb-4">Fertilizer Price Comparison (₹ per 50kg bag)</h3>
              <div className="h-64">
                <Bar data={fertChartData} options={fertChartOptions} />
              </div>
            </motion.div>

            {/* Fertilizer Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-[rgba(212,165,116,0.15)] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(212,165,116,0.15)] bg-[#F5EDE0]">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase">Name</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase">Current</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase">Previous</th>
                      <th className="text-center px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase">Trend</th>
                      <th className="text-center px-5 py-3 text-xs font-semibold text-[#5C3D2E] uppercase">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fertilizerPrices.map((fert, i) => (
                      <motion.tr
                        key={fert.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-[rgba(212,165,116,0.08)] hover:bg-[#F5EDE0]/50"
                      >
                        <td className="px-5 py-3.5 font-medium text-[#5C3D2E] text-sm">{fert.name}</td>
                        <td className="px-5 py-3.5 text-right font-['JetBrains_Mono'] text-sm text-[#5C3D2E]">₹{fert.currentPrice}</td>
                        <td className="px-5 py-3.5 text-right font-['JetBrains_Mono'] text-sm text-[#8B7355]">₹{fert.previousPrice}</td>
                        <td className="px-5 py-3.5 text-center">
                          {fert.trend === 'up' ? <TrendingUp className="w-4 h-4 text-[#B5422A] mx-auto" /> :
                            fert.trend === 'down' ? <TrendingDown className="w-4 h-4 text-[#7A846B] mx-auto" /> :
                              <Minus className="w-4 h-4 text-[#8B7355] mx-auto" />}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${fert.availability === 'Good' ? 'bg-[#7A846B]/10 text-[#7A846B]' :
                              fert.availability === 'Limited' ? 'bg-[#D4943A]/10 text-[#D4943A]' :
                                'bg-[#B5422A]/10 text-[#B5422A]'
                            }`}>
                            {fert.availability}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
// src/data/marketData.ts

import { sampleMarketPrices, fetchMarketPrices, getPriceChange, type MarketPrice } from '../services/marketApi';

// ===== FORMATTED DATA FOR UI COMPATIBILITY =====

export interface UICommodity {
  commodity: string;
  variety: string;
  market: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

// Convert MarketPrice to UI format
export function formatMarketData(data: MarketPrice): UICommodity {
  return {
    commodity: data.crop,
    variety: data.variety || 'Local',
    market: data.market,
    currentPrice: data.modalPrice || data.maxPrice,
    previousPrice: data.minPrice,
    unit: 'quintal',
    trend: 'stable', // will be calculated
    change: 0,
  };
}

// Get all crops with price change
export function getCropPriceChanges(data: MarketPrice[]) {
  return getPriceChange(data);
}

// ===== EXPORT FOR BACKWARD COMPATIBILITY =====

// For components that expect the old structure, we still provide the sample data
// but now it's derived from the same source as the API
export const cropPrices: UICommodity[] = sampleMarketPrices.map((item) => ({
  commodity: item.crop,
  variety: item.variety || 'Local',
  market: item.market,
  currentPrice: item.modalPrice || item.maxPrice,
  previousPrice: item.minPrice,
  unit: 'quintal',
  trend: 'stable',
  change: 0,
}));

export interface FertilizerPrice {
  name: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  availability: 'Good' | 'Limited' | 'Scarce';
}

export const fertilizerPrices: FertilizerPrice[] = [
  { name: 'Urea', currentPrice: 276, previousPrice: 276, unit: '50kg bag', trend: 'stable', availability: 'Good' },
  { name: 'DAP', currentPrice: 1350, previousPrice: 1350, unit: '50kg bag', trend: 'stable', availability: 'Good' },
  { name: 'NPK (20-20-20)', currentPrice: 1450, previousPrice: 1420, unit: '50kg bag', trend: 'up', availability: 'Good' },
  { name: 'MOP (Potash)', currentPrice: 1700, previousPrice: 1650, unit: '50kg bag', trend: 'up', availability: 'Limited' },
  { name: 'SSP', currentPrice: 550, previousPrice: 550, unit: '50kg bag', trend: 'stable', availability: 'Good' },
  { name: 'Organic Compost', currentPrice: 450, previousPrice: 420, unit: '50kg bag', trend: 'up', availability: 'Good' },
  { name: 'Vermicompost', currentPrice: 600, previousPrice: 580, unit: '50kg bag', trend: 'up', availability: 'Good' },
  { name: 'Neem Cake', currentPrice: 750, previousPrice: 750, unit: '50kg bag', trend: 'stable', availability: 'Limited' },
];

// Legacy getPriceHistory function for backward compatibility
export function getPriceHistory(commodity: string): number[] {
  const base = cropPrices.find(c => c.commodity === commodity)?.currentPrice || 2000;
  const history: number[] = [];
  for (let i = 29; i >= 0; i--) {
    const variation = (Math.sin(i * 0.5) * base * 0.05) + (Math.random() - 0.5) * base * 0.03;
    history.push(Math.round(base + variation));
  }
  return history;
}

// ===== NEW: Helper to fetch live data =====
export async function fetchLiveMarketData(state: string = 'Andhra Pradesh') {
  const result = await fetchMarketPrices(state);
  return result;
}
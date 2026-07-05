// src/data/cropDatabase.ts

export interface Crop {
  id: string;
  name: string;
  icon: string;
  family: string;
  nitrogenUse: 'High' | 'Medium' | 'Low';
  waterRequirement: 'High' | 'Medium' | 'Low';
  seasons: string[];
  duration: string;
  region: 'Tropical' | 'Subtropical' | 'Temperate' | 'All';
  soilType: string[];
}

export const crops: Crop[] = [
  // ===== CEREALS & GRAINS =====
  { 
    id: 'rice', 
    name: 'Rice', 
    icon: '🌾', 
    family: 'Poaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'High', 
    seasons: ['Kharif'], 
    duration: '120-150 days',
    region: 'Tropical',
    soilType: ['Clay', 'Clay loam', 'Alluvial']
  },
  { 
    id: 'wheat', 
    name: 'Wheat', 
    icon: '🌾', 
    family: 'Poaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '120-140 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Clay loam', 'Alluvial']
  },
  { 
    id: 'maize', 
    name: 'Maize', 
    icon: '🌽', 
    family: 'Poaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Rabi'], 
    duration: '90-110 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Alluvial']
  },
  { 
    id: 'bajra', 
    name: 'Bajra', 
    icon: '🌾', 
    family: 'Poaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '75-90 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'sorghum', 
    name: 'Sorghum', 
    icon: '🌾', 
    family: 'Poaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '100-120 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Black soil']
  },
  { 
    id: 'finger-millet', 
    name: 'Finger Millet', 
    icon: '🌾', 
    family: 'Poaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '100-120 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam']
  },

  // ===== OILSEEDS =====
  { 
    id: 'groundnut', 
    name: 'Groundnut', 
    icon: '🥜', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '105-120 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Red soil']
  },
  { 
    id: 'soybean', 
    name: 'Soybean', 
    icon: '🌱', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif'], 
    duration: '90-110 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Clay loam']
  },
  { 
    id: 'sesame', 
    name: 'Sesame', 
    icon: '🌱', 
    family: 'Pedaliaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '80-90 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'sunflower', 
    name: 'Sunflower', 
    icon: '🌻', 
    family: 'Asteraceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Rabi'], 
    duration: '90-100 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'mustard', 
    name: 'Mustard', 
    icon: '🌼', 
    family: 'Brassicaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Rabi'], 
    duration: '100-120 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam', 'Alluvial']
  },

  // ===== PULSES =====
  { 
    id: 'chickpea', 
    name: 'Chickpea', 
    icon: '🌱', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Rabi'], 
    duration: '100-120 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'pigeon-pea', 
    name: 'Pigeon Pea', 
    icon: '🌿', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '180-270 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Red soil']
  },
  { 
    id: 'green-gram', 
    name: 'Green Gram', 
    icon: '🌱', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif', 'Rabi'], 
    duration: '60-70 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'black-gram', 
    name: 'Black Gram', 
    icon: '🌱', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif', 'Rabi'], 
    duration: '70-90 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Black soil']
  },
  { 
    id: 'cowpea', 
    name: 'Cowpea', 
    icon: '🫘', 
    family: 'Leguminosae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: '70-90 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },

  // ===== VEGETABLES =====
  { 
    id: 'tomato', 
    name: 'Tomato', 
    icon: '🍅', 
    family: 'Solanaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Year-round'], 
    duration: '90-120 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Red soil']
  },
  { 
    id: 'chilli', 
    name: 'Chilli', 
    icon: '🌶️', 
    family: 'Solanaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Year-round'], 
    duration: '150-180 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'brinjal', 
    name: 'Brinjal', 
    icon: '🍆', 
    family: 'Solanaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Year-round'], 
    duration: '120-150 days',
    region: 'Tropical',
    soilType: ['Loam', 'Clay loam']
  },
  { 
    id: 'potato', 
    name: 'Potato', 
    icon: '🥔', 
    family: 'Solanaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '90-120 days',
    region: 'Subtropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'onion', 
    name: 'Onion', 
    icon: '🧅', 
    family: 'Amaryllidaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '120-150 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'garlic', 
    name: 'Garlic', 
    icon: '🧄', 
    family: 'Amaryllidaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '120-150 days',
    region: 'Subtropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'carrot', 
    name: 'Carrot', 
    icon: '🥕', 
    family: 'Apiaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '90-110 days',
    region: 'Subtropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'cauliflower', 
    name: 'Cauliflower', 
    icon: '🥦', 
    family: 'Brassicaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '90-120 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'cabbage', 
    name: 'Cabbage', 
    icon: '🥬', 
    family: 'Brassicaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '90-120 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'mustard-green', 
    name: 'Mustard Green', 
    icon: '🥬', 
    family: 'Brassicaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Rabi'], 
    duration: '40-60 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'okra', 
    name: 'Okra', 
    icon: '🌿', 
    family: 'Malvaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Summer'], 
    duration: '50-60 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'cucumber', 
    name: 'Cucumber', 
    icon: '🥒', 
    family: 'Cucurbitaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Year-round'], 
    duration: '60-90 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'bottle-gourd', 
    name: 'Bottle Gourd', 
    icon: '🍐', 
    family: 'Cucurbitaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Summer'], 
    duration: '55-60 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'bitter-gourd', 
    name: 'Bitter Gourd', 
    icon: '🥒', 
    family: 'Cucurbitaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Summer'], 
    duration: '55-65 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'pumpkin', 
    name: 'Pumpkin', 
    icon: '🎃', 
    family: 'Cucurbitaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif', 'Summer'], 
    duration: '80-120 days',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Clay loam']
  },

  // ===== SPICES & HERBS =====
  { 
    id: 'turmeric', 
    name: 'Turmeric', 
    icon: '🟡', 
    family: 'Zingiberaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif'], 
    duration: '8-9 months',
    region: 'Tropical',
    soilType: ['Loam', 'Clay loam', 'Red soil']
  },
  { 
    id: 'ginger', 
    name: 'Ginger', 
    icon: '🟡', 
    family: 'Zingiberaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif'], 
    duration: '8-9 months',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Red soil']
  },
  { 
    id: 'coriander', 
    name: 'Coriander', 
    icon: '🌿', 
    family: 'Apiaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '90-120 days',
    region: 'Subtropical',
    soilType: ['Loam', 'Sandy loam']
  },
  { 
    id: 'fenugreek', 
    name: 'Fenugreek', 
    icon: '🌿', 
    family: 'Fabaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Rabi'], 
    duration: '60-80 days',
    region: 'Subtropical',
    soilType: ['Sandy loam', 'Loam']
  },

  // ===== FRUITS =====
  { 
    id: 'watermelon', 
    name: 'Watermelon', 
    icon: '🍉', 
    family: 'Cucurbitaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Summer'], 
    duration: '90-100 days',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'strawberry', 
    name: 'Strawberry', 
    icon: '🍓', 
    family: 'Rosaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Rabi'], 
    duration: '60-90 days',
    region: 'Subtropical',
    soilType: ['Sandy loam', 'Loam']
  },
  { 
    id: 'lemon', 
    name: 'Lemon', 
    icon: '🍋', 
    family: 'Rutaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Low', 
    seasons: ['Year-round'], 
    duration: 'Year-round',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Red soil']
  },
  { 
    id: 'mango', 
    name: 'Mango', 
    icon: '🥭', 
    family: 'Anacardiaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Kharif'], 
    duration: 'Year-round',
    region: 'Tropical',
    soilType: ['Loam', 'Sandy loam', 'Red soil', 'Black soil']
  },
  { 
    id: 'papaya', 
    name: 'Papaya', 
    icon: '🍑', 
    family: 'Caricaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'Medium', 
    seasons: ['Year-round'], 
    duration: '8-10 months',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Red soil']
  },

  // ===== CASH CROPS & FIBER =====
  { 
    id: 'cotton', 
    name: 'Cotton', 
    icon: '🌿', 
    family: 'Malvaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'Medium', 
    seasons: ['Kharif'], 
    duration: '150-180 days',
    region: 'Tropical',
    soilType: ['Black soil', 'Loam', 'Sandy loam']
  },
  { 
    id: 'sugarcane', 
    name: 'Sugarcane', 
    icon: '🎋', 
    family: 'Poaceae', 
    nitrogenUse: 'High', 
    waterRequirement: 'High', 
    seasons: ['Year-round'], 
    duration: '10-12 months',
    region: 'Tropical',
    soilType: ['Loam', 'Clay loam', 'Alluvial']
  },
  { 
    id: 'jute', 
    name: 'Jute', 
    icon: '🌿', 
    family: 'Tiliaceae', 
    nitrogenUse: 'Medium', 
    waterRequirement: 'High', 
    seasons: ['Kharif'], 
    duration: '120-140 days',
    region: 'Tropical',
    soilType: ['Alluvial', 'Clay loam']
  },

  // ===== AGROFORESTRY & MEDICINAL =====
  { 
    id: 'neem', 
    name: 'Neem', 
    icon: '🌿', 
    family: 'Meliaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Year-round'], 
    duration: 'Year-round',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam', 'Red soil']
  },
  { 
    id: 'eucalyptus', 
    name: 'Eucalyptus', 
    icon: '🌿', 
    family: 'Myrtaceae', 
    nitrogenUse: 'Low', 
    waterRequirement: 'Low', 
    seasons: ['Year-round'], 
    duration: 'Year-round',
    region: 'Tropical',
    soilType: ['Sandy loam', 'Loam']
  },
];

// ===== CROP ROTATION PLAN GENERATOR =====

export function generateRotationPlan(selectedCrops: string[]): {
  sequence: Crop[];
  soilRecovery: number;
  pestReduction: number;
  yieldImprovement: number;
  waterRequirement: string;
  fertilizerSchedule: { crop: string; n: string; p: string; k: string; region: string }[];
  recommendedSoil: string[];
} {
  const selected = crops.filter(c => selectedCrops.includes(c.id));
  if (selected.length === 0) {
    return {
      sequence: [],
      soilRecovery: 0,
      pestReduction: 0,
      yieldImprovement: 0,
      waterRequirement: 'N/A',
      fertilizerSchedule: [],
      recommendedSoil: [],
    };
  }

  // Sort: legumes first (nitrogen fixing), then heavy feeders, then moderate
  const legumes = selected.filter(c => c.family === 'Leguminosae');
  const heavy = selected.filter(c => c.nitrogenUse === 'High' && c.family !== 'Leguminosae');
  const moderate = selected.filter(c => c.nitrogenUse === 'Medium');
  const light = selected.filter(c => c.nitrogenUse === 'Low' && c.family !== 'Leguminosae');

  const sequence = [...legumes, ...light, ...moderate, ...heavy];

  // Calculate metrics
  const hasLegumes = legumes.length > 0;
  const soilRecovery = Math.min(95, 40 + (hasLegumes ? 35 : 0) + (sequence.length * 5));
  const pestReduction = Math.min(90, 30 + (sequence.length * 8) + (hasLegumes ? 20 : 0));
  const yieldImprovement = Math.min(85, 20 + (sequence.length * 10) + (hasLegumes ? 25 : 0));

  const avgWater = sequence.reduce((acc, c) => {
    const val = c.waterRequirement === 'High' ? 3 : c.waterRequirement === 'Medium' ? 2 : 1;
    return acc + val;
  }, 0) / sequence.length;

  const waterRequirement = avgWater > 2.3 ? 'High' : avgWater > 1.6 ? 'Medium' : 'Low';

  // Get unique soil types
  const allSoilTypes = sequence.flatMap(c => c.soilType);
  const recommendedSoil = [...new Set(allSoilTypes)].slice(0, 3);

  const fertilizerSchedule = sequence.map(c => ({
    crop: c.name,
    n: c.nitrogenUse === 'High' ? '120-150' : c.nitrogenUse === 'Medium' ? '80-100' : '20-40',
    p: '40-60',
    k: c.waterRequirement === 'High' ? '60-80' : '40-60',
    region: c.region,
  }));

  return { 
    sequence, 
    soilRecovery, 
    pestReduction, 
    yieldImprovement, 
    waterRequirement, 
    fertilizerSchedule,
    recommendedSoil,
  };
}

// ===== HELPER FUNCTIONS =====

export function getCropsBySeason(season: string): Crop[] {
  return crops.filter(c => c.seasons.includes(season));
}

export function getCropsByRegion(region: string): Crop[] {
  return crops.filter(c => c.region === region || c.region === 'All');
}

export function getCropsByNitrogenUse(nitrogenUse: string): Crop[] {
  return crops.filter(c => c.nitrogenUse === nitrogenUse);
}

export function getCropsByFamily(family: string): Crop[] {
  return crops.filter(c => c.family === family);
}

export function getCropById(id: string): Crop | undefined {
  return crops.find(c => c.id === id);
}

export function getCropRecommendations(soilType: string, region: string, season: string): Crop[] {
  return crops.filter(c => 
    c.soilType.includes(soilType) && 
    (c.region === region || c.region === 'All') &&
    c.seasons.includes(season)
  );
}
// src/services/marketApi.ts

const DATA_GOV_API_KEY = import.meta.env.VITE_DATA_GOV_KEY || '';

// Replace this with the actual resource ID for your state's market data
// You can find this by searching on data.gov.in
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

export interface MarketPrice {
    crop: string;
    variety: string;
    market: string;
    state: string;
    district: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    arrival: number;
    date: string;
}

export interface MarketDataResponse {
    success: boolean;
    data: MarketPrice[];
    error?: string;
    source?: 'api' | 'sample';
}

// ===== SAMPLE DATA (Fallback when API fails) =====
export const sampleMarketPrices: MarketPrice[] = [
    {
        crop: 'Rice',
        variety: 'Sona Masuri',
        market: 'Hyderabad',
        state: 'Andhra Pradesh',
        district: 'Hyderabad',
        minPrice: 2400,
        maxPrice: 2500,
        modalPrice: 2450,
        arrival: 500,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Wheat',
        variety: 'HD-2967',
        market: 'Ludhiana',
        state: 'Punjab',
        district: 'Ludhiana',
        minPrice: 2400,
        maxPrice: 2450,
        modalPrice: 2425,
        arrival: 300,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Cotton',
        variety: 'MCU-5',
        market: 'Guntur',
        state: 'Andhra Pradesh',
        district: 'Guntur',
        minPrice: 7100,
        maxPrice: 7300,
        modalPrice: 7200,
        arrival: 400,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Maize',
        variety: 'Hybrid',
        market: 'Nizamabad',
        state: 'Telangana',
        district: 'Nizamabad',
        minPrice: 2200,
        maxPrice: 2300,
        modalPrice: 2250,
        arrival: 200,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Groundnut',
        variety: 'TG-37A',
        market: 'Rajkot',
        state: 'Gujarat',
        district: 'Rajkot',
        minPrice: 6800,
        maxPrice: 6900,
        modalPrice: 6850,
        arrival: 150,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Soybean',
        variety: 'JS-335',
        market: 'Indore',
        state: 'Madhya Pradesh',
        district: 'Indore',
        minPrice: 4600,
        maxPrice: 4700,
        modalPrice: 4650,
        arrival: 180,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Chilli',
        variety: 'Guntur Sannam',
        market: 'Guntur',
        state: 'Andhra Pradesh',
        district: 'Guntur',
        minPrice: 12000,
        maxPrice: 13000,
        modalPrice: 12500,
        arrival: 120,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Turmeric',
        variety: 'Salem',
        market: 'Nizamabad',
        state: 'Telangana',
        district: 'Nizamabad',
        minPrice: 8800,
        maxPrice: 9000,
        modalPrice: 8900,
        arrival: 100,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Onion',
        variety: 'Red',
        market: 'Nashik',
        state: 'Maharashtra',
        district: 'Nashik',
        minPrice: 1800,
        maxPrice: 1900,
        modalPrice: 1850,
        arrival: 250,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Tomato',
        variety: 'Hybrid',
        market: 'Bangalore',
        state: 'Karnataka',
        district: 'Bangalore',
        minPrice: 1150,
        maxPrice: 1250,
        modalPrice: 1200,
        arrival: 180,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Potato',
        variety: 'Kufri Jyoti',
        market: 'Agra',
        state: 'Uttar Pradesh',
        district: 'Agra',
        minPrice: 1400,
        maxPrice: 1500,
        modalPrice: 1450,
        arrival: 200,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Bajra',
        variety: 'Hybrid',
        market: 'Jaipur',
        state: 'Rajasthan',
        district: 'Jaipur',
        minPrice: 2300,
        maxPrice: 2400,
        modalPrice: 2350,
        arrival: 160,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Sugarcane',
        variety: 'Co-86032',
        market: 'Kolhapur',
        state: 'Maharashtra',
        district: 'Kolhapur',
        minPrice: 330,
        maxPrice: 350,
        modalPrice: 340,
        arrival: 800,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Mustard',
        variety: 'Yellow',
        market: 'Jaipur',
        state: 'Rajasthan',
        district: 'Jaipur',
        minPrice: 5100,
        maxPrice: 5300,
        modalPrice: 5200,
        arrival: 140,
        date: new Date().toISOString().split('T')[0],
    },
    {
        crop: 'Chickpea',
        variety: 'Desi',
        market: 'Indore',
        state: 'Madhya Pradesh',
        district: 'Indore',
        minPrice: 5400,
        maxPrice: 5500,
        modalPrice: 5450,
        arrival: 130,
        date: new Date().toISOString().split('T')[0],
    },
];

// ===== HELPER FUNCTIONS =====

export async function fetchMarketPrices(
    state: string = 'Andhra Pradesh',
    commodity?: string,
    market?: string
): Promise<MarketDataResponse> {
    // If no API key, return sample data immediately
    if (!DATA_GOV_API_KEY) {
        console.warn('⚠️ DATA_GOV_API_KEY not set. Using sample market data.');
        return {
            success: true,
            data: filterSampleData(state, commodity, market),
            source: 'sample',
        };
    }

    try {
        const filters: Record<string, string> = { state };
        if (commodity) filters.commodity = commodity;
        if (market) filters.market = market;

        const filterParam = Object.entries(filters)
            .map(([key, value]) => `${key}:${value}`)
            .join(',');

        const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${DATA_GOV_API_KEY}&format=json&filters=${filterParam}&limit=100`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.records && data.records.length > 0) {
            return {
                success: true,
                data: data.records.map((record: any) => ({
                    crop: record.commodity || record.crop || '',
                    variety: record.variety || '',
                    market: record.market || record.mandi || '',
                    state: record.state || '',
                    district: record.district || '',
                    minPrice: parseFloat(record.min_price || record.minPrice || 0),
                    maxPrice: parseFloat(record.max_price || record.maxPrice || 0),
                    modalPrice: parseFloat(record.modal_price || record.modalPrice || 0),
                    arrival: parseFloat(record.arrival || record.arrivals || 0),
                    date: record.date || record.arrival_date || new Date().toISOString().split('T')[0],
                })),
                source: 'api',
            };
        }

        console.warn('No data from API. Using sample data.');
        return {
            success: true,
            data: filterSampleData(state, commodity, market),
            source: 'sample',
        };
    } catch (error) {
        console.error('❌ Error fetching market prices:', error);
        return {
            success: false,
            data: filterSampleData(state, commodity, market),
            error: error instanceof Error ? error.message : 'Unknown error',
            source: 'sample',
        };
    }
}

export async function fetchCommodityPrices(
    commodity: string,
    state: string = 'Andhra Pradesh'
): Promise<MarketDataResponse> {
    return fetchMarketPrices(state, commodity);
}

export function getUniqueCrops(data: MarketPrice[]): string[] {
    return [...new Set(data.map((item) => item.crop))];
}

export function getUniqueMarkets(data: MarketPrice[]): string[] {
    return [...new Set(data.map((item) => item.market))];
}

function filterSampleData(
    state?: string,
    commodity?: string,
    market?: string
): MarketPrice[] {
    let filtered = [...sampleMarketPrices];

    if (state) {
        filtered = filtered.filter((item) => item.state === state);
    }
    if (commodity) {
        filtered = filtered.filter((item) =>
            item.crop.toLowerCase().includes(commodity.toLowerCase())
        );
    }
    if (market) {
        filtered = filtered.filter((item) =>
            item.market.toLowerCase().includes(market.toLowerCase())
        );
    }

    return filtered;
}

export function getPriceTrend(
    crop: string,
    data: MarketPrice[]
): { date: string; price: number }[] {
    const cropData = data.filter((item) => item.crop === crop);
    return cropData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30)
        .map((item) => ({
            date: item.date,
            price: item.modalPrice || item.maxPrice,
        }));
}

export function getTopCrops(data: MarketPrice[], limit: number = 5): MarketPrice[] {
    return [...data].sort((a, b) => b.modalPrice - a.modalPrice).slice(0, limit);
}

export function getPriceChange(data: MarketPrice[]): {
    crop: string;
    price: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
}[] {
    const cropMap = new Map<string, MarketPrice[]>();

    data.forEach((item) => {
        if (!cropMap.has(item.crop)) {
            cropMap.set(item.crop, []);
        }
        cropMap.get(item.crop)!.push(item);
    });

    const result: {
        crop: string;
        price: number;
        change: number;
        trend: 'up' | 'down' | 'stable';
    }[] = [];

    cropMap.forEach((prices, crop) => {
        const sorted = prices.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        if (sorted.length >= 2) {
            const latest = sorted[sorted.length - 1];
            const previous = sorted[sorted.length - 2];
            const change = ((latest.modalPrice - previous.modalPrice) / previous.modalPrice) * 100;

            result.push({
                crop,
                price: latest.modalPrice,
                change: Math.round(change),
                trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable',
            });
        }
    });

    return result;
}
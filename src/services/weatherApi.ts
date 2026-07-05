// src/services/weatherApi.ts

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
    city: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    description: string;
    icon: string;
    main: string;
    rain?: number;
    date: string;
}

export interface ForecastDay {
    date: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    description: string;
    icon: string;
    rainChance?: number;
    windSpeed: number;
}

export interface WeatherResponse {
    success: boolean;
    data?: WeatherData | ForecastDay[];
    error?: string;
    source?: 'api' | 'sample';
}

// ===== SAMPLE WEATHER DATA (Fallback) =====
export const sampleWeather: WeatherData = {
    city: 'Vijayawada',
    temperature: 32,
    feelsLike: 34,
    humidity: 65,
    pressure: 1012,
    windSpeed: 12,
    description: 'Partly cloudy',
    icon: '02d',
    main: 'Clouds',
    date: new Date().toISOString().split('T')[0],
};

export const sampleForecast: ForecastDay[] = [
    { date: new Date().toISOString().split('T')[0], tempMin: 28, tempMax: 34, humidity: 62, description: 'Partly cloudy', icon: '02d', windSpeed: 10 },
    { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], tempMin: 27, tempMax: 33, humidity: 68, description: 'Light rain', icon: '10d', rainChance: 40, windSpeed: 8 },
    { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], tempMin: 26, tempMax: 32, humidity: 72, description: 'Moderate rain', icon: '09d', rainChance: 60, windSpeed: 6 },
    { date: new Date(Date.now() + 259200000).toISOString().split('T')[0], tempMin: 27, tempMax: 33, humidity: 65, description: 'Sunny', icon: '01d', windSpeed: 9 },
    { date: new Date(Date.now() + 345600000).toISOString().split('T')[0], tempMin: 28, tempMax: 35, humidity: 58, description: 'Clear sky', icon: '01d', windSpeed: 11 },
];

// ===== MAIN FUNCTIONS =====

export async function getCurrentWeather(city: string = 'Vijayawada'): Promise<WeatherResponse> {
    // If no API key, return sample data
    if (!WEATHER_API_KEY) {
        console.warn('⚠️ WEATHER_API_KEY not set. Using sample weather data.');
        return {
            success: true,
            data: sampleWeather,
            source: 'sample',
        };
    }

    try {
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return {
            success: true,
            data: {
                city: data.name,
                temperature: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: Math.round(data.wind.speed),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                main: data.weather[0].main,
                rain: data.rain?.['1h'] || 0,
                date: new Date().toISOString().split('T')[0],
            },
            source: 'api',
        };
    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        return {
            success: false,
            data: sampleWeather,
            error: error instanceof Error ? error.message : 'Unknown error',
            source: 'sample',
        };
    }
}

export async function getWeatherForecast(city: string = 'Vijayawada'): Promise<WeatherResponse> {
    // If no API key, return sample data
    if (!WEATHER_API_KEY) {
        console.warn('⚠️ WEATHER_API_KEY not set. Using sample forecast data.');
        return {
            success: true,
            data: sampleForecast,
            source: 'sample',
        };
    }

    try {
        const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Group forecast by day
        const dailyData: Record<string, any> = {};

        data.list.forEach((item: any) => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyData[date]) {
                dailyData[date] = {
                    temps: [],
                    humidities: [],
                    descriptions: [],
                    icons: [],
                    windSpeeds: [],
                    rainChance: 0,
                };
            }
            dailyData[date].temps.push(item.main.temp);
            dailyData[date].humidities.push(item.main.humidity);
            dailyData[date].descriptions.push(item.weather[0].description);
            dailyData[date].icons.push(item.weather[0].icon);
            dailyData[date].windSpeeds.push(item.wind.speed);
            if (item.rain && item.rain['3h']) {
                dailyData[date].rainChance = Math.min(100, (item.rain['3h'] / 10) * 100);
            }
        });

        const forecast: ForecastDay[] = Object.entries(dailyData).slice(0, 5).map(([date, dayData]) => ({
            date,
            tempMin: Math.round(Math.min(...dayData.temps)),
            tempMax: Math.round(Math.max(...dayData.temps)),
            humidity: Math.round(dayData.humidities.reduce((a: number, b: number) => a + b, 0) / dayData.humidities.length),
            description: dayData.descriptions[0],
            icon: dayData.icons[0],
            rainChance: dayData.rainChance || 0,
            windSpeed: Math.round(dayData.windSpeeds.reduce((a: number, b: number) => a + b, 0) / dayData.windSpeeds.length),
        }));

        return {
            success: true,
            data: forecast,
            source: 'api',
        };
    } catch (error) {
        console.error('❌ Error fetching forecast:', error);
        return {
            success: false,
            data: sampleForecast,
            error: error instanceof Error ? error.message : 'Unknown error',
            source: 'sample',
        };
    }
}

// ===== FARMING ADVISORY =====

export function getFarmingAdvisory(weather: WeatherData): string {
    const advisories: string[] = [];

    if (weather.temperature > 35) {
        advisories.push('🌡️ High temperature! Provide shade for sensitive crops and irrigate early morning or late evening.');
    }

    if (weather.temperature < 10) {
        advisories.push('❄️ Cold weather alert! Protect young seedlings with row covers or move potted plants indoors.');
    }

    if (weather.rain && weather.rain > 5) {
        advisories.push('🌧️ Heavy rain expected! Ensure good drainage and delay spraying or harvesting.');
    }

    if (weather.humidity > 80) {
        advisories.push('💦 High humidity! Risk of fungal diseases. Avoid overhead watering and improve air circulation.');
    }

    if (weather.humidity < 30) {
        advisories.push('🌵 Low humidity! Plants may need extra water. Consider drip irrigation.');
    }

    if (weather.windSpeed > 20) {
        advisories.push('💨 Strong winds! Secure tall plants and delay spraying operations.');
    }

    if (advisories.length === 0) {
        advisories.push('🌤️ Weather conditions are good for farming. Regular irrigation and monitoring is recommended.');
    }

    return advisories.join(' ');
}

// ===== HELPER FUNCTIONS =====

export function getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getTemperatureColor(temp: number): string {
    if (temp > 35) return 'text-red-600';
    if (temp > 30) return 'text-orange-500';
    if (temp > 20) return 'text-yellow-600';
    if (temp > 10) return 'text-blue-500';
    return 'text-blue-700';
}
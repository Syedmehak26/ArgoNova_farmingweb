// src/components/WeatherWidget.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, Sun, CloudRain, Wind, Droplets, Thermometer,
    CloudSnow, CloudLightning, CloudDrizzle, Search
} from 'lucide-react';
// removed useI18n – not needed
import {
    getCurrentWeather,
    getWeatherForecast,
    getFarmingAdvisory,
    getTemperatureColor,
    type WeatherData,
    type ForecastDay,
} from '../services/weatherApi';

export default function WeatherWidget() {
    // removed { t, language } – they were unused
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('Vijayawada');
    const [searchInput, setSearchInput] = useState('Vijayawada');
    const [advisory, setAdvisory] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWeather();
    }, []);

    async function loadWeather() {
        setLoading(true);
        setError(null);

        try {
            const [weatherResult, forecastResult] = await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city),
            ]);

            if (weatherResult.success && weatherResult.data) {
                const weatherData = weatherResult.data as WeatherData;
                setWeather(weatherData);
                const advisoryText = getFarmingAdvisory(weatherData);
                setAdvisory(advisoryText);
            } else {
                setError(weatherResult.error || 'Failed to load weather');
                if (weatherResult.data) {
                    setWeather(weatherResult.data as WeatherData);
                }
            }

            if (forecastResult.success && forecastResult.data) {
                setForecast(forecastResult.data as ForecastDay[]);
            } else {
                if (!weatherResult.success) {
                    setError(forecastResult.error || 'Failed to load forecast');
                }
                if (forecastResult.data) {
                    setForecast(forecastResult.data as ForecastDay[]);
                }
            }
        } catch (err) {
            console.error('Weather load error:', err);
            setError('Failed to load weather data');
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setCity(searchInput.trim());
            loadWeather();
        }
    };

    const getWeatherIcon = (iconCode: string) => {
        const iconMap: Record<string, React.ElementType> = {
            '01d': Sun,
            '01n': Sun,
            '02d': Cloud,
            '02n': Cloud,
            '03d': Cloud,
            '03n': Cloud,
            '04d': Cloud,
            '04n': Cloud,
            '09d': CloudRain,
            '09n': CloudRain,
            '10d': CloudRain,
            '10n': CloudRain,
            '11d': CloudLightning,
            '11n': CloudLightning,
            '13d': CloudSnow,
            '13n': CloudSnow,
            '50d': CloudDrizzle,
            '50n': CloudDrizzle,
        };
        return iconMap[iconCode] || Cloud;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#C75B39] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-[#8B7355]">Loading weather...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-[rgba(212,165,116,0.15)] shadow-sm">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter city name..."
                    className="flex-1 px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39]"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#C75B39] text-white rounded-xl hover:bg-[#A8482D] transition"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>

            {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800 mb-4">
                    ⚠️ {error}
                </div>
            )}

            {/* Current Weather */}
            {weather && (
                <div className="bg-gradient-to-br from-[#6B8FA8] to-[#8FAFC0] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 opacity-20">
                        {(() => {
                            const Icon = getWeatherIcon(weather.icon);
                            return <Icon className="w-24 h-24" />;
                        })()}
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">{weather.city}</h3>
                                <p className="text-white/70 text-sm capitalize">{weather.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold">{weather.temperature}°C</div>
                                <p className="text-white/70 text-sm">Feels like {weather.feelsLike}°C</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                                <Droplets className="w-4 h-4 mx-auto mb-1 text-white/70" />
                                <span className="text-xs text-white/70">Humidity</span>
                                <div className="font-semibold">{weather.humidity}%</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                                <Wind className="w-4 h-4 mx-auto mb-1 text-white/70" />
                                <span className="text-xs text-white/70">Wind</span>
                                <div className="font-semibold">{weather.windSpeed} km/h</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                                <Thermometer className="w-4 h-4 mx-auto mb-1 text-white/70" />
                                <span className="text-xs text-white/70">Pressure</span>
                                <div className="font-semibold">{weather.pressure} hPa</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Farming Advisory */}
            {advisory && (
                <div className="bg-[#F5EDE0] rounded-xl p-4 mb-6 border border-[rgba(212,165,116,0.2)]">
                    <h4 className="font-semibold text-[#5C3D2E] text-sm mb-2">🌾 Farming Advisory</h4>
                    <p className="text-sm text-[#8B7355]">{advisory}</p>
                </div>
            )}

            {/* 5-Day Forecast */}
            {forecast.length > 0 && (
                <div>
                    <h4 className="font-semibold text-[#5C3D2E] text-sm mb-4">📅 5-Day Forecast</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {forecast.map((day, index) => {
                            const Icon = getWeatherIcon(day.icon);
                            const maxTempColor = getTemperatureColor(day.tempMax);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#F5EDE0] rounded-xl p-2 text-center"
                                >
                                    <p className="text-xs text-[#8B7355] font-medium">
                                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                                    </p>
                                    <Icon className="w-8 h-8 mx-auto text-[#C75B39]" />
                                    <p className={`text-sm font-semibold ${maxTempColor}`}>{day.tempMax}°</p>
                                    <p className="text-xs text-[#8B7355]">{day.tempMin}°</p>
                                    {day.rainChance && day.rainChance > 0 && (
                                        <p className="text-xs text-blue-600">🌧️ {day.rainChance}%</p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            <p className="text-xs text-[#8B7355] mt-4 text-center">
                {weather?.city ? `Weather data for ${weather.city}` : 'Weather data'} | Powered by OpenWeatherMap
            </p>
        </div>
    );
}
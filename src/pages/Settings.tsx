// src/pages/Settings.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Save, X } from 'lucide-react';

const cropOptions = ['Rice', 'Wheat', 'Maize', 'Tomato', 'Chilli', 'Brinjal', 'Onion', 'Potato', 'Cotton', 'Sugarcane', 'Groundnut', 'Soybean', 'Turmeric', 'Other'];
const methodOptions = ['organic', 'chemical', 'mixed'];
const roleOptions = ['farmer', 'home_grower', 'terrace_gardener'];
const stateOptions = ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha', 'Madhya Pradesh'];

export default function Settings() {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        state: user?.state || '',
        district: user?.district || '',
        town: user?.town || '',
        crops: user?.crops || [],
        growingMethod: user?.growingMethod || '',
        role: user?.role || '',
        language: user?.language || 'en',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCropToggle = (crop: string) => {
        setFormData(prev => ({
            ...prev,
            crops: prev.crops.includes(crop) ? prev.crops.filter(c => c !== crop) : [...prev.crops, crop],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        try {
            // Validate that all required fields are present
            const updatedData: any = {
                fullName: formData.fullName,
                phone: formData.phone,
                state: formData.state,
                district: formData.district,
                town: formData.town,
                crops: formData.crops,
                growingMethod: formData.growingMethod as 'organic' | 'chemical' | 'mixed',
                role: formData.role as 'farmer' | 'home_grower' | 'terrace_gardener',
                language: formData.language as 'en' | 'hi' | 'te',
            };
            await updateUser(updatedData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F5EDE0] pt-[96px] pb-12 px-4 lg:px-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-[rgba(212,165,116,0.15)]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-[#5C3D2E]">⚙️ Settings</h1>
                        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-[#F5EDE0] transition">
                            <X className="w-5 h-5 text-[#8B7355]" />
                        </button>
                    </div>

                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 mb-4">
                            ✅ Profile updated successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">State</label>
                            <select
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                            >
                                {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">District</label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Town/City</label>
                                <input
                                    type="text"
                                    value={formData.town}
                                    onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5C3D2E] mb-2">What do you grow?</label>
                            <div className="flex flex-wrap gap-2">
                                {cropOptions.map(crop => (
                                    <button
                                        key={crop}
                                        type="button"
                                        onClick={() => handleCropToggle(crop)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${formData.crops.includes(crop) ? 'bg-[#C75B39] text-white' : 'bg-[#E8E6DC] text-[#5C3D2E] hover:bg-[#D4A574]'
                                            }`}
                                    >
                                        {crop}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Growing Method</label>
                                <select
                                    value={formData.growingMethod}
                                    onChange={(e) => setFormData({ ...formData, growingMethod: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                >
                                    <option value="">Select</option>
                                    {methodOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                >
                                    <option value="">Select</option>
                                    {roleOptions.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Language</label>
                                <select
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl focus:outline-none focus:border-[#C75B39]"
                                >
                                    <option value="en">English</option>
                                    <option value="hi">हिन्दी</option>
                                    <option value="te">తెలుగు</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C75B39] text-white py-3 rounded-xl font-medium hover:bg-[#A8482D] transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Changes
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
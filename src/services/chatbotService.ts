// src/services/chatbotService.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("⚠️ VITE_GEMINI_API_KEY is missing. Chat service will not work.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// ===== VOICE/Speech Functions =====

/**
 * Speak text using Web Speech API with a smooth, warm, friendly female voice.
 * Optimized for calm, reassuring agricultural advice.
 */
export function speakText(
    text: string,
    language: 'en' | 'hi' | 'te' = 'en',
    onEnd?: () => void
): void {
    if (!('speechSynthesis' in window)) {
        console.warn('⚠️ Speech synthesis not supported.');
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-US', hi: 'hi-IN', te: 'te-IN' };
    utterance.lang = langMap[language] || 'en-US';

    // 🌸 Smooth, warm, friendly tone settings
    utterance.rate = 0.88;      // Slower and more relaxed for a calming feel
    utterance.pitch = 1.05;     // Slightly warm, natural pitch (not too high)
    utterance.volume = 0.92;    // Slightly softer, gentle volume

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // 🎯 Prioritize smooth, friendly female voices
    const preferredVoice =
        // Language-specific female voices (best quality first)
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Samantha')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Victoria')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Karen')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Moira')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Tessa')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Veena')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Lekha')) ||
        // Google voices (excellent quality)
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Google US English')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Google UK English Female')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Google हिन्दी')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Google తెలుగు')) ||
        // Microsoft voices
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Microsoft Zira')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Microsoft Heera')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Microsoft Kalpana')) ||
        voices.find((v) => v.lang === langMap[language] && v.name.includes('Microsoft Chitra')) ||
        // Generic female fallback
        voices.find((v) => v.lang === langMap[language] && /female|woman|girl/i.test(v.name)) ||
        // Language match fallback
        voices.find((v) => v.lang === langMap[language]) ||
        // Partial language match
        voices.find((v) => v.lang.startsWith(langMap[language].split('-')[0])) ||
        // Ultimate fallback
        voices[0];

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    // 🎵 Add gentle pauses for natural breathing
    utterance.onstart = () => {
        console.log('🔊 Speaking with voice:', preferredVoice?.name || 'default');
    };

    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
}

export function cancelSpeech(): void {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function isSpeechSupported(): boolean {
    return 'speechSynthesis' in window;
}

// ===== SPEECH-TO-TEXT (Voice Input) =====

let recognition: any = null;
let errorCount = 0;

/**
 * Start voice recognition (speech-to-text) with improved error handling
 */
export function startVoiceInput(
    language: 'en' | 'hi' | 'te' = 'en',
    onResult: (text: string) => void,
    onError?: (error: string) => void
): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        if (onError) onError('Voice input is not supported in this browser. Please use typing.');
        return;
    }

    // Stop any existing recognition
    stopVoiceInput();

    // Check for internet connectivity
    if (!navigator.onLine) {
        if (onError) onError('No internet connection. Please check your network and try again.');
        return;
    }

    // Reset error count
    errorCount = 0;

    recognition = new SpeechRecognition();
    const langMap = { en: 'en-US', hi: 'hi-IN', te: 'te-IN' };
    recognition.lang = langMap[language] || 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.timeout = 5000; // 5 seconds timeout

    let finalText = '';

    recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalText = event.results[i][0].transcript;
            } else {
                interim = event.results[i][0].transcript;
            }
        }
        if (interim) onResult(interim);
        if (finalText) {
            onResult(finalText);
            // Stop after final result
            stopVoiceInput();
        }
    };

    recognition.onerror = (event: any) => {
        // Prevent multiple error calls for the same session
        if (errorCount > 1) return;
        errorCount++;

        console.warn('Speech recognition error:', event.error);
        stopVoiceInput();

        let errorMsg = '';
        switch (event.error) {
            case 'not-allowed':
                errorMsg = 'Microphone access denied. Please allow microphone access and try again.';
                break;
            case 'no-speech':
                errorMsg = 'No speech detected. Please speak clearly and try again.';
                break;
            case 'audio-capture':
                errorMsg = 'No microphone found. Please connect a microphone.';
                break;
            case 'network':
                errorMsg = 'Network error. Please check your internet connection.';
                break;
            case 'aborted':
                // User cancelled, ignore
                return;
            default:
                errorMsg = `Voice input failed. Please try again.`;
        }
        if (onError) onError(errorMsg);
        recognition = null;
    };

    recognition.onend = () => {
        recognition = null;
    };

    try {
        recognition.start();
    } catch (err) {
        console.error('Failed to start speech recognition:', err);
        if (onError) onError('Failed to start voice input. Please try again.');
        recognition = null;
    }
}

export function stopVoiceInput(): void {
    if (recognition) {
        try {
            recognition.stop();
        } catch (e) {
            // ignore
        }
        recognition = null;
    }
}

// ===== CHAT FUNCTIONS =====

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

const fallbackResponses: Record<'en' | 'hi' | 'te', string[]> = {
    en: [
        "Hello there! 👋 I'm your farming assistant. How can I help you today? 🌱",
        "Hi! 😊 Great to see you! I'm here to help with all your farming questions. What can I do for you? 🌾",
        "Hey! 🌿 Welcome to ArgoNova! Ask me anything about farming, crops, or weather! 🚜"
    ],
    hi: [
        "नमस्ते! 👋 मैं आपका कृषि सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? 🌱",
        "हाय! 😊 ArgoNova में आपका स्वागत है! मैं आपकी कृषि संबंधी सवालों में मदद के लिए यहाँ हूँ। 🌾",
        "नमस्ते! 🌿 आपको देखकर अच्छा लगा! मैं आपका कृषि विशेषज्ञ हूँ – पौधों, मिट्टी या मौसम के बारे में कुछ भी पूछें! 🚜"
    ],
    te: [
        "నమస్కారం! 👋 నేను మీ వ్యవసాయ సహాయకుడిని. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను? 🌱",
        "హాయ్! 😊 ArgoNova కి స్వాగతం! మీ అన్ని వ్యవసాయ ప్రశ్నలకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను। 🌾",
        "నమస్తే! 🌿 మిమ్మల్ని చూడటం ఆనందంగా ఉంది! నేను మ్యవసాయ నిపుణుడిని – మొక్కలు, నేల లేదా వాతావరణం గురించి ఏదైనా అడగండి! 🚜"
    ]
};

function getFallbackResponse(language: 'en' | 'hi' | 'te' = 'en'): string {
    const responses = fallbackResponses[language] || fallbackResponses.en;
    return responses[Math.floor(Math.random() * responses.length)];
}

export async function askArgonovaAI(message: string, language: string = 'en') {
    const lang = (language === 'hi' || language === 'te') ? language : 'en';
    const langLabel = lang === 'hi' ? 'Hindi' : lang === 'te' ? 'Telugu' : 'English';

    if (!API_KEY || !genAI) {
        console.warn('⚠️ Gemini API key missing. Using fallback responses.');
        return getFallbackResponse(lang);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
You are ARGONOVA AI 🌿 – a friendly, warm, and helpful agriculture expert.

**Your Personality:**
- Warm, friendly, approachable – like a helpful neighbor who loves farming 🌾
- Use emojis naturally 😊
- Conversational, human-like tone
- Ask follow-up questions
- Celebrate successes 🎉

**Your Role:**
- Expert advice on: crop diseases, fertilizers, soil health, irrigation, weather, crop rotation, home gardening, pest control, harvesting, storage

**Conversation Style:**
- Greet warmly and personally
- Use the user's name if provided
- Use emojis naturally (🌱🌾🌿🍅🌶️🧅🥔🌻🐛🩺🧪🌤️💧🚜)
- Ask follow-up questions
- Be encouraging and positive
- Show empathy

**Important:**
- Answer in ${langLabel} language only
- Keep informative but conversational
- Use simple language
- If you don't know, be honest

User's message: ${message}
`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("❌ Gemini Error:", error);
        return getFallbackResponse(lang);
    }
}
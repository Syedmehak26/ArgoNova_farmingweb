// src/components/ArgonovaChatbot.tsx

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Send, Mic, MicOff, Volume2, VolumeX,
    Loader2, Bot, X
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import {
    askArgonovaAI,
    speakText,
    cancelSpeech,
    startVoiceInput,
    stopVoiceInput,
    isSpeechSupported,
    type ChatMessage
} from '../services/chatbotService';

interface ArgonovaChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ArgonovaChatbot({  onClose }: ArgonovaChatbotProps) {
    const { language } = useI18n();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceSupported, setVoiceSupported] = useState(false);
    const [interimText, setInterimText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setVoiceSupported(isSpeechSupported());

        if (isSpeechSupported()) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }

        if (messages.length === 0) {
            const welcomeMsg = language === 'hi'
                ? 'नमस्ते! 👋 मैं ARGONOVA AI हूँ, आपका कृषि सहायक। मैं आपकी कैसे मदद कर सकता हूँ? 🌱'
                : language === 'te'
                    ? 'నమస్కారం! 👋 నేను ARGONOVA AI ని, మీ వ్యవసాయ సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను? 🌱'
                    : 'Hello there! 👋 I\'m ARGONOVA AI, your farming assistant. How can I help you today? 🌱';
            setMessages([{ role: 'assistant' as const, content: welcomeMsg, timestamp: Date.now() }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.role === 'assistant' && isSpeaking) {
            const langMap: Record<string, 'en' | 'hi' | 'te'> = { en: 'en', hi: 'hi', te: 'te' };
            speakText(lastMsg.content, langMap[language] || 'en', () => setIsSpeaking(false));
        }
    }, [messages, language, isSpeaking]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setInterimText('');

        const userMsg: ChatMessage = { role: 'user', content: userMessage, timestamp: Date.now() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const langMap: Record<string, string> = { en: 'en', hi: 'hi', te: 'te' };
            const response = await askArgonovaAI(userMessage, langMap[language] || 'en');
            const assistantMsg: ChatMessage = { role: 'assistant', content: response, timestamp: Date.now() };
            setMessages([...newMessages, assistantMsg]);

            if (isSpeaking) {
                const langMapVoice: Record<string, 'en' | 'hi' | 'te'> = { en: 'en', hi: 'hi', te: 'te' };
                speakText(response, langMapVoice[language] || 'en', () => setIsSpeaking(false));
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = language === 'hi'
                ? 'क्षमा करें, कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें। 😅'
                : language === 'te'
                    ? 'క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి. 😅'
                    : 'Sorry, something went wrong. Please try again. 😅';
            setMessages([...newMessages, { role: 'assistant' as const, content: errorMsg, timestamp: Date.now() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceInput = () => {
        if (isListening) {
            stopVoiceInput();
            setIsListening(false);
            setInterimText('');
            return;
        }

        if (!voiceSupported) {
            alert('Voice input is not supported in your browser. Please use typing.');
            return;
        }

        setIsListening(true);
        const langMap: Record<string, 'en' | 'hi' | 'te'> = { en: 'en', hi: 'hi', te: 'te' };

        startVoiceInput(
            langMap[language] || 'en',
            (text) => {
                setInterimText(text);
                setInput(text);
            },
            (error) => {
                console.error('Voice error:', error);
                setIsListening(false);
                setInterimText('');
                alert(error);
            }
        );
    };

    const toggleVoice = () => {
        if (isSpeaking) {
            cancelSpeech();
            setIsSpeaking(false);
        } else {
            setIsSpeaking(true);
            const lastMsg = [...messages].reverse().find(m => m.role === 'assistant');
            if (lastMsg) {
                const langMap: Record<string, 'en' | 'hi' | 'te'> = { en: 'en', hi: 'hi', te: 'te' };
                speakText(lastMsg.content, langMap[language] || 'en', () => setIsSpeaking(false));
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-xl border border-[rgba(212,165,116,0.2)] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#5C3D2E] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span className="font-semibold text-sm">ARGONOVA AI</span>
                    <span className="text-xs opacity-70 bg-white/20 px-2 py-0.5 rounded-full">🌿</span>
                </div>
                <div className="flex items-center gap-1">
                    {voiceSupported && (
                        <button
                            onClick={toggleVoice}
                            className={`p-1.5 rounded-lg transition-colors ${isSpeaking ? 'bg-white/20 text-[#C75B39]' : 'hover:bg-white/10'}`}
                            title={isSpeaking ? 'Mute voice' : 'Enable voice'}
                        >
                            {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5EDE0]">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user'
                                    ? 'bg-[#C75B39] text-white rounded-br-none'
                                    : 'bg-white border border-[rgba(212,165,116,0.15)] text-[#5C3D2E] rounded-bl-none'
                                }`}
                        >
                            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                            <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-[#8B7355]'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[rgba(212,165,116,0.15)] p-3 rounded-xl rounded-bl-none">
                            <Loader2 className="w-5 h-5 text-[#C75B39] animate-spin" />
                        </div>
                    </div>
                )}
                {isListening && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[rgba(212,165,116,0.15)] p-3 rounded-xl rounded-bl-none">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    <span className="w-1 h-4 bg-[#C75B39] animate-pulse rounded"></span>
                                    <span className="w-1 h-6 bg-[#C75B39] animate-pulse delay-75 rounded"></span>
                                    <span className="w-1 h-3 bg-[#C75B39] animate-pulse delay-150 rounded"></span>
                                    <span className="w-1 h-5 bg-[#C75B39] animate-pulse delay-300 rounded"></span>
                                </div>
                                <span className="text-sm text-[#8B7355]">Listening...</span>
                            </div>
                            {interimText && (
                                <div className="text-xs text-[#8B7355] mt-1 italic">"{interimText}"</div>
                            )}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[rgba(212,165,116,0.15)] bg-white">
                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={language === 'hi' ? 'अपना सवाल टाइप करें...' : language === 'te' ? 'మీ ప్రశ్నను టైప్ చేయండి...' : 'Type your question...'}
                        className="flex-1 px-3 py-2 border border-[rgba(212,165,116,0.2)] rounded-xl text-sm focus:outline-none focus:border-[#C75B39] bg-[#F5EDE0]"
                        disabled={isLoading || isListening}
                    />
                    {voiceSupported && (
                        <button
                            onClick={handleVoiceInput}
                            className={`p-2 rounded-xl transition-colors ${isListening
                                    ? 'bg-[#B5422A] text-white animate-pulse'
                                    : 'bg-[#F5EDE0] text-[#5C3D2E] hover:bg-[#E8E6DC]'
                                }`}
                            title="Voice input"
                            disabled={isLoading}
                        >
                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                    )}
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading || isListening}
                        className={`p-2 rounded-xl transition-colors ${input.trim() && !isLoading && !isListening
                                ? 'bg-[#C75B39] text-white hover:bg-[#A8482D]'
                                : 'bg-[#E8E6DC] text-[#8B7355] cursor-not-allowed'
                            }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-[#8B7355]">
                    <span>🌿 AI farming assistant</span>
                    {isSpeaking && <span className="text-[#C75B39]">🔊 Speaking...</span>}
                </div>
            </div>
        </div>
    );
}
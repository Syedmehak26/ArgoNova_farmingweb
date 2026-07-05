// src/services/geminiVision.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("⚠️ VITE_GEMINI_API_KEY is missing. Photo analysis will not work.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface DiagnosisResult {
    diseaseName: string;
    diseaseNameHi?: string;
    diseaseNameTe?: string;
    severity: 'High' | 'Medium' | 'Low';
    symptoms: string[];
    causes: string[];
    organicTreatment: string[];
    chemicalTreatment: string[];
    prevention: string[];
    fertilizerAdvice: string;
    confidence: number;
    crop: string;
}

async function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 1024;
                if (width > height && width > MAX_SIZE) {
                    height = height * (MAX_SIZE / width);
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width = width * (MAX_SIZE / height);
                    height = MAX_SIZE;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                const base64 = dataUrl.split(',')[1];
                resolve(base64);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

function getPrompt(): string {
    return `
You are an expert agricultural pathologist. Analyze this plant image and provide a detailed diagnosis.

Return ONLY a valid JSON object with the following structure. Do NOT include any markdown or extra text.

{
  "diseaseName": "English name of the disease",
  "diseaseNameHi": "Hindi name (if known, else same)",
  "diseaseNameTe": "Telugu name (if known, else same)",
  "severity": "High" or "Medium" or "Low",
  "symptoms": ["symptom 1", "symptom 2", ...],
  "causes": ["cause 1", "cause 2", ...],
  "organicTreatment": ["organic solution 1", "organic solution 2", ...],
  "chemicalTreatment": ["chemical solution 1", "chemical solution 2", ...],
  "prevention": ["prevention tip 1", "prevention tip 2", ...],
  "fertilizerAdvice": "Fertilizer advice string",
  "confidence": 85 (percentage as number),
  "crop": "Crop name (e.g., Tomato, Chilli)"
}

If you cannot identify the disease or the image is unclear, set confidence below 50 and provide a generic response.
`;
}

function getFallbackDiagnosis(): DiagnosisResult {
    return {
        diseaseName: "Unable to identify disease from image",
        diseaseNameHi: "बीमारी की पहचान नहीं हो पाई",
        diseaseNameTe: "వ్యాధిని గుర్తించలేకపోయాము",
        severity: "Medium",
        symptoms: [
            "We couldn't accurately identify the disease from the image.",
            "Please try uploading a clearer photo of the affected part.",
            "Check our Disease Guide for common issues."
        ],
        causes: [
            "Unclear image",
            "Insufficient lighting",
            "Partial view of the plant"
        ],
        organicTreatment: [
            "Consult our Disease Guide for organic treatments based on symptoms."
        ],
        chemicalTreatment: [
            "Consult our Disease Guide for chemical treatments based on symptoms."
        ],
        prevention: [
            "Ensure good crop management practices.",
            "Monitor plants regularly.",
            "Use disease-resistant varieties."
        ],
        fertilizerAdvice: "Maintain balanced nutrition based on your crop type.",
        confidence: 30,
        crop: "Unknown"
    };
}

export async function analyzePlantImage(imageFile: File): Promise<DiagnosisResult> {
    if (!API_KEY || !genAI) {
        return getFallbackDiagnosis();
    }

    try {
        const base64Image = await compressImage(imageFile);
        const mimeType = imageFile.type || 'image/jpeg';

        // ✅ CHANGE THIS LINE TO YOUR VERSION
        // Options: gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash-exp
        const MODEL_NAME = 'gemini-2.5-flash';

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent([
            getPrompt(),
            { inlineData: { mimeType, data: base64Image } }
        ]);

        const responseText = result.response.text();
        let jsonStr = responseText;
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
            jsonStr = codeBlockMatch[1].trim();
        } else {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) jsonStr = jsonMatch[0];
        }

        const diagnosis = JSON.parse(jsonStr) as DiagnosisResult;
        if (!diagnosis.diseaseName || !diagnosis.symptoms || !diagnosis.causes) {
            throw new Error("Incomplete diagnosis data.");
        }
        return diagnosis;

    } catch (error) {
        console.error("❌ Photo Analysis Error:", error);
        return getFallbackDiagnosis();
    }
}

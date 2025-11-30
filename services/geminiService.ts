import { GoogleGenAI } from "@google/genai";
import { GeneratedCodeResponse } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateComponentCode = async (promptTitle: string, promptDescription: string): Promise<GeneratedCodeResponse> => {
  const ai = getClient();
  
  const systemInstruction = `
    You are an expert Senior React Frontend Engineer specializing in Tailwind CSS.
    Your task is to generate a functional, single-file React component based on the user's design prompt.
    
    Rules:
    1. Use React Functional Components with Hooks.
    2. Use Tailwind CSS for ALL styling. Do not use CSS modules or styled-components.
    3. Use 'lucide-react' for icons if needed.
    4. Ensure the component is responsive and visually stunning.
    5. Return ONLY the code, no markdown backticks around the code block itself if possible, but standard markdown is okay as I will strip it.
    6. Include a brief 1-sentence explanation at the end.
    
    Format your response as a JSON object:
    {
      "code": "string (the full react component code)",
      "explanation": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Design Prompt: ${promptTitle}\nDescription: ${promptDescription}`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: systemInstruction
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedCodeResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

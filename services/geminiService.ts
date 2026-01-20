
import { GoogleGenAI } from "@google/genai";
import { GenerationRequest, ImageStyle } from "../types";
import { STYLE_OPTIONS } from "../constants";

export const generateImage = async (request: GenerationRequest): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is missing. Please ensure your environment is configured.");

  const ai = new GoogleGenAI({ apiKey });
  
  const styleConfig = STYLE_OPTIONS.find(s => s.id === request.style);
  const fullPrompt = `${request.prompt}. ${styleConfig?.promptSuffix || ""}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: request.aspectRatio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data returned from the API.");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

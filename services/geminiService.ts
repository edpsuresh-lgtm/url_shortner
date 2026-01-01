
import { GoogleGenAI, Type } from "@google/genai";
import { AliasSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartAliases = async (url: string): Promise<AliasSuggestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 creative, short, and relevant URL aliases for this link: ${url}. 
      Return only a JSON array of objects with 'alias' (kebab-case) and 'reason' (short explanation).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              alias: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["alias", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating aliases:", error);
    return [];
  }
};

export const getUrlMetadata = async (url: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this URL: ${url}, provide a short professional title and a 1-sentence description of what this website likely contains. 
      Return JSON with 'title' and 'description'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Untitled Link", description: "No description available." };
  }
};

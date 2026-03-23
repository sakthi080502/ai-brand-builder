import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface BrandAsset {
  id: string;
  medium: string;
  imageUrl: string;
  prompt: string;
}

export async function generateVisualIdentity(description: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a professional brand consultant. Take this product description and expand it into a highly detailed, consistent visual description for an AI image generator. Focus on materials, colors, shape, and lighting. DO NOT include people. Keep it concise but descriptive.
    
    Product: ${description}`,
  });
  return response.text || description;
}

export async function generateAsset(visualIdentity: string, medium: string): Promise<string> {
  let mediumPrompt = "";
  let aspectRatio: "1:1" | "16:9" | "4:3" | "9:16" | "3:4" = "1:1";

  switch (medium.toLowerCase()) {
    case "billboard":
      mediumPrompt = "featured on a massive outdoor highway billboard. Wide shot, urban background, professional advertising photography, high resolution.";
      aspectRatio = "16:9";
      break;
    case "newspaper":
      mediumPrompt = "as a black and white newspaper advertisement. High contrast, newsprint texture, vintage or modern editorial style.";
      aspectRatio = "3:4";
      break;
    case "social post":
      mediumPrompt = "as a clean, vibrant social media product shot. Minimalist background, soft studio lighting, high-end lifestyle product photography.";
      aspectRatio = "1:1";
      break;
    default:
      mediumPrompt = `visualized as a ${medium}.`;
  }

  const fullPrompt = `${visualIdentity}. The product is ${mediumPrompt} ABSOLUTELY NO PEOPLE in the image. Focus purely on the product and its environment.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: fullPrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image");
}

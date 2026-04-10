import { GoogleGenAI } from "@google/genai";
import { TrainingRequest } from "../types";

declare var process: {
  env: {
    API_KEY: string;
  };
};

export const getAIRecommendation = async (request: TrainingRequest): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return "Analyzing your specific training goals. We'll find a coach that fits your schedule and session frequency perfectly.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const totalBudget = request.perSessionBudget * request.sessionsPerMonth;
    const scheduleSummary = request.schedule.map(s => `${s.day}s at ${s.time}`).join(", ");

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Act as an elite sports consultant. A user wants to train for ${request.sports.join(", ")}. 
      They have ${request.equipment.join(", ") || 'minimal equipment'} available. 
      Their budget is ₹${request.perSessionBudget} per session for ${request.sessionsPerMonth} sessions a month (Total: ₹${totalBudget}).
      Their schedule is: ${scheduleSummary}.
      Provide a 2-sentence encouraging insight into why their chosen frequency and budget are ideal for finding a top-tier coach. Keep it premium and professional.`,
    });
    
    return response.text || "Your training profile is impressive. We're sourcing a coach with the specific expertise needed for your goals.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Your profile is impressive. We're sourcing a coach with the specific expertise needed for your training requirements.";
  }
};
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { AIModels, IGenerate } from "../interface";
import { InternalServerError } from "../errors";
import { instructions } from "./instructions";

const { GEMINI_API_KEY, OPEN_AI_API_KEY } = process.env;

class AIGen {
  private geminiAI: GoogleGenAI;
  private openAI: OpenAI;

  constructor() {
    this.geminiAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.openAI = new OpenAI({ apiKey: OPEN_AI_API_KEY });
  }

  async generate(payload: IGenerate) {
    try {
      const { ai, input, usecase, model } = payload;

      if (!usecase || !instructions[usecase]) {
        throw new InternalServerError("Missing or invalid usecase!");
      }

      let response: string;

      switch (ai) {
        case AIModels.GEMINI_AI: {
          const geminiResponse = await this.geminiAI.models.generateContent({
            model: model ?? "gemini-1.5-flash",
            contents: [
              {
                role: "user",
                parts: [{ text: instructions[usecase] }, { text: input }],
              },
            ],
          });

          const parts = geminiResponse.candidates?.[0]?.content?.parts;
          response = parts?.map((p: any) => p.text).join("\n") || "No content";
          break;
        }

        case AIModels.OPEN_AI: {
          const openaiResponse = await this.openAI.chat.completions.create({
            model: model ?? "gpt-4o",
            messages: [
              {
                role: "system",
                content: instructions[usecase],
              },
              {
                role: "user",
                content: input,
              },
            ],
          });

          response =
            openaiResponse.choices?.[0]?.message?.content || "No content";
          break;
        }
        default:
          throw new InternalServerError(
            "Sorry, this AI model is not supported!"
          );
      }

      return response;
    } catch (error: any) {
      console.error("AI generation error:", error);
      throw new InternalServerError(error?.message || "AI generation failed.");
    }
  }
}

export default AIGen;

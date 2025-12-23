
import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

export const getStudentInsight = async (student: Student) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tələbə haqqında akademik məlumatlar: 
        Ad: ${student.name} ${student.surname}
        GPA: ${student.gpa}
        Bacarıqlar: ${student.skills.map(s => `${s.name}: ${s.value}%`).join(', ')}
        
        Bu tələbənin güclü tərəflərini və hansı sahələrdə işləməli olduğunu 2-3 cümlə ilə Azərbaycan dilində xülasə et. Realist ol, tərifləməkdən çox inkişaf sahələrinə də toxun.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xülasə hazırlana bilmədi. Zəhmət olmasa internet bağlantınızı yoxlayın.";
  }
};

export const generateStructuredReference = async (rawText: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aşağıdakı müəllim qeydini strukturlaşdırılmış referans formatına sal: "${rawText}"
        Cavabı JSON formatında qaytar.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: 'Qısa xülasə' },
            detectedSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: 'Mətndə aşkar edilən bacarıqlar'
            },
            rating: { type: Type.NUMBER, description: '1-5 arası təxmini reytinq' }
          },
          required: ["summary", "detectedSkills", "rating"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Reference Error:", error);
    return null;
  }
};

export const analyzeCVContent = async (fileName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sən bir peşəkar CV analitiki sən. Fayl adı "${fileName}" olan sənədi analiz etdiyini düşünərək, 
        tələbə üçün 5 fərqli bacarığı (skill) texniki, yumşaq (soft) və analitik kateqoriyalar üzrə JSON formatında qaytar.
        Bacarıq faizləri çox yüksək olmasın, realist olsun (məsələn 40-85 arası).
        Həmçinin sənəddə tapıla biləcək GitHub və LinkedIn linklərini də çıxar. Cavab Azərbaycan dilində olsun.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  category: { type: Type.STRING, enum: ['Technical', 'Soft', 'Analytical', 'Tools'] }
                },
                required: ["name", "value", "category"]
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING, enum: ['LinkedIn', 'GitHub'] },
                  url: { type: Type.STRING }
                },
                required: ["platform", "url"]
              }
            }
          },
          required: ["skills", "links"]
        }
      }
    });
    return JSON.parse(response.text || '{"skills": [], "links": []}');
  } catch (error) {
    console.error("Gemini CV Analysis Error:", error);
    return { skills: [], links: [] };
  }
};

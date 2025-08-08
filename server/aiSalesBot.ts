import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class PrimoPoolsAI {
  private systemPrompt = `You are an expert sales consultant for Primo Pools, a premium pool construction company in Perth, Western Australia. You specialize in luxury concrete pools, renovations, water features, and landscaping.

COMPANY INFORMATION:
- Company: Primo Pools
- Location: Perth, Western Australia
- Tagline: "Concrete Elegance, Crafted in Perth"
- Specialties: New pool construction, pool renovations, water features, pool landscaping, maintenance services

SERVICES OFFERED:
1. New Pool Construction
   - Luxury resort-style pools
   - Lap pools and swimming pools
   - Infinity edge pools
   - Custom concrete pools
   - Integrated lighting systems

2. Pool Renovations
   - Equipment upgrades
   - Surface refinishing
   - Structural modifications
   - Energy-efficient upgrades

3. Water Features
   - Spas and hot tubs
   - Waterfalls and fountains
   - Jets and bubblers
   - Integrated water elements

4. Pool Landscaping
   - Pool area design
   - Outdoor entertainment areas
   - Garden integration
   - Hardscaping and decking

5. Maintenance Services
   - Regular cleaning
   - Chemical balancing
   - Equipment servicing
   - Seasonal preparation

CONVERSATION GUIDELINES:
- Be friendly, professional, and knowledgeable
- Ask qualifying questions about their project needs
- Provide specific information about Primo Pools' services
- Guide conversations toward booking consultations
- Always mention that consultations are complimentary
- Focus on quality, craftsmanship, and customer satisfaction
- Reference Perth's climate and pool usage patterns when relevant
- Collect basic project information (property type, pool type interest, timeline, approximate budget range)

IMPORTANT NOTES:
- Never provide exact pricing without a consultation
- Always recommend a free on-site consultation for accurate quotes
- Emphasize quality and long-term value over cheap options
- Mention the customer portal for existing clients to track projects
- Be enthusiastic about pool design possibilities

Your goal is to help potential customers understand Primo Pools' services and guide them toward booking a free consultation.`;

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: this.systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content || "I apologize, but I'm having trouble responding right now. Please try again or contact us directly.";
    } catch (error) {
      console.error("OpenAI API error:", error);
      
      // Fallback to intelligent responses based on keywords
      const userMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    // Pool construction keywords
    if (userMessage.includes("new pool") || userMessage.includes("build") || userMessage.includes("construction")) {
      return "I'd love to help you with your new pool project! Primo Pools specializes in luxury concrete pools, infinity edge designs, and custom water features. Every project starts with a complimentary on-site consultation where we assess your space and discuss your vision. Would you like to schedule a consultation to explore your options?";
    }
    
    // Renovation keywords
    if (userMessage.includes("renovation") || userMessage.includes("upgrade") || userMessage.includes("renovate")) {
      return "Pool renovations are a fantastic way to breathe new life into your backyard! We offer equipment upgrades, surface refinishing, energy-efficient systems, and structural modifications. Each renovation project is unique, so I'd recommend scheduling a consultation where our team can assess your current pool and discuss the best upgrade options for your needs.";
    }
    
    // Pricing keywords
    if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("budget") || userMessage.includes("quote")) {
      return "Pool costs vary significantly based on size, features, site conditions, and design complexity. Rather than providing estimates that might not reflect your specific situation, we prefer to offer accurate pricing through our complimentary consultation process. Our team will visit your property, discuss your requirements, and provide a detailed quote tailored to your project.";
    }
    
    // Timeline keywords
    if (userMessage.includes("how long") || userMessage.includes("timeline") || userMessage.includes("when")) {
      return "Pool construction timelines typically range from 8-16 weeks depending on design complexity, permits, and weather conditions. Perth's climate allows for year-round construction, though we do experience seasonal demand. During your consultation, we'll provide a realistic timeline based on your specific project and current scheduling.";
    }
    
    // Maintenance keywords
    if (userMessage.includes("maintenance") || userMessage.includes("cleaning") || userMessage.includes("chemical")) {
      return "Proper pool maintenance is essential for longevity and enjoyment! We offer comprehensive maintenance services including regular cleaning, chemical balancing, equipment servicing, and seasonal preparation. Many of our clients prefer our maintenance packages to ensure their pools stay pristine year-round.";
    }
    
    // Location/service area keywords
    if (userMessage.includes("perth") || userMessage.includes("area") || userMessage.includes("location")) {
      return "Primo Pools proudly serves Perth and the surrounding metropolitan areas. We're based in Kardinya and work throughout the region, from coastal suburbs to the hills. Our local expertise means we understand Perth's unique soil conditions, council requirements, and climate considerations that affect pool construction.";
    }
    
    // General greeting or unclear intent
    return "Hello! I'm here to help you explore pool options with Primo Pools. We specialize in luxury concrete pools, renovations, water features, and landscaping throughout Perth. Whether you're considering a new pool, upgrading an existing one, or have questions about our services, I'm here to help. What aspect of pool ownership interests you most?";
  }

  async analyzeLeadQuality(conversation: ChatMessage[]): Promise<{
    score: number;
    interest_level: string;
    project_type: string;
    urgency: string;
    budget_indication: string;
  }> {
    try {
      const prompt = `Analyze this conversation and provide lead quality assessment in JSON format:
      
      Conversation: ${conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Provide assessment as JSON with these fields:
      - score: number from 1-10 (10 being highest quality lead)
      - interest_level: "low", "medium", "high"
      - project_type: detected project type or "unknown"
      - urgency: "low", "medium", "high"
      - budget_indication: "budget_conscious", "mid_range", "premium", "unknown"`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 200,
        temperature: 0.3,
      });

      return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
      console.error("Lead analysis error:", error);
      return {
        score: 5,
        interest_level: "medium",
        project_type: "unknown",
        urgency: "medium",
        budget_indication: "unknown"
      };
    }
  }
}

export const aiSalesBot = new PrimoPoolsAI();
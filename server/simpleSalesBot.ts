export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class SimpleSalesBot {
  generateResponse(messages: ChatMessage[]): string {
    const userMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
    const conversationHistory = messages.map(m => m.content.toLowerCase()).join(" ");
    
    // Business topic validation - reject non-pool related queries first
    if (this.isOffTopic(userMessage)) {
      return "I'm here specifically to help with pool construction, renovations, and maintenance services at Primo Pools. How can I assist you with your pool project today?";
    }
    
    // Check if user has provided contact information
    const hasName = this.extractName(conversationHistory);
    const hasLocation = this.extractLocation(conversationHistory);
    const hasProjectType = this.extractProjectType(conversationHistory);
    
    // Lead qualification flow - ask for name if not provided and conversation is ongoing
    if (!hasName && messages.length > 2) {
      return "To provide you with the most accurate information and potentially schedule a consultation, may I have your first name?";
    }
    
    // Ask for location after name is provided
    if (hasName && !hasLocation) {
      return "Thanks! What suburb are you located in? This helps us understand your local council requirements and site conditions.";
    }
    
    // Ask for project type after location is provided
    if (hasName && hasLocation && !hasProjectType) {
      return "Perfect! Are you looking at building a new pool, renovating an existing pool, or exploring maintenance services?";
    }
    
    // Pool construction keywords
    if (userMessage.includes("new pool") || userMessage.includes("build") || userMessage.includes("construction") || userMessage.includes("luxury")) {
      if (!hasName) {
        return "Excellent! I'd love to help you with your new pool project. Primo Pools specializes in luxury concrete pools, infinity edge designs, and custom water features. To provide you with specific recommendations, what's your first name?";
      }
      return "Perfect! New pool construction is our specialty. We create custom concrete pools, infinity edges, and integrated water features. What size pool area are you considering, and do you have any specific design features in mind like spas or waterfalls?";
    }
    
    // Renovation keywords
    if (userMessage.includes("renovation") || userMessage.includes("upgrade") || userMessage.includes("renovate") || userMessage.includes("repair")) {
      if (!hasName) {
        return "Pool renovations are a fantastic way to breathe new life into your backyard! We offer equipment upgrades, surface refinishing, energy-efficient systems, and structural modifications. To provide you with specific renovation recommendations, what's your first name?";
      }
      return "Perfect! Pool renovations can transform your existing pool. What specific aspects are you looking to upgrade - equipment, surface finishes, adding water features, or structural modifications?";
    }
    
    // Pricing keywords
    if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("budget") || userMessage.includes("quote") || userMessage.includes("expensive") || userMessage.includes("cheap")) {
      return "Pool costs vary significantly based on size, features, site conditions, and design complexity. Rather than providing estimates that might not reflect your specific situation, we prefer to offer accurate pricing through our complimentary consultation process. Our team will visit your property, discuss your requirements, and provide a detailed quote tailored to your project.";
    }
    
    // Timeline keywords
    if (userMessage.includes("how long") || userMessage.includes("timeline") || userMessage.includes("when") || userMessage.includes("time") || userMessage.includes("schedule")) {
      return "Pool construction timelines typically range from 8-16 weeks depending on design complexity, permits, and weather conditions. Perth's climate allows for year-round construction, though we do experience seasonal demand. During your consultation, we'll provide a realistic timeline based on your specific project and current scheduling.";
    }
    
    // Maintenance keywords
    if (userMessage.includes("maintenance") || userMessage.includes("cleaning") || userMessage.includes("chemical") || userMessage.includes("service")) {
      return "Proper pool maintenance is essential for longevity and enjoyment! We offer comprehensive maintenance services including regular cleaning, chemical balancing, equipment servicing, and seasonal preparation. Many of our clients prefer our maintenance packages to ensure their pools stay pristine year-round.";
    }
    
    // Location/service area keywords
    if (userMessage.includes("perth") || userMessage.includes("area") || userMessage.includes("location") || userMessage.includes("where") || userMessage.includes("kardinya")) {
      return "Primo Pools proudly serves Perth and the surrounding metropolitan areas. We're based in Kardinya and work throughout the region, from coastal suburbs to the hills. Our local expertise means we understand Perth's unique soil conditions, council requirements, and climate considerations that affect pool construction.";
    }
    
    // Water features keywords
    if (userMessage.includes("spa") || userMessage.includes("fountain") || userMessage.includes("waterfall") || userMessage.includes("feature")) {
      return "Water features add incredible ambiance to any pool! We design and install spas, waterfalls, fountains, jets, and other custom water elements. These features can be integrated into new pool construction or added to existing pools during renovation. Each water feature is custom-designed to complement your pool's style and your landscape.";
    }
    
    // Design keywords
    if (userMessage.includes("design") || userMessage.includes("style") || userMessage.includes("look") || userMessage.includes("modern") || userMessage.includes("contemporary")) {
      return "Pool design is where creativity meets functionality! We work with various styles from modern geometric designs to naturalistic lagoon-style pools. Our design process includes 3D renderings so you can visualize your pool before construction begins. We consider your home's architecture, landscape, and personal preferences to create a cohesive outdoor living space.";
    }
    
    // Permits and legal keywords
    if (userMessage.includes("permit") || userMessage.includes("approval") || userMessage.includes("council") || userMessage.includes("legal") || userMessage.includes("regulation")) {
      return "We handle all permits and council approvals as part of our service! Pool construction in Perth requires various permits and compliance with local regulations. Our experienced team manages this process from start to finish, ensuring your pool meets all safety standards and building codes. This is included in our comprehensive service.";
    }
    
    // Greeting or hello
    if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey") || userMessage === "" || userMessage.includes("start")) {
      return "Hello! I'm your Primo Pools design consultant. I'm here to help you create the perfect pool for your Perth property. Whether you're considering a new luxury pool, renovating an existing one, or exploring water features and landscaping, I'm here to guide you. What type of pool project interests you most?";
    }
    
    // Contact or consultation keywords
    if (userMessage.includes("contact") || userMessage.includes("call") || userMessage.includes("consultation") || userMessage.includes("visit") || userMessage.includes("meet")) {
      return "I'd love to arrange a consultation for you! Our team offers complimentary on-site consultations where we assess your property, discuss your vision, and provide expert recommendations. You can contact us directly at (08) 9417 6356 or through our contact form. We're located at 35 Mannion Way, Kardinya, and serve all of Perth's metropolitan area.";
    }
    
    // Thank you
    if (userMessage.includes("thank") || userMessage.includes("thanks")) {
      return "You're very welcome! I'm here whenever you need more information about pool construction, renovations, or maintenance. Don't hesitate to reach out when you're ready to start planning your dream pool. Primo Pools is here to make your backyard transformation exceptional!";
    }
    
    // Complete lead qualification - ready for consultation
    if (hasName && hasLocation && hasProjectType) {
      return "Excellent! Based on our conversation, I'd love to schedule you for a complimentary on-site consultation where our team can assess your property and provide detailed recommendations. Would you prefer a weekday or weekend appointment? Our consultations typically take 45-60 minutes and include a full site assessment and design discussion.";
    }
    
    // General fallback
    return "I'm here to help you explore pool options with Primo Pools! We specialize in luxury concrete pools, renovations, water features, and landscaping throughout Perth. Whether you're considering a new pool, upgrading an existing one, or have questions about our services, I'm here to help. What aspect of pool ownership interests you most?";
  }

  private isOffTopic(message: string): boolean {
    const poolRelatedKeywords = [
      'pool', 'swim', 'water', 'spa', 'renovation', 'construction', 'maintenance',
      'cleaning', 'chemical', 'pump', 'filter', 'concrete', 'infinity', 'edge',
      'waterfall', 'fountain', 'landscaping', 'backyard', 'outdoor', 'deck',
      'primo', 'quote', 'consultation', 'perth', 'build', 'design', 'install'
    ];
    
    const offTopicIndicators = [
      'weather', 'politics', 'news', 'sports', 'food', 'restaurant', 'movie',
      'music', 'book', 'travel', 'job', 'career', 'dating', 'relationship',
      'health', 'medical', 'doctor', 'school', 'education', 'car', 'finance',
      'insurance', 'real estate', 'mortgage', 'investment'
    ];
    
    // Check if message contains pool-related keywords
    const hasPoolKeywords = poolRelatedKeywords.some(keyword => 
      message.includes(keyword)
    );
    
    // Check if message contains off-topic indicators
    const hasOffTopicIndicators = offTopicIndicators.some(keyword => 
      message.includes(keyword)
    );
    
    // Consider off-topic if no pool keywords and has off-topic indicators
    return !hasPoolKeywords && hasOffTopicIndicators;
  }

  private extractName(conversation: string): boolean {
    // Look for common name patterns or explicit name sharing
    const namePatterns = [
      /my name is (\w+)/i,
      /i'm (\w+)/i,
      /im (\w+)/i,
      /call me (\w+)/i,
      /this is (\w+)/i,
      /name's (\w+)/i,
      /i am (\w+)/i
    ];
    
    // Check for common first names in conversation
    const commonNames = [
      'sarah', 'john', 'mike', 'lisa', 'david', 'emma', 'james', 'anna', 
      'robert', 'maria', 'michael', 'jessica', 'william', 'ashley', 'richard',
      'jennifer', 'thomas', 'amanda', 'daniel', 'melissa', 'paul', 'nicole',
      'mark', 'stephanie', 'anthony', 'elizabeth', 'steven', 'helen', 'andrew'
    ];
    
    return namePatterns.some(pattern => pattern.test(conversation)) || 
           commonNames.some(name => conversation.includes(name));
  }

  private extractLocation(conversation: string): boolean {
    // Perth suburbs and common location indicators
    const locationKeywords = [
      'perth', 'fremantle', 'cottesloe', 'scarborough', 'kardinya', 'applecross',
      'nedlands', 'subiaco', 'leederville', 'mount lawley', 'victoria park',
      'south perth', 'canning vale', 'joondalup', 'wanneroo', 'rockingham',
      'mandurah', 'suburb', 'live in', 'located in', 'from', 'area'
    ];
    
    return locationKeywords.some(keyword => conversation.includes(keyword));
  }

  private extractProjectType(conversation: string): boolean {
    const projectKeywords = [
      'new pool', 'build', 'construction', 'renovation', 'upgrade', 'repair',
      'maintenance', 'service', 'cleaning', 'new', 'existing', 'current'
    ];
    
    return projectKeywords.some(keyword => conversation.includes(keyword));
  }
}

export const simpleSalesBot = new SimpleSalesBot();
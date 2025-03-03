import { Message } from "@/components/chatbot/newchatbot";
import { ChatGroq } from "@langchain/groq";

const data = {
    benefitssection: {
        heading: "Benefits",
        subheading: "Our Offerings",
        list: [
            {
                title: "Turn financial goals into a fun, visual experience",
                description: "With Cove, saving is more than just numbers. Customize your virtual island with rare decorations that represent your progress. Every dollar saved brings you closer to a unique, personalized world that grows as you do."
            },
            {
                title: "Invest with ease and confidence",
                description: "Earn competitive interest rates on FDIC-insured savings and SIPC-protected investments. With Cove, your money works as hard as you do—without the stress of traditional financial tools."
            },
            {
                title: "A community that grows together",
                description: "Connect with other savers through leaderboards, quests, and a dedicated Discord community. Share tips, find motivation, and celebrate milestones with friends."
            },
            {
                title: "Direct integrations with your favorite tools",
                description: "Cove syncs seamlessly with your bank accounts, ensuring you have complete control over your money without any extra effort."
            }
        ]
    },
    faqsection: {
        heading: "Frequently Asked Questions",
        subheading: "FAQs",
        list: [
            {
                title: "Can you customize my existing Shopify theme?",
                answer: "Connect with other savers through leaderboards, quests, and a dedicated Discord community. Share tips, find motivation, and celebrate milestones with friends."
            },
            {
                title: "What is a Development Sprint and how does it work?",
                answer: "Connect with other savers through leaderboards, quests, and a dedicated Discord community. Share tips, find motivation, and celebrate milestones with friends."
            },
            {
                title: "How long does it typically take to build a complete Shopify site?",
                answer: "Connect with other savers through leaderboards, quests, and a dedicated Discord community. Share tips, find motivation, and celebrate milestones with friends."
            },
            {
                title: "Are your Shopify solutions mobile-responsive?",
                answer: "Connect with other savers through leaderboards, quests, and a dedicated Discord community. Share tips, find motivation, and celebrate milestones with friends."
            },
        ]
    },
};

const dataString = JSON.stringify(data, null, 2);

// Track whether the welcome message has been sent

export async function AiChatBotCall(messages: Message[]) {

    // Convert messages array to a string for the LLM
    const chatHistory = messages.map(msg => `${msg.isBot ? "Bot" : "User"}: ${msg.text}`).join("\n");

    // Check if the latest message is from the user and is a short greeting

    // Dynamic responses for short greetings
    const greetingResponses = [
        "Hi there! 😊 Nice to see you again! How can I assist you today?",
        "Hello! 😊 Great to have you back. What can I help you with?",
        "Hey! 😊 Welcome back. Let me know how I can assist you!",
    ];

    // Randomly select a greeting response
    const randomGreeting = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];

    // Construct the prompt for the LLM
    const prompt = `
        You are a polite and professional sales agent for Cove, a financial savings and investment platform. Your goal is to engage the customer, highlight the benefits of Cove, and gather information using the provided questions. Use a warm, human-like tone with emojis 😊👍 to make the conversation friendly and engaging.

        **Welcome Message Note:**  
        - The system sends this welcome message at the start: "Hey there! 👋😊 Glad to have you here! How’s your day going? I’d love to help you out—just let me know what you need! Oh, and if you’re cool with it, could you share your phone number or email? It’d make staying in touch so much easier! 😊". 
        - Do **not** send it again or anything similar (e.g., "Glad to have you here" or "Great to chat with you")—assume it’s already been sent and focus on continuing the conversation naturally.

        **Special Handling for "Hi" or Short Greetings:**  
        - If the latest user message is a short greeting like "hi," "hello," or similar, respond with a dynamic greeting like "${randomGreeting}".
        - If the user has not provided contact info, gently ask for it in a different way each time. Use these variations creatively and don’t repeat the same one twice in a row:
          1. "By the way, could you share your phone or email so we can keep in touch? 😊"
          2. "Hey, mind tossing me your email or phone? It’d be great to follow up! 🙌"
          3. "Oh, quick thing—got a phone number or email I can use to stay connected? 😊"
        - If the user provides a phone number or email, acknowledge it politely (e.g., "Awesome, thanks for sharing your email! 🙌 I’ve got it noted.") and don’t ask again unless clarification is needed.

        **Chat History:**  
        - The chat history is provided below as "User: [message]\nBot: [response]\n...". Respond only to the latest user message, using the history for context to avoid repetition.

        Progress the conversation using the questions from "faqsection.list" in this data: 
        ${dataString}

        **Rules to Follow:**  
        - Use the "title" fields from "faqsection.list" as questions to ask the customer, one at a time, in order, appending "(complete)" (e.g., "How can Cove help you save? (complete)").
        - Only ask questions from "faqsection.list" titles—don’t deviate or create new ones.
        - Weave in "benefitssection.list" info naturally when relevant (e.g., "Cove’s automated savings feature could really boost your goals! 😊").
        - Always keep a respectful, friendly, and professional tone—like a real human sales agent.
        - Use emojis thoughtfully (e.g., 😊, 🙌, 👍) to sound warm and approachable.
        - Don’t repeat questions unless clarification is needed.

        **Current Chat History:** 
        "${chatHistory}"

        Respond to the latest user message now, following the rules above. If it’s a short greeting like "hi" after the welcome message, say something like "${randomGreeting}" and ask for contact info casually if not already provided.
    `;

    const aiMsg = await llm.invoke([
        {
            role: 'assistant',
            content: prompt,
        },
        // Pass the latest user message as the "user" input, or empty string if none
        { role: "user", content: messages.length > 0 && !messages[messages.length - 1].isBot ? messages[messages.length - 1].text : "" },
    ]);

    return aiMsg;
}

const llm = new ChatGroq({
    apiKey: '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',
    model: "llama-3.1-8b-instant",
    temperature: 0.7, // Adjusted for more human-like variability
    maxRetries: 2,
});
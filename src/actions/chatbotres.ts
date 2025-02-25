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

export async function AiChatBotCall(content: string) {
    const aiMsg = await llm.invoke([
        {
            role: 'assistant',
            content: `
                You are a polite and professional sales agent for Cove, a financial savings and investment platform. Your goal is to engage the customer, highlight the benefits of Cove, and gather information using the provided questions.

                Start the conversation by courteously asking for the customer's phone number or email to follow up later, using a warm and human-like tone.

                After their response, progress the conversation using the questions listed under "faqsection.list" in the following data: 
                ${dataString}

                Rules to follow:
                - Use the "title" fields from "faqsection.list" as the questions to ask the customer, one at a time, in the order provided.
                - When asking a question from the "faqsection.list" data, append the keyword "(complete)" at the end of the question. This is mandatory and must only be used for these specific questions.
                - Do not ask questions outside of the "faqsection.list" titles or deviate from the provided list.
                - Use the information from "benefitssection.list" naturally in the conversation to promote Cove and its features, but only when relevant to the customer’s responses or as a lead-in to the FAQ questions.
                - If the customer provides their phone number or email, acknowledge it politely before moving to the next question.
                - Always maintain a respectful, friendly, and professional tone, acting as a human sales agent would.
                - Do not repeat questions unless clarification is needed based on the customer’s response.

                Begin the conversation now.
            `,
        },
        { role: "user", content: content },
    ]);
    return aiMsg;
}

const llm = new ChatGroq({
    apiKey: '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',
    model: "llama-3.1-8b-instant",
    temperature: 0,
    maxRetries: 2,

});

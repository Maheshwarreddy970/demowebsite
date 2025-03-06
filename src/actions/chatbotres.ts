'use server';


import { Message } from "@/components/chatbot/newchatbot";
import { ChatGroq } from "@langchain/groq";
// Define the data structure
const data = {
  title: "OAKWOOD ARCHITECTS",
  menu: {
    items: ["Menu", "Get Started"],
  },
  featuredProject: {
    name: "The Meadow House",
    description:
      "The Meadow House by Mark English Architects draws on Californian and Korean influences",
  },
  projects: {
    featured: "Featured Projects",
    description:
      "Highlights of cases that we passionately built with forward-thinking clients and friends over the years.",
    list: ["One Great Jones Alley", "Scorpia", "Dovecote"],
  },
  interiorDesign: "Interior Design",
  journal: {
    title: "Explore Journal",
    entries: [
      {
        title:
          "The concept of biophilia—human beings' inherent connection to nature.",
      },
      {
        title: "Smart Homes and Buildings: Integrating Technology and Design",
      },
      {
        title: "Wellness-Centric Design: Creating Healthy Interiors",
      },
    ],
  },
  footer: {
    address: "76-86 Manners Street, Wellington 6140, New Zealand",
    copyright: "© 2024 Aurum Company. All rights reserved.",
    credits: "Design and developed by SWT",
  },
  FooterList: [
    { name: "Home", link: "/" },
    { name: "Projects", link: "/project-collection" },
    { name: "About", link: "/about" },
    { name: "Journal", link: "/journal" },
    { name: "Sustainability", link: "/sustainability" },
  ],
  workCollection: {
    title: "The Meadow House",
    description:
      "The Meadow House by Mark English Architects draws on Californian and Korean influences",
    projects: [
      {
        name: "the-meadow-house",
        title: "The Meadow House",
        titleimg: [
          "/Y1SlBye7bzROKCM4Z8mb5VbHg.avif",
          "/CtqdgxpGYO4WFK0ftEeQyDERY0w.avif",
        ],
        lines: [
          "Conceived to respond to a variety of commercial and domestic uses, The Meadow House by Mark English Architects draws on Californian and Korean influences, illustrating a multiplicity that is as nuanced as it is resolved.",
          "The Santa Lucia Preserve is a private community spanning eight thousand hectares in California’s Carmel Valley. Ninety per cent of the expansive property is protected by a conservation land trust and, as a result, the environment is vast and untamed. Only a few hundred dwellings sit within this stunning landscape, including The Meadow House by Mark English Architects – a large family home that elegantly fuses Korean and Californian design sensibilities.",
          "Many of the biophilic tendencies they uncovered are aligned with Californian vernacular traditions, culminating in a project that is both conceptually unique and contextually relevant.",
        ],
        images: [
          "/TXUKQyclKbig1wkTbb4gGFKDk.avif",
          "/DErGBXCKfVwGZjfxm4iDjYawu9s.avif",
          "/cVL7GQJ93oveO40lFxMSHpDcsHI.avif",
          "/6mVf040uObmMYQk0MdjLSZvyx6U.avif",
        ],
      },
      {
        name: "one-great-jones-alley",
        title: "One Great Jones Alley",
        titleimg: [
          "/MrwrMt2iox7UPFuxfxwQoOg4s.avif",
          "/TTdNsUIJ7hNa3fW196hmNHfRznM.png",
        ],
        lines: [
          "Conceived to respond to a variety of commercial and domestic uses, The Meadow House by Mark English Architects draws on Californian and Korean influences, illustrating a multiplicity that is as nuanced as it is resolved.",
          "The Santa Lucia Preserve is a private community spanning eight thousand hectares in California’s Carmel Valley. Ninety per cent of the expansive property is protected by a conservation land trust and, as a result, the environment is vast and untamed. Only a few hundred dwellings sit within this stunning landscape, including The Meadow House by Mark English Architects – a large family home that elegantly fuses Korean and Californian design sensibilities.",
          "Many of the biophilic tendencies they uncovered are aligned with Californian vernacular traditions, culminating in a project that is both conceptually unique and contextually relevant.",
        ],
        images: [
          "/TXUKQyclKbig1wkTbb4gGFKDk.avif",
          "/DErGBXCKfVwGZjfxm4iDjYawu9s.avif",
          "/cVL7GQJ93oveO40lFxMSHpDcsHI.avif",
          "/6mVf040uObmMYQk0MdjLSZvyx6U.avif",
        ],
      },
      {
        name: "scorpia",
        title: "Scorpia",
        titleimg: [
          "/xY2ltysjjeDPAv2h8IdjICqEio_1.png",
          "/apr1iyeVu0giJ4G3Ouvu0nDGOmE.avif",
        ],
        lines: [
          "Conceived to respond to a variety of commercial and domestic uses, The Meadow House by Mark English Architects draws on Californian and Korean influences, illustrating a multiplicity that is as nuanced as it is resolved.",
          "The Santa Lucia Preserve is a private community spanning eight thousand hectares in California’s Carmel Valley. Ninety per cent of the expansive property is protected by a conservation land trust and, as a result, the environment is vast and untamed. Only a few hundred dwellings sit within this stunning landscape, including The Meadow House by Mark English Architects – a large family home that elegantly fuses Korean and Californian design sensibilities.",
          "Many of the biophilic tendencies they uncovered are aligned with Californian vernacular traditions, culminating in a project that is both conceptually unique and contextually relevant.",
        ],
        images: [
          "/TXUKQyclKbig1wkTbb4gGFKDk.avif",
          "/DErGBXCKfVwGZjfxm4iDjYawu9s.avif",
          "/cVL7GQJ93oveO40lFxMSHpDcsHI.avif",
          "/6mVf040uObmMYQk0MdjLSZvyx6U.avif",
        ],
      },
      {
        name: "dovecote",
        title: "Dovecote",
        titleimg: [
          "/fpSz08cqO9CONW7pXT8QyafavKA_1.png",
          "/MOLE-ARCHITECTS-HOUSEBOAT-AT-WEB-phRoryGardiner001.jpg",
        ],
        lines: [
          "Conceived to respond to a variety of commercial and domestic uses, The Meadow House by Mark English Architects draws on Californian and Korean influences, illustrating a multiplicity that is as nuanced as it is resolved.",
          "The Santa Lucia Preserve is a private community spanning eight thousand hectares in California’s Carmel Valley. Ninety per cent of the expansive property is protected by a conservation land trust and, as a result, the environment is vast and untamed. Only a few hundred dwellings sit within this stunning landscape, including The Meadow House by Mark English Architects – a large family home that elegantly fuses Korean and Californian design sensibilities.",
          "Many of the biophilic tendencies they uncovered are aligned with Californian vernacular traditions, culminating in a project that is both conceptually unique and contextually relevant.",
        ],
        images: [
          "/TXUKQyclKbig1wkTbb4gGFKDk.avif",
          "/DErGBXCKfVwGZjfxm4iDjYawu9s.avif",
          "/cVL7GQJ93oveO40lFxMSHpDcsHI.avif",
          "/6mVf040uObmMYQk0MdjLSZvyx6U.avif",
        ],
      },
    ],
    featured_projects: {
      title: "Featured Projects",
      description:
        "Highlights of cases that we passionately built with forward-thinking clients and friends over the years.",
      icon: "/41328140-da2b-4d17-9f32-4ee3288447e1.svg",
    },
    work_collection_footer: {
      company: {
        name: "OAKWOOD ARCHITECTS",
        tagline: "Where housing innovation is shaped.",
        logo: "/b79bf2b3-bd8b-410f-8022-7be6172fe960.svg",
      },
      image: "bWFZ6VKV9dQV7yjOspAjXxx0D4.avif",
    },
  },
  ExploreJournal: {
    journal: [
      {
        name: "biophilic-design-bringing-nature-indoors",
        title:
          "The concept of biophilia—human beings' inherent connection to nature.",
        titleimg: "/istockphoto-1405772777-612x612.jpg",
        href: "/journal/biophilic-design-bringing-nature-indoors",
        smartHomesAndBuildings: [
          {
            title: "Introduction to Smart Homes and Buildings",
            sections: [
              {
                name: "Definition and Overview",
                description:
                  "Define what constitutes a smart home or building and provide a brief overview of the integration of technology and design.",
              },
              {
                name: "Historical Evolution",
                description:
                  "Discuss the development of smart technology and its adoption in residential and commercial buildings over time.",
              },
            ],
          },
          {
            title: "Core Technologies in Smart Homes and Buildings",
            sections: [
              {
                name: "Internet of Things (IoT)",
                description:
                  "Explain the role of IoT in creating interconnected devices and systems within smart environments.",
              },
              {
                name: "Automation Systems",
                description:
                  "Detail various automation systems such as lighting, heating, cooling, and security.",
              },
              {
                name: "Smart Appliances",
                description:
                  "Explore the range of smart appliances available, from refrigerators to washing machines, and their benefits.",
              },
              {
                name: "Energy Management",
                description:
                  "Discuss smart energy management systems, including smart meters, thermostats, and renewable energy integration.",
              },
            ],
          },
          {
            title: "Design Principles for Smart Homes and Buildings",
            sections: [
              {
                name: "User-Centric Design",
                description:
                  "Emphasize the importance of designing with the end-user in mind, focusing on usability and user experience.",
              },
              {
                name: "Aesthetic Integration",
                description:
                  "Explore how technology can be seamlessly integrated into the design without compromising aesthetics.",
              },
              {
                name: "Space Optimization",
                description:
                  "Discuss how smart technologies can optimize space usage and enhance functionality.",
              },
              {
                name: "Flexibility and Scalability",
                description:
                  "Examine how designs can accommodate future upgrades and changes in technology.",
              },
            ],
          },
          {
            title: "Benefits of Smart Technology",
            sections: [
              {
                name: "Convenience and Comfort",
                description:
                  "Highlight how smart technology enhances daily living through automation and remote control.",
              },
              {
                name: "Energy Efficiency",
                description:
                  "Explore how smart systems contribute to energy savings and sustainability.",
              },
              {
                name: "Security and Safety",
                description:
                  "Discuss advanced security features such as smart locks, cameras, and emergency response systems.",
              },
              {
                name: "Health and Well-Being",
                description:
                  "Analyze how smart technologies can contribute to a healthier living environment, including air quality monitoring and ergonomic adjustments.",
              },
            ],
          },
          {
            title: "Case Studies and Examples",
            sections: [
              {
                name: "Residential Projects",
                description:
                  "Provide examples of smart homes with integrated technology and innovative design.",
              },
              {
                name: "Commercial Buildings",
                description:
                  "Highlight smart office buildings, retail spaces, and other commercial environments with successful technology integration.",
              },
              {
                name: "Public Buildings",
                description:
                  "Showcase smart public infrastructure such as smart libraries, museums, and transportation hubs.",
              },
            ],
          },
          {
            title: "Design and Technology Integration Challenges",
            sections: [
              {
                name: "Interoperability",
                description:
                  "Address the challenges of ensuring that different smart devices and systems work together seamlessly.",
              },
              {
                name: "Privacy and Security",
                description:
                  "Discuss concerns related to data privacy and cybersecurity in smart environments.",
              },
              {
                name: "Complexity and Usability",
                description:
                  "Explore the balance between sophisticated technology and user-friendly design.",
              },
              {
                name: "Cost and Accessibility",
                description:
                  "Consider the cost implications of smart technology and its accessibility for different types of projects.",
              },
            ],
          },
        ],
      },
      {
        name: "sustainable-spaces-eco-friendly-design-solutions",
        title: "Sustainable Spaces: Eco-Friendly Design Solutions",
        titleimg: "/LplpVPUpxDHnVTfRW8XsfQNw.avif",
        href: "/journal/sustainable-spaces-eco-friendly-design-solutions",
        smartHomesAndBuildings: [
          {
            title: "Introduction to Smart Homes and Buildings",
            sections: [
              {
                name: "Definition and Overview",
                description:
                  "Define what constitutes a smart home or building and provide a brief overview of the integration of technology and design.",
              },
              {
                name: "Historical Evolution",
                description:
                  "Discuss the development of smart technology and its adoption in residential and commercial buildings over time.",
              },
            ],
          },
          {
            title: "Core Technologies in Smart Homes and Buildings",
            sections: [
              {
                name: "Internet of Things (IoT)",
                description:
                  "Explain the role of IoT in creating interconnected devices and systems within smart environments.",
              },
              {
                name: "Automation Systems",
                description:
                  "Detail various automation systems such as lighting, heating, cooling, and security.",
              },
              {
                name: "Smart Appliances",
                description:
                  "Explore the range of smart appliances available, from refrigerators to washing machines, and their benefits.",
              },
              {
                name: "Energy Management",
                description:
                  "Discuss smart energy management systems, including smart meters, thermostats, and renewable energy integration.",
              },
            ],
          },
          {
            title: "Design Principles for Smart Homes and Buildings",
            sections: [
              {
                name: "User-Centric Design",
                description:
                  "Emphasize the importance of designing with the end-user in mind, focusing on usability and user experience.",
              },
              {
                name: "Aesthetic Integration",
                description:
                  "Explore how technology can be seamlessly integrated into the design without compromising aesthetics.",
              },
              {
                name: "Space Optimization",
                description:
                  "Discuss how smart technologies can optimize space usage and enhance functionality.",
              },
              {
                name: "Flexibility and Scalability",
                description:
                  "Examine how designs can accommodate future upgrades and changes in technology.",
              },
            ],
          },
          {
            title: "Benefits of Smart Technology",
            sections: [
              {
                name: "Convenience and Comfort",
                description:
                  "Highlight how smart technology enhances daily living through automation and remote control.",
              },
              {
                name: "Energy Efficiency",
                description:
                  "Explore how smart systems contribute to energy savings and sustainability.",
              },
              {
                name: "Security and Safety",
                description:
                  "Discuss advanced security features such as smart locks, cameras, and emergency response systems.",
              },
              {
                name: "Health and Well-Being",
                description:
                  "Analyze how smart technologies can contribute to a healthier living environment, including air quality monitoring and ergonomic adjustments.",
              },
            ],
          },
          {
            title: "Case Studies and Examples",
            sections: [
              {
                name: "Residential Projects",
                description:
                  "Provide examples of smart homes with integrated technology and innovative design.",
              },
              {
                name: "Commercial Buildings",
                description:
                  "Highlight smart office buildings, retail spaces, and other commercial environments with successful technology integration.",
              },
              {
                name: "Public Buildings",
                description:
                  "Showcase smart public infrastructure such as smart libraries, museums, and transportation hubs.",
              },
            ],
          },
          {
            title: "Design and Technology Integration Challenges",
            sections: [
              {
                name: "Interoperability",
                description:
                  "Address the challenges of ensuring that different smart devices and systems work together seamlessly.",
              },
              {
                name: "Privacy and Security",
                description:
                  "Discuss concerns related to data privacy and cybersecurity in smart environments.",
              },
              {
                name: "Complexity and Usability",
                description:
                  "Explore the balance between sophisticated technology and user-friendly design.",
              },
              {
                name: "Cost and Accessibility",
                description:
                  "Consider the cost implications of smart technology and its accessibility for different types of projects.",
              },
            ],
          },
        ],
      },
    ],
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
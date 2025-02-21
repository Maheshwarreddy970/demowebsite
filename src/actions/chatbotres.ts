import { ChatGroq } from "@langchain/groq";

const data = {
    metadata: {
        title: "Cove",
        description: "More than Just a Finance App. Creative saving. Stash money on your island with decorations and unleash your creativity",
        url: "https://usecove.com/",
        icon: "https://cove-tau.vercel.app/favicon.ico",
        thumbnail: "https://cove-tau.vercel.app/opengraphimage.png"

    },
    herosection: {
        herotagline: "Finance for next generation",
        heading: "How to grow your savings without the hassle of spreadsheets",
        subheading: "The only gamified finance app for young adults that makes saving and investing simple, rewarding, and fun.",
        insurance: "Protected by FDIC and SIPC insurance for peace of mind.",
        buttonslinks: {
            appstore: "https://apps.apple.com/us/app/cove-your-money-haven/id1589645033",
            playstore: "https://play.google.com/store/apps/details?id=com.EdenFinancialTechnologies.Eden"
        }
    },
    trustedby: {
        headers: "Trusted by industry leaders",
    },
    beforeaftersection: {
        heading: "Old Way Vs. New Way",
        subheading: "Imagine what you could do if managing money felt like a game",
        beforelist: [
            "Tracking savings felt boring and tedious",
            "Investing seemed too complex to start",
            "Financial apps left you feeling unmotivated"
        ],
        afterlist: [
            "Watch your savings grow while customizing your own island",
            "Invest effortlessly with a system designed for instant gratification",
            "Feel excited about reaching your financial goals"
        ]
    },
    howitworkssection: {
        heading: "How it works",
        subheading: "Start building wealth in just 5 minutes",
        signup: {
            heading: "Sign Up",
            subheading: "Create your account with secure, hassle-free onboarding.",
        },
        stashandearn: {
            heading: "Stash and Earn",
            subheading: "Watch your savings grow and earn rewards along the way.",
        },
        setgoals: {
            heading: "Set Goals",
            subheading: "Decide how much you want to save or invest.",
        }
    },
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
    gettoknowussection: {
        heading: "Who We Are",
        subheading: "Get to know us",
        title: "Lorem ipsum dolor sit amet consectetur. Congue elementum id arcu consectetur tortor erat tortor egestas sit.",
        list: [
            "Nullam duis convallis sem cras scelerisque aliquam. Sodales volutpat pulvinar amet curabitur pellentesque vestibulum turpis a at. Suspendisse lorem nisi lobortis donec ornare feugiat penatibus egestas amet. Amet sit scelerisque enim volutpat adipiscing.",
            "Nullam duis convallis sem cras scelerisque aliquam. Sodales volutpat pulvinar amet curabitur pellentesque vestibulum turpis a at. Suspendisse lorem nisi lobortis donec ornare feugiat penatibus egestas amet. Amet sit scelerisque enim volutpat adipiscing."
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

}
const dataString = JSON.stringify(data, null, 2);

const llm = new ChatGroq({
    apiKey: process.env.OLLAMA_API_KEY,
    model: "llama-3.1-70b-versatile", // Default value
    temperature: 0,
    maxRetries: 2,

});

export const aiMsg = await llm.invoke([
    {
        role: 'assistant',
        content: `
        You will get an data of questions that you must ask the customer. 
        
        Progress the conversation using those questions. 
        
        Whenever you ask a question from the data i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
        
        Do not forget it here the data of information ${dataString}

        dont answer out of data
        only add this keyword when your asking a question from the data of questions. No other question satisfies this condition

        Always maintain character and stay respectfull.
    `,
    },
    { role: "user", content: " what is hyderabad" },
]);

aiMsg;

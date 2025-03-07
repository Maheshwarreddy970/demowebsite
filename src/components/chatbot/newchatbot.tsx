"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { doc, setDoc, onSnapshot, getDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AiChatBotCall } from "@/actions/chatbotres";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FamilyButton } from "../ui/family-button";

export interface Message {
  id?: string;
  text: string;
  isBot: boolean;
  createdAt: number;
}

interface UserChatData {
  messages: Message[];
  summary: string;
  referralSource: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  visitCount: number;
  lastVisit: number;
  deviceInfo: {
    userAgent: string;
    browser?: string;
    os?: string;
    deviceType?: string;
  };
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
  totalVisits: number;
}

// Helper function to determine referral source
const getReferralSource = (referrer: string): string => {
  if (!referrer) return "direct";

  const referrerUrl = new URL(referrer).hostname.toLowerCase();
  const referralMap: { [key: string]: string } = {
    "github.com": "GitHub",
    "google.com": "Google",
    "google.com.hk": "Google",
    "lnkd.in": "LinkedIn",
    "linkedin.com": "LinkedIn",
    "t.co": "Twitter",
    "twitter.com": "Twitter",
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "whatsapp.com": "WhatsApp",
  };

  for (const [domain, source] of Object.entries(referralMap)) {
    if (referrerUrl.includes(domain)) {
      return source;
    }
  }

  return "direct"; // Default to "direct" if no match is found
};

const extractContactInfo = (text: string) => {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  const phoneMatch = text.match(phoneRegex);
  const emailMatch = text.match(emailRegex);

  return {
    phone: phoneMatch ? phoneMatch[0].replace(/[-.\s]/g, "") : undefined,
    email: emailMatch ? emailMatch[0] : undefined,
  };
};

const getDeviceInfo = (userAgent: string) => {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(userAgent);
  const isTablet = /Tablet|iPad/.test(userAgent);
  const browserMatch = userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera|MSIE|Trident)/i);
  const osMatch = userAgent.match(/(Windows|Mac OS|iOS|Android|Linux)/i);

  return {
    userAgent,
    deviceType: isMobile ? (isTablet ? "Tablet" : "Mobile") : "Desktop",
    browser: browserMatch ? browserMatch[0] : "Unknown",
    os: osMatch ? osMatch[0] : "Unknown",
  };
};

export function FamilyButtonDemo() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    const existingId = localStorage.getItem("chat-user-id");
    if (existingId) {
      setUserId(existingId);
    } else {
      const newId = "user-" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("chat-user-id", newId);
      setUserId(newId);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!userId || !isClient) return;

    const userDocRef = doc(db, "users", userId);
    const welcomeSentKey = `welcome-sent-${userId}`;
    const welcomeMessage = {
      text: "Hey there! 👋😊 Glad to have you here! How’s your day going? I’d love to help you out—just let me know what you need! Oh, and if you’re cool with it, could you share your phone number or email? It’d make staying in touch so much easier! 😊",
      isBot: true,
      createdAt: Date.now(),
    };

    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data() as UserChatData;
        const existingMessages = userData.messages || [];
        setMessages(existingMessages.sort((a, b) => a.createdAt - b.createdAt));
      }
      setIsLoading(false);
    });

    const initializeUser = async () => {
      const userDoc = await getDoc(userDocRef);
      const hasSentWelcome = localStorage.getItem(welcomeSentKey);

      const referralSource = getReferralSource(document.referrer); // Enhanced referral source detection

      if (!userDoc.exists()) {
        const currentTimestamp = Date.now();
        let location = {};
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          location = { city: data.city, region: data.region, country: data.country };
        } catch (error) {
          console.error("Error fetching location:", error);
        }

        const deviceInfo = getDeviceInfo(navigator.userAgent);
        await setDoc(userDocRef, {
          messages: [welcomeMessage],
          summary: "",
          referralSource, // Use enhanced referral source
          visitCount: 1,
          lastVisit: currentTimestamp,
          deviceInfo,
          location,
          totalVisits: 1,
        });
        setMessages([welcomeMessage]);
        localStorage.setItem(welcomeSentKey, "true");
      } else if (!hasSentWelcome && (!userDoc.data()?.messages || userDoc.data()?.messages.length === 0)) {
        await saveChatMessage(welcomeMessage.text, true);
        localStorage.setItem(welcomeSentKey, "true");
      } else {
        const currentTimestamp = Date.now();
        let location = {};
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          location = { city: data.city, region: data.region, country: data.country };
        } catch (error) {
          console.error("Error fetching location:", error);
        }

        const deviceInfo = getDeviceInfo(navigator.userAgent);
        await setDoc(
          userDocRef,
          {
            visitCount: increment(1),
            lastVisit: currentTimestamp,
            referralSource, // Update referral source for returning users
            deviceInfo,
            location,
            totalVisits: increment(1),
          },
          { merge: true }
        );
      }
    };

    initializeUser();
    return () => unsubscribe();
  }, [userId, isClient]);

  const saveChatMessage = async (text: string, isBot: boolean) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const referralSource = getReferralSource(document.referrer); // Enhanced referral source detection

      const userData: UserChatData = userDoc.exists()
        ? (userDoc.data() as UserChatData)
        : {
          messages: [],
          summary: "",
          referralSource,
          visitCount: 0,
          lastVisit: Date.now(),
          deviceInfo: getDeviceInfo(navigator.userAgent),
          totalVisits: 0,
        };

      const newMessage: Message = {
        text,
        isBot,
        createdAt: Date.now(),
      };
      userData.messages = [...(userData.messages || []), newMessage];

      userData.summary = isBot
        ? `${userData.summary} Bot responded.`
        : `${userData.summary} User said: "${text}".`;

      if (!isBot) {
        const { phone, email } = extractContactInfo(text);
        if (phone || email) {
          const newContactInfo: { phone?: string; email?: string } = {};
          if (phone) newContactInfo.phone = phone;
          if (email) newContactInfo.email = email;
          userData.contactInfo = { ...userData.contactInfo, ...newContactInfo };
        }
      }

      await setDoc(userDocRef, userData, { merge: true });
      console.log("Chat message saved:", text);
    } catch (error) {
      console.error("Error saving chat message:", error);
    }
  };

  const getBotResponse = async (newMessage: string) => {
    try {
      const updatedMessages = [...messages, { text: newMessage, isBot: false, createdAt: Date.now() }];
      const aiMsg = await AiChatBotCall(updatedMessages);
      console.log(aiMsg)
      return aiMsg as string;
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !userId || !isClient) return;

    try {
      await saveChatMessage(message, false);
      setMessage("");
      setIsTyping(true);

      const { phone, email } = extractContactInfo(message);
      let botResponse = "";
      if (phone && email) {
        botResponse = "Awesome, thanks for sharing your phone and email! 🙌 I’ve got them noted. How can I assist you further today?";
      } else if (phone) {
        botResponse = "Great, thanks for the phone number! 🙌 I’ve noted it. How can I help you next?";
      } else if (email) {
        botResponse = "Thanks for sharing your email! 🙌 I’ve got it down. What’s next on your mind?";
      } else {
        botResponse = await getBotResponse(message);
      }

      await saveChatMessage(botResponse, true);
    } catch (error) {
      console.error("Error in handleSend:", error);
      await saveChatMessage("Sorry, I encountered an error. Please try again.", true);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isClient || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="z-[50]">
      <div className="fixed bottom-4 right-4 z-[50]">
        <FamilyButton>
          <div className="h-[10%] flex items-center gap-2 py-3 shadow-sm border-b pl-7">
            <img
              width={40}
              height={40}
              src="/aa8c7f48-de04-4d37-98aa-da071b0809be.svg"
              className="size-8"
              alt="svg icon"
            />
            <div className="text-[0.9rem] leading-4 tracking-[-1.9px] text-left text-[rgb(170,136,103)]">
              <span className="font-semibold">OAKWOOD</span>
              <br />
              <span className="font-thin">ARCHITECTS</span>
            </div>
          </div>

          <div className="h-[80%] space-y-4 w-full overflow-y-auto px-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400">Start a conversation...</div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    `flex ${msg.isBot ? "justify-start" : "justify-end"}`,
                    index === 0 && "mt-20"
                  )}
                >
                  <div
                    className={`max-w-[80%] shadow px-4 py-1.5 ${
                      msg.isBot
                        ? "bg-gray-100 text-gray-800 rounded-r-3xl rounded-tl-3xl"
                        : "bg-[rgb(170,136,103)] text-white rounded-s-3xl rounded-tr-3xl"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.4s]"></span>
                </div>
              </div>
            )}
            <div className="h-20" ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="absolute bottom-14 z-[999] w-full px-4">
            <div className="flex gap-4">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="h-10 text-black bg-white shadow border"
              />
              <button type="submit" className="p-2 shadow border bg-[rgb(170,136,103)] text-white rounded-lg">
                <Send size={20} />
              </button>
            </div>
          </form>
        </FamilyButton>
      </div>
    </div>
  );
}
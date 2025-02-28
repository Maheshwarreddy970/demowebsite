"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Send, X, MinusCircle } from "lucide-react";
import { collection, doc, setDoc, onSnapshot, orderBy, query, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AiChatBotCall } from "@/actions/chatbotres";

interface Message {
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
}

// Mock function to get user IP (replace with real IP fetching logic if needed)
const getUserIP = () => {
  return "mock-ip-" + Math.random().toString(36).substring(2, 15);
};

// Helper to detect referral source
const getReferralSource = () => {
  const referrer = document.referrer || "direct";
  if (referrer.includes("instagram.com")) return "Instagram";
  if (referrer.includes("x.com") || referrer.includes("twitter.com")) return "X";
  return referrer || "unknown";
};

// Function to extract phone and email from text
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

// Function to save chat message and contact info to Firebase
export const saveChatMessage = async (text: string, isBot: boolean, userId?: string) => {
  try {
    const currentUserId = userId || getUserIP();
    const userDocRef = doc(db, "users", currentUserId);

    // Get existing user data or initialize it
    const userDoc = await getDoc(userDocRef);
    let userData: UserChatData = userDoc.exists()
      ? userDoc.data() as UserChatData
      : { messages: [], summary: "New conversation started", referralSource: getReferralSource() };

    // Add new message
    const newMessage: Message = {
      text,
      isBot,
      createdAt: Date.now(),
    };
    userData.messages.push(newMessage);

    // Update summary
    userData.summary = isBot
      ? `${userData.summary} Bot responded.`
      : `${userData.summary} User said: "${text}".`;

    // Extract and save contact info if present (only from user messages)
    if (!isBot) {
      const { phone, email } = extractContactInfo(text);
      if (phone || email) {
        // Only include defined values in contactInfo
        const newContactInfo: { phone?: string; email?: string } = {};
        if (phone) newContactInfo.phone = phone;
        if (email) newContactInfo.email = email;

        userData.contactInfo = {
          ...userData.contactInfo, // Preserve existing values
          ...newContactInfo,       // Add new values, overriding only if provided
        };
      }
    }

    // Save to Firestore
    await setDoc(userDocRef, userData, { merge: true });
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId] = useState(getUserIP());

  // Load previous conversations from Firebase based on userId
  useEffect(() => {
    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as UserChatData;
        setMessages(userData.messages.sort((a, b) => a.createdAt - b.createdAt));
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Get AI response using Groq
  const getBotResponse = async (userMessage: string) => {
    const aiMsg = await AiChatBotCall(userMessage);
    return aiMsg.content as string;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Save user message to Firestore
      await saveChatMessage(message, false, userId);
      setMessage("");
      setIsTyping(true);

      // Check if the message contains contact info and respond accordingly
      const { phone, email } = extractContactInfo(message);
      let botResponse = "";
      if (phone && email) {
        botResponse = "Thank you for sharing your phone number and email! I’ve noted them both down. How can I assist you further today?";
      } else if (phone) {
        botResponse = "Thank you for sharing your phone number! I’ve noted it down. How can I assist you further today?";
      } else if (email) {
        botResponse = "Thank you for sharing your email! I’ve noted it down. How can I assist you further today?";
      } else {
        botResponse = await getBotResponse(message);
      }

      // Save AI response to Firestore
      await saveChatMessage(botResponse, true, userId);
    } catch (error) {
      console.error("Error in handleSend:", error);
      await saveChatMessage("Sorry, I encountered an error. Please try again.", true, userId);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-9 z-50 ">


      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl  w-[350px] h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[rgb(170,136,103)] text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${msg.isBot ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
              <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`p-2 fixed bottom-6 right-6 z-50   rounded-full  shadow-xl bg-[rgb(170,136,103)] `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="  size-9  fill-white" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
            <path className="" d="M 12 2 A 9 9 0 0 0 3 11 A 9 9 0 0 0 12 20 L 12 23 C 12 23 19.39165 19.370314 20.761719 13.015625 A 9 9 0 0 0 20.839844 12.65625 C 20.880821 12.423525 20.923277 12.190914 20.947266 11.951172 A 9 9 0 0 0 20.957031 11.863281 C 20.982749 11.579721 21 11.293169 21 11 A 9 9 0 0 0 12 2 z"></path>
          </svg>

        </button>
    </div>
  );
}
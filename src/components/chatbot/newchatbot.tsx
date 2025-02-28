"use client"

import React, { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { collection, doc, setDoc, onSnapshot, orderBy, query, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AiChatBotCall } from "@/actions/chatbotres";
import { ScrollArea } from "../ui/scroll"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { FamilyButton } from "../ui/family-button"

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

export function FamilyButtonDemo() {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Use this effect to mark when we're running on the client
    useEffect(() => {
        setIsClient(true);
        
        // Generate a stable user ID
        const existingId = localStorage.getItem('chat-user-id');
        if (existingId) {
            setUserId(existingId);
        } else {
            const newId = "user-" + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('chat-user-id', newId);
            setUserId(newId);
        }
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Load previous conversations from Firebase based on userId
    useEffect(() => {
        if (!userId || !isClient) return;
        
        const userDocRef = doc(db, "users", userId);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data() as UserChatData;
                setMessages(userData.messages.sort((a, b) => a.createdAt - b.createdAt));
            }
        });

        return () => unsubscribe();
    }, [userId, isClient]);

    // Function to save chat message and contact info to Firebase
    const saveChatMessage = async (text: string, isBot: boolean) => {
        if (!userId) return;
        
        try {
            const userDocRef = doc(db, "users", userId);

            // Get existing user data or initialize it
            const userDoc = await getDoc(userDocRef);
            const referralSource = isClient ? (document.referrer || "direct") : "unknown";
            
            let userData: UserChatData = userDoc.exists()
                ? userDoc.data() as UserChatData
                : { 
                    messages: [], 
                    summary: "New conversation started", 
                    referralSource: referralSource
                };

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
        }
    };

    // Get AI response using Groq
    const getBotResponse = async (userMessage: string) => {
        try {
            const aiMsg = await AiChatBotCall(userMessage);
            return aiMsg.content as string;
        } catch (error) {
            console.error("Error getting AI response:", error);
            return "Sorry, I encountered an error. Please try again.";
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !userId || !isClient) return;

        try {
            // Save user message to Firestore
            await saveChatMessage(message, false);
            setMessage("");
            setIsTyping(true);

            // Check if the message contains contact info and respond accordingly
            const { phone, email } = extractContactInfo(message);
            let botResponse = "";
            if (phone && email) {
                botResponse = "Thank you for sharing your phone number and email! I've noted them both down. How can I assist you further today?";
            } else if (phone) {
                botResponse = "Thank you for sharing your phone number! I've noted it down. How can I assist you further today?";
            } else if (email) {
                botResponse = "Thank you for sharing your email! I've noted it down. How can I assist you further today?";
            } else {
                botResponse = await getBotResponse(message);
            }

            // Save AI response to Firestore
            await saveChatMessage(botResponse, true);
        } catch (error) {
            console.error("Error in handleSend:", error);
            await saveChatMessage("Sorry, I encountered an error. Please try again.", true);
        } finally {
            setIsTyping(false);
        }
    };

    // Prevent hydration issues by only rendering the complete component on the client
    if (!isClient) {
        return null; // Return nothing during SSR
    }

    return (
        <div className="z-[50]">
            <div className="fixed bottom-4 right-4 z-[50]">
                <FamilyButton>
                    {/* Header */}
                    <div className='h-[10%] flex items-center gap-2 py-3 shadow-sm border-b pl-7'>
                        <img src='/aa8c7f48-de04-4d37-98aa-da071b0809be.svg' className='size-8' alt='svg icon'></img>
                        <div className='text-[0.9rem] leading-4 tracking-[-1.9px] text-left text-[rgb(170,136,103)]'>
                            <span className='font-semibold'>OAKWOOD</span>
                            <br></br>
                            <span className='font-thin'>
                                ARCHITECTS
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="h-[80%] w-full px-3">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-400">Start a conversation...</div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={cn(`flex ${msg.isBot ? "justify-start" : "justify-end"}`, index===messages.length-1 && "mb-20", index===0 && "mt-20")}>
                                    <div
                                        className={`max-w-[80%] shadow px-4 py-1.5 ${msg.isBot ? "bg-gray-100 text-gray-800 rounded-r-3xl rounded-tl-3xl" : "bg-[rgb(170,136,103)] text-white rounded-s-3xl rounded-tr-3xl"}`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.2s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_0.8s_infinite_0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

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
    )
}
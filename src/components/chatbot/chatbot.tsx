'use client'

import React, { useState } from 'react';
import { MessageCircle, Send, X, MinusCircle } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", isBot: true }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: "Thanks for your message! This is a demo response.",
        isBot: true
      }]);
    }, 2000);

    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <div className="flex gap-2">
              <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                <MinusCircle size={20} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
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

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
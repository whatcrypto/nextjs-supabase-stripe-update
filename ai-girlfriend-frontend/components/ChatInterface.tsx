'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, MoreVertical, Heart } from 'lucide-react';
import { Character, Message } from '@/types';
import { cn } from '@/utils/cn';
import { chatApi } from '@/lib/api-client';

interface ChatInterfaceProps {
  character: Character;
  sessionId: string;
  onBack?: () => void;
}

export function ChatInterface({ character, sessionId, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add greeting message when chat starts
    if (messages.length === 0 && character.greeting) {
      const greetingMessage: Message = {
        id: `greeting-${Date.now()}`,
        characterId: character.id,
        content: character.greeting,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages([greetingMessage]);
    }
  }, [character, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      characterId: character.id,
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Create a temporary message for the AI response
      const tempAssistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        characterId: character.id,
        content: '',
        role: 'assistant',
        timestamp: new Date().toISOString(),
        isTyping: true,
      };
      
      setMessages((prev) => [...prev, tempAssistantMessage]);

      // Stream the response
      let fullResponse = '';
      await chatApi.streamMessage(
        sessionId,
        userMessage.content,
        (chunk) => {
          fullResponse += chunk;
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === tempAssistantMessage.id 
                ? { ...msg, content: fullResponse, isTyping: false }
                : msg
            )
          );
        },
        () => {
          setIsTyping(false);
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setIsLoading(false);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        characterId: character.id,
        content: "I'm sorry, I couldn't process that message. Please try again.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
                  alt={character.name}
                  className="w-10 h-10 rounded-full"
                />
                {character.isActive && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{character.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{character.personality}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "flex gap-3 max-w-[70%]",
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}>
                  {message.role === 'assistant' && (
                    <img
                      src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
                      alt={character.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  )}
                  <div
                    className={cn(
                      "chat-bubble",
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    )}
                  >
                    {message.isTyping ? (
                      <div className="flex gap-1 py-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Message ${character.name}...`}
              rows={1}
              className="flex-1 resize-none px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "p-3 rounded-full transition-all",
                inputValue.trim() && !isLoading
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

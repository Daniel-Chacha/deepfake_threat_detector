'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Settings2 } from 'lucide-react';
import { useApp } from '@/lib/context';
import { AIAssistantMessage } from '@/lib/types';

interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'sophia', name: 'Sophia', emoji: '👩‍💼', gradient: 'from-purple-500 to-pink-500' },
  { id: 'luna', name: 'Luna', emoji: '🧑‍🚀', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'aria', name: 'Aria', emoji: '👩‍🎓', gradient: 'from-orange-500 to-red-500' },
  { id: 'nova', name: 'Nova', emoji: '⚡', gradient: 'from-green-500 to-emerald-500' },
];

export function AIAssistant() {
  const { assistantMessages, addAssistantMessage, clearAssistantMessages } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(AVATAR_OPTIONS[0]);
  const [showAvatarSettings, setShowAvatarSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [assistantMessages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    addAssistantMessage({
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date(),
    });

    // Simulate assistant response
    setTimeout(() => {
      addAssistantMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAssistantResponse(currentMessage),
        timestamp: new Date(),
      });
    }, 500);

    setCurrentMessage('');
  };

  const generateAssistantResponse = (userMessage: string): string => {
    const responses: { [key: string]: string } = {
      detect: 'I can help you detect deepfakes! You can upload a video, image, or audio file and I\'ll analyze it for signs of AI manipulation.',
      deepfake: 'Deepfakes are synthetic media created using deep learning technology. They can be videos, images, or audio that have been manipulated or fabricated.',
      video: 'For video analysis, I check for facial inconsistencies, lighting anomalies, and audio-visual mismatches.',
      image: 'For image detection, I analyze pixel patterns, metadata, and signs of digital manipulation.',
      audio: 'For audio analysis, I look for voice cloning artifacts and synthetic speech patterns.',
      help: 'I\'m your AI assistant here to help you understand deepfakes and how to use our platform. What would you like to know?',
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return 'I can help you with deepfake detection! Ask me anything about how to use the platform or understanding AI-generated content.';
  };

  return (
    <>
      {/* Assistant Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center group animate-pulse-ring"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white group-hover:animate-float" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-96 glass-effect rounded-lg shadow-2xl border border-primary flex flex-col animate-slide-in-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedAvatar.gradient} flex items-center justify-center text-xl`}>
                {selectedAvatar.emoji}
              </div>
              <div>
                <p className="font-semibold text-foreground">{selectedAvatar.name}</p>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowAvatarSettings(!showAvatarSettings)}
              className="p-2 hover:bg-secondary rounded transition-smooth"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar Settings */}
          {showAvatarSettings && (
            <div className="p-4 border-b border-border bg-secondary/50 grid grid-cols-2 gap-2">
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setShowAvatarSettings(false);
                  }}
                  className={`p-2 rounded border transition-smooth text-center ${
                    selectedAvatar.id === avatar.id
                      ? 'border-accent bg-accent/20'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="text-2xl mb-1">{avatar.emoji}</div>
                  <p className="text-xs font-medium">{avatar.name}</p>
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {assistantMessages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm">
                <p>👋 Hi! I'm {selectedAvatar.name}</p>
                <p className="text-xs mt-2">Ask me about deepfakes or how to use the platform</p>
              </div>
            )}
            {assistantMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 animate-slide-in-bottom ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${selectedAvatar.gradient} flex items-center justify-center text-xs flex-shrink-0`}>
                    {selectedAvatar.emoji.charAt(0)}
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

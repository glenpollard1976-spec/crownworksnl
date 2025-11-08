"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the CrownWorks AI Assistant. I can help you with:\n\n• Business Consulting & Strategy\n• Legal Services (iLawyer)\n• Veterinary Practice Management (ProVet)\n• Brand & Creative Services\n\nWhat can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWidgetRef = useRef(null);
  const inputRef = useRef(null);

  // Detect mobile and handle viewport height
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set viewport height CSS variable for mobile
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 500);
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  // Prevent scroll jump when input is focused on mobile
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    
    const input = inputRef.current;
    const widget = chatWidgetRef.current;
    if (!input || !widget) return;

    let initialScrollY = 0;

    const handleFocus = () => {
      // Store initial scroll position
      initialScrollY = window.scrollY;
      
      // Small delay to let keyboard appear, then ensure input stays visible
      setTimeout(() => {
        // Only scroll within the widget messages container, not the page
        const messagesContainer = widget.querySelector('.overflow-y-auto');
        if (messagesContainer) {
          // Scroll messages container to bottom to keep input visible
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        // Prevent page scroll jump by maintaining scroll position
        if (Math.abs(window.scrollY - initialScrollY) > 10) {
          window.scrollTo({ top: initialScrollY, behavior: 'auto' });
        }
      }, 200);
    };

    input.addEventListener('focus', handleFocus);

    return () => {
      input.removeEventListener('focus', handleFocus);
    };
  }, [isOpen, isMobile]);

  const scrollToBottom = () => {
    // Only scroll within the widget container, not the page
    const messagesContainer = chatWidgetRef.current?.querySelector('.overflow-y-auto');
    if (messagesContainer && messagesEndRef.current) {
      // Scroll the messages container, not the page
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else {
      // Fallback: use scrollIntoView but only if widget is open
      if (isOpen && messagesEndRef.current) {
        // Use instant scroll on mobile to prevent jumping
        if (isMobile) {
          messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        } else {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };

  useEffect(() => {
    // Only scroll if widget is open
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isMobile, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
          context: {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage = {
          role: 'assistant',
          content: data.message,
          service: data.service,
          suggestedActions: data.suggestedActions,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or contact us directly at crownworksnl@gmail.com",
        error: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110"
          style={{ 
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div 
          ref={chatWidgetRef}
          className={`fixed ${isMobile ? 'inset-4 bottom-4 right-4 left-4' : 'bottom-6 right-6 w-96'} ${isMobile ? 'h-[calc(var(--vh,1vh)*100-2rem)] max-h-[calc(var(--vh,1vh)*100-2rem)]' : 'h-[600px]'} bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-zinc-200`}
          style={isMobile ? { 
            height: 'calc(var(--vh, 1vh) * 100 - 2rem)',
            maxHeight: 'calc(var(--vh, 1vh) * 100 - 2rem)',
            transform: 'translateZ(0)',
            willChange: 'transform'
          } : {}}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">CrownWorks AI Assistant</h3>
                <p className="text-xs text-indigo-100">How can I help you?</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-indigo-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain" style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : message.error
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-zinc-100 text-zinc-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.service && (
                    <p className="text-xs mt-1 opacity-75">
                      Service: {message.service}
                    </p>
                  )}
                  {message.suggestedActions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestedActions.map((action, i) => (
                        <a
                          key={i}
                          href={action.href}
                          onClick={() => {
                            setIsOpen(false);
                            const element = document.querySelector(action.href);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="block text-xs underline hover:no-underline"
                        >
                          {action.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-200 flex-shrink-0" style={{ 
            paddingBottom: isMobile ? 'calc(1rem + env(safe-area-inset-bottom))' : '1rem'
          }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ fontSize: '16px' }}
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Powered by CrownWorksNL AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  Bot,
} from "lucide-react";
import Layout from "@/components/Layout";
import ApiKeyNotice from "@/components/ApiKeyNotice";
import { InlineMath, BlockMath } from 'react-katex';

export default function Tutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you understand SAT, ACT, and AP exam concepts. Try typing or using your voice to ask me anything about test prep!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Check if user is near bottom before auto-scrolling
  const checkScrollPosition = () => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  };

  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if (synthRef.current && !isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessageContent = (text) => {
    // Split text by highlight markers for explanation highlighting
    const parts = text.split(/(<highlight>.*?<\/highlight>)/g);

    return parts.map((part, index) => {
      // Handle highlighted explanations
      if (part.startsWith('<highlight>') && part.endsWith('</highlight>')) {
        const content = part.slice(11, -12); // Remove <highlight> tags
        return (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-600/30 px-1 py-0.5 rounded">
            {renderTextWithMath(content)}
          </span>
        );
      }

      return <span key={index}>{renderTextWithMath(part)}</span>;
    });
  };

  const renderTextWithMath = (text) => {
    // Handle inline math expressions (single $) and display math (double $$)
    const mathRegex = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    const parts = text.split(mathRegex);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        // Display math (block)
        const mathContent = part.slice(2, -2);
        try {
          return <BlockMath key={index} math={mathContent} />;
        } catch (error) {
          return <span key={index}>{part}</span>;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        // Inline math
        const mathContent = part.slice(1, -1);
        try {
          return <InlineMath key={index} math={mathContent} />;
        } catch (error) {
          return <span key={index}>{part}</span>;
        }
      } else {
        // Regular text with bold formatting
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
        );
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your AI Tutor
            </h1>
            <p className="text-gray-600 dark:text-white/70">
              Ask me anything about test prep. Try typing or using your voice.
            </p>
          </div>

          <ApiKeyNotice />

          {/* Chat Container */}
          <Card className="bg-white dark:bg-black border dark:border-white/30 h-[600px] flex flex-col">
            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4"
              onScroll={checkScrollPosition}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] flex items-start space-x-3 ${
                      message.isUser ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser
                          ? "bg-white dark:bg-white text-emerald-600 dark:text-black"
                          : "bg-emerald-400 dark:bg-emerald-400 text-white dark:text-black"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.isUser
                          ? "bg-emerald-600 dark:bg-white text-white dark:text-black rounded-br-md"
                          : "bg-white dark:bg-black border dark:border-white/30 text-gray-900 dark:text-white rounded-bl-md"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {renderMessageContent(message.text)}
                      </div>
                      {!message.isUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            isSpeaking
                              ? stopSpeaking()
                              : speakText(message.text)
                          }
                          className="mt-2 p-1 h-6 w-6 hover:bg-gray-100 dark:hover:bg-white/10"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-400 dark:bg-emerald-400 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white dark:text-black" />
                    </div>
                    <div className="bg-white dark:bg-black border dark:border-white/30 p-4 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-white/50 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-white/50 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-white/50 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t dark:border-white/20">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="min-h-[60px] pr-12 resize-none dark:bg-black dark:border-white/50 dark:text-white"
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute bottom-2 right-2 p-2 h-8 w-8 ${
                      isListening
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-500 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="h-[60px] bg-emerald-600 dark:bg-emerald-400 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white dark:text-black"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

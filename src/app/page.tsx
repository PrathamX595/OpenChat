"use client";

import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings,
} from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

const AVAILABLE_MODELS = [
  {
    id: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    name: "Dolphin Mistral 24B",
  },
  { id: "google/gemma-3n-e2b-it:free", name: "Gemma 3N E2B" },
  {
    id: "mistralai/mistral-small-3.2-24b-instruct:free",
    name: "Mistral Small 3.2 24B",
  },
  {
    id: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    name: "DeepSeek R1 Qwen3 8B",
  },
  { id: "google/gemma-3n-e4b-it:free", name: "Gemma 3N E4B" },
  { id: "microsoft/mai-ds-r1:free", name: "Microsoft MAI DS R1" },
  { id: "meta-llama/llama-4-maverick:free", name: "Llama 4 Maverick" },
  {
    id: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
    name: "Llama 3.1 Nemotron Ultra 253B",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">AI ChatBot</h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <Select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-48"
              >
                {AVAILABLE_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by Coffee and Chaos
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col overflow-hidden">
        {/* Messages - Scrollable Area */}
        <div className="flex-1 overflow-hidden">
          <ChatMessageList className="h-full" smooth={true}>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  src={message.sender === "user" ? undefined : undefined}
                  fallback={message.sender === "user" ? "U" : "AI"}
                  className={
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }
                />
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                  enableMarkdown={message.sender === "ai"}
                  isLoading={
                    isLoading &&
                    message.id === messages[messages.length - 1]?.id &&
                    message.sender === "ai"
                  }
                >
                  {message.content}
                </ChatBubbleMessage>

                {message.sender === "ai" && (
                  <ChatBubbleActionWrapper variant="received">
                    <ChatBubbleAction
                      icon={<Copy className="w-4 h-4" />}
                      onClick={() => copyMessage(message.content)}
                      className="h-6 w-6"
                    />
                    <ChatBubbleAction
                      icon={<ThumbsUp className="w-4 h-4" />}
                      onClick={() => console.log("Thumbs up")}
                      className="h-6 w-6"
                    />
                    <ChatBubbleAction
                      icon={<ThumbsDown className="w-4 h-4" />}
                      onClick={() => console.log("Thumbs down")}
                      className="h-6 w-6"
                    />
                  </ChatBubbleActionWrapper>
                )}
              </ChatBubble>
            ))}

            {isLoading && messages[messages.length - 1]?.sender === "user" && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" className="bg-secondary" />
                <ChatBubbleMessage variant="received" isLoading={true}>
                  Thinking...
                </ChatBubbleMessage>
              </ChatBubble>
            )}
          </ChatMessageList>
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-border p-4 bg-background">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <ChatInput
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="min-h-[60px] max-h-32"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}

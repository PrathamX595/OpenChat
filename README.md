# AI ChatBot - OpenChat

A modern, responsive AI chatbot built with Next.js 15, React 19, and TypeScript. Chat with multiple AI models from OpenRouter with a beautiful, intuitive interface featuring markdown support, syntax highlighting, and smooth auto-scrolling.

![AI ChatBot Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black) ![React](https://img.shields.io/badge/React-19.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

- **Multiple AI Models**: Choose from 8 powerful AI models including Mistral, Gemma, DeepSeek, and Llama
- **Real-time Chat**: Instant responses with loading indicators and smooth animations
- **Markdown Support**: Full markdown rendering with syntax highlighting for code blocks
- **Mobile Friendly**: Optimized for all device sizes
- **Auto-scroll**: Smart scrolling that follows the conversation
- **Interactive Actions**: Copy messages, thumbs up/down feedback
- **Fast Performance**: Built with Next.js 15 and React 19
- **Secure**: Server-side API calls to protect your OpenRouter API key

## Available AI Models

- **Dolphin Mistral 24B** - Advanced reasoning and coding
- **Gemma 3N E2B/E4B** - Google's efficient language models
- **Mistral Small 3.2 24B** - Balanced performance and speed
- **DeepSeek R1 Qwen3 8B** - Specialized for complex reasoning
- **Microsoft MAI DS R1** - Microsoft's research model
- **Llama 4 Maverick** - Meta's latest Llama variant
- **Llama 3.1 Nemotron Ultra 253B** - NVIDIA's ultra-large model

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Frontend**: [React 19](https://react.dev/) with TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Provider**: [OpenRouter](https://openrouter.ai/)

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PrathamX595/OpenChat.git
   cd OpenChat
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   YOUR_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

##  Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts      # OpenRouter API integration
│   ├── layout.tsx             # Root layout
│   ├── page.tsx              # Main chat interface
│   └── globals.css           # Global styles
├── components/ui/
│   ├── chat/                 # Chat-specific components
│   │   ├── chat-bubble.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-message-list.tsx
│   │   ├── message-loading.tsx
│   │   └── hooks/
│   │       └── useAutoScroll.tsx
│   ├── avatar.tsx            # Avatar component
│   ├── button.tsx            # Button component
│   ├── select.tsx            # Select dropdown
│   └── textarea.tsx          # Textarea component
└── lib/
    └── utils.ts              # Utility functions
```

##  Configuration

### Environment Variables

| Variable             | Description                    | Required |
| -------------------- | ------------------------------ | -------- |
| `OPENROUTER_API_KEY` | Your OpenRouter API key        | ✅       |
| `YOUR_SITE_URL`      | Your site URL for API referrer | ✅       |

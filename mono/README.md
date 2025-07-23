# AI Girlfriend Chat Application - NextJS Frontend

A modern, responsive frontend for an AI girlfriend chat application built with Next.js, TypeScript, and Tailwind CSS. This frontend is designed to integrate seamlessly with a Python backend for AI-powered conversations.

## Features

- 🎭 **Multiple AI Personalities** - Choose from 6 unique AI companions, each with distinct personalities, traits, and conversation styles
- 💬 **Real-time Chat Interface** - Smooth, responsive chat experience with message history
- 🎨 **Beautiful UI** - Modern, clean design with dark mode support
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔌 **Python Backend Ready** - Easy integration with any Python-based AI backend
- ⚡ **Fast & Optimized** - Built with Next.js 14 and optimized for performance

## Character Showcase

The home page displays all available AI companions with:
- Character avatars and names
- Personality traits and interests
- Interactive trait meters (humor, intelligence, empathy, playfulness)
- Quick bio and conversation style preview

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Python 3.8+ (for the backend)
- npm or yarn package manager

### Frontend Setup

1. Clone the repository and navigate to the project:
```bash
cd mono
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the application

### Python Backend Setup (Example)

1. Install FastAPI and dependencies:
```bash
pip install fastapi uvicorn pydantic python-multipart
```

2. Run the example backend:
```bash
python example-python-backend.py
```

The example backend will start at [http://localhost:8000](http://localhost:8000)

## Python Backend Integration

Your Python backend should implement a `/chat` endpoint that accepts:

```json
{
  "message": "User's message",
  "character_id": "character-unique-id",
  "character_context": {
    "name": "Character name",
    "personality": ["trait1", "trait2"],
    "traits": {
      "humor": 7,
      "intelligence": 9,
      "empathy": 8,
      "playfulness": 6
    },
    "conversationStyle": "Description",
    "interests": ["interest1", "interest2"]
  },
  "conversation_history": [
    {
      "role": "user" | "assistant",
      "content": "message content"
    }
  ]
}
```

And return:
```json
{
  "response": "AI generated response"
}
```

See `PYTHON_BACKEND_INTEGRATION.md` for detailed integration guide and example implementation.

## Project Structure

```
mono/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with character showcase
│   ├── chat/[characterId] # Dynamic chat pages
│   └── api/chat          # API route for backend integration
├── components/            # React components
│   ├── character-card.tsx # Character display cards
│   └── chat-interface.tsx # Chat UI component
├── data/                  # Mock character data
├── types/                 # TypeScript type definitions
└── example-python-backend.py # Example Python backend
```

## Customization

### Adding New Characters

Edit `data/characters.ts` to add new AI companions:

```typescript
{
  id: 'unique-id',
  name: 'Character Name',
  age: 25,
  personality: ['Trait1', 'Trait2'],
  bio: 'Character description',
  avatar: '🎭',
  greeting: 'Initial greeting message',
  traits: {
    humor: 8,
    intelligence: 7,
    empathy: 9,
    playfulness: 6
  },
  conversationStyle: 'Description of conversation style',
  interests: ['Interest1', 'Interest2'],
  relationshipDynamic: 'caring'
}
```

### Styling

The app uses Tailwind CSS with a custom theme. Modify `app/globals.css` to change colors, fonts, or other styling aspects.

## Production Deployment

1. Update `PYTHON_BACKEND_URL` in your environment variables to point to your production Python backend

2. Build the application:
```bash
npm run build
```

3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Custom components with shadcn/ui inspiration
- **State Management**: React hooks
- **Backend Integration**: REST API with fetch

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or issues, please open an issue in the repository.

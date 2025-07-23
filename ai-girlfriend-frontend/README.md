# AI Girlfriend Chat Frontend

A modern, responsive NextJS frontend for an AI girlfriend chat application focused on character-based conversations.

## Features

- **Character Showcase**: Beautiful grid layout displaying AI characters with unique personalities
- **Interactive Character Cards**: Animated cards with personality traits and descriptions
- **Advanced Search & Filter**: Search by name, personality, or description with category filters
- **Real-time Chat Interface**: Smooth messaging experience with typing indicators
- **Streaming Responses**: Support for streaming AI responses for natural conversation flow
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Built-in dark mode for comfortable viewing

## Tech Stack

- **NextJS 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Axios**: HTTP client for API calls
- **Radix UI**: Accessible component primitives

## Project Structure

```
ai-girlfriend-frontend/
├── app/                    # NextJS app directory
│   ├── chat/              # Chat pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── CharacterCard.tsx  # Individual character display
│   ├── CharacterGrid.tsx  # Character grid with search
│   └── ChatInterface.tsx  # Chat messaging interface
├── lib/                   # Library code
│   └── api-client.ts      # API client utilities
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
├── utils/                 # Utility functions
│   └── cn.ts             # Class name utilities
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python backend running on `http://localhost:8000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-girlfriend-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Make sure your Python backend is running on `http://localhost:8000`

### Building for Production

```bash
npm run build
npm start
```

## API Integration

The frontend expects the following API endpoints from the Python backend:

### Character Endpoints
- `GET /api/characters` - Get all characters
- `GET /api/characters/:id` - Get character by ID
- `POST /api/characters` - Create new character
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Chat Endpoints
- `POST /api/chat/sessions` - Create new chat session
- `GET /api/chat/sessions/:id` - Get chat session
- `POST /api/chat/sessions/:id/messages` - Send message
- `POST /api/chat/sessions/:id/stream` - Stream message response

## Key Components

### CharacterCard
Displays individual character information with:
- Avatar image (uses DiceBear as fallback)
- Name and personality type
- Description and traits
- Interactive hover effects
- Online status indicator

### CharacterGrid
Main component for the homepage featuring:
- Search functionality
- Category filtering
- Responsive grid layout
- Empty state handling
- Smooth animations

### ChatInterface
Full-featured chat interface with:
- Message history display
- Real-time typing indicators
- Auto-scrolling to latest messages
- Responsive input field
- Character information header

## Customization

### Adding New Characters
Characters can be added through the Python backend API or by modifying the mock data in `app/page.tsx`.

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Component-specific styles use Tailwind utility classes

### API Configuration
Update `next.config.js` to modify API proxy settings for different backend URLs.

## Performance Optimizations

- Lazy loading of components
- Image optimization with Next.js Image component
- Efficient re-rendering with React hooks
- Debounced search functionality
- Streaming API responses for better UX

## Future Enhancements

- WebSocket support for real-time updates
- User authentication and profiles
- Chat history persistence
- Voice message support
- Character customization UI
- Multi-language support

## License

MIT License - feel free to use this project for your own purposes.

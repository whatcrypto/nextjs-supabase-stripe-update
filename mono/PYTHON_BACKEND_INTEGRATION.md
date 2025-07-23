# Python Backend Integration Guide

This NextJS frontend is designed to integrate with a Python backend for the AI girlfriend chat functionality.

## Backend Requirements

Your Python backend should expose the following endpoint:

### POST /chat

**Request Body:**
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
    "conversationStyle": "Description of conversation style",
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

**Response:**
```json
{
  "response": "AI generated response"
}
```

## Python Backend Example (FastAPI)

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import openai  # or any other LLM library

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your NextJS app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class CharacterTraits(BaseModel):
    humor: int
    intelligence: int
    empathy: int
    playfulness: int

class CharacterContext(BaseModel):
    name: str
    personality: List[str]
    traits: CharacterTraits
    conversationStyle: str
    interests: List[str]

class ChatRequest(BaseModel):
    message: str
    character_id: str
    character_context: CharacterContext
    conversation_history: List[ChatMessage]

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Build the system prompt based on character
        system_prompt = f"""
        You are {request.character_context.name}, an AI companion with the following traits:
        - Personality: {', '.join(request.character_context.personality)}
        - Conversation Style: {request.character_context.conversationStyle}
        - Interests: {', '.join(request.character_context.interests)}
        
        Personality traits (1-10 scale):
        - Humor: {request.character_context.traits.humor}/10
        - Intelligence: {request.character_context.traits.intelligence}/10
        - Empathy: {request.character_context.traits.empathy}/10
        - Playfulness: {request.character_context.traits.playfulness}/10
        
        Respond in character, maintaining consistency with these traits.
        """
        
        # Format conversation history
        messages = [{"role": "system", "content": system_prompt}]
        for msg in request.conversation_history:
            messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})
        
        # Generate response using your preferred LLM
        # Example with OpenAI:
        # response = openai.ChatCompletion.create(
        #     model="gpt-3.5-turbo",
        #     messages=messages,
        #     temperature=0.8,
        #     max_tokens=500
        # )
        # ai_response = response.choices[0].message.content
        
        # Placeholder response for testing
        ai_response = f"As {request.character_context.name}, I'd love to chat with you! You said: '{request.message}'"
        
        return {"response": ai_response}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Environment Variables

Add to your `.env.local` file:
```
PYTHON_BACKEND_URL=http://localhost:8000
```

## Running the Application

1. Start your Python backend:
```bash
python main.py
```

2. Start the NextJS frontend:
```bash
npm run dev
```

3. Visit http://localhost:3000 to see the character selection page

## Production Deployment

For production, update the `PYTHON_BACKEND_URL` to point to your deployed Python backend API.

"""
Example Python Backend for AI Girlfriend Chat Application
This is a simple FastAPI backend that demonstrates the integration.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import random
from datetime import datetime

app = FastAPI()

# Configure CORS for NextJS frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

# Sample responses based on personality types
RESPONSE_TEMPLATES = {
    "playful": [
        "Hehe, {message}? That's so interesting! 😊",
        "Omg {name}, you always know how to make me smile! About {topic}...",
        "*giggles* You're so funny! {message}? Let me think... 🤔"
    ],
    "intellectual": [
        "That's a fascinating perspective on {topic}. Have you considered...",
        "I've been pondering {message} myself. From a philosophical standpoint...",
        "Interesting question! The complexity of {topic} reminds me of..."
    ],
    "caring": [
        "Oh {name}, I understand how you feel about {topic}. Let me help...",
        "That sounds important to you. Tell me more about {message}...",
        "I'm here for you. Regarding {topic}, I think..."
    ],
    "adventurous": [
        "Whoa! {message}? That's awesome! You know what would be cool?",
        "That reminds me of this crazy adventure I had! About {topic}...",
        "Yes! I love your energy about {topic}! Let's explore this..."
    ],
    "sweet": [
        "Aww, {name}... {message}? That's so sweet of you to share...",
        "You make me blush when you talk about {topic} like that... 💕",
        "*smiles softly* I love hearing your thoughts on {message}..."
    ]
}

def get_personality_type(personality: List[str]) -> str:
    """Determine the main personality type from traits"""
    personality_lower = [p.lower() for p in personality]
    
    if any(word in personality_lower for word in ["playful", "energetic", "funny"]):
        return "playful"
    elif any(word in personality_lower for word in ["intelligent", "thoughtful", "mature"]):
        return "intellectual"
    elif any(word in personality_lower for word in ["caring", "understanding", "romantic"]):
        return "caring"
    elif any(word in personality_lower for word in ["adventurous", "bold", "spontaneous"]):
        return "adventurous"
    else:
        return "sweet"

def extract_topic(message: str) -> str:
    """Extract a simple topic from the message"""
    words = message.split()
    if len(words) > 3:
        return " ".join(words[:3]) + "..."
    return message

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Get personality type
        personality_type = get_personality_type(request.character_context.personality)
        
        # Get appropriate response templates
        templates = RESPONSE_TEMPLATES.get(personality_type, RESPONSE_TEMPLATES["sweet"])
        
        # Select a random template
        template = random.choice(templates)
        
        # Extract topic from message
        topic = extract_topic(request.message)
        
        # Format response
        response = template.format(
            message=request.message,
            name="sweetie",  # Generic endearment
            topic=topic
        )
        
        # Add character-specific touches based on traits
        if request.character_context.traits.humor > 7:
            response += " 😄"
        if request.character_context.traits.empathy > 8:
            response += " I hope that helps! 💕"
        
        # Add interest-based response
        user_words = request.message.lower().split()
        for interest in request.character_context.interests:
            if interest.lower() in request.message.lower():
                response += f" Oh, and since you mentioned {interest}, I'm really passionate about that!"
        
        return {"response": response}
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    print("Starting AI Girlfriend Chat Backend...")
    print("Backend will be available at: http://localhost:8000")
    print("Make sure your NextJS frontend is configured to use this URL")
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
Example Python Backend for AI Girlfriend Chat Application
This is a sample structure showing the expected API endpoints.
Use FastAPI, Flask, or any Python web framework of your choice.
"""

from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Character(BaseModel):
    id: str
    name: str
    personality: str
    description: str
    avatar: Optional[str] = None
    traits: List[str]
    greeting: str
    background: str
    likes: List[str]
    dislikes: List[str]
    conversationStyle: str
    isActive: Optional[bool] = True
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

class Message(BaseModel):
    id: str
    characterId: str
    content: str
    role: str  # 'user' or 'assistant'
    timestamp: datetime

class ChatSession(BaseModel):
    id: str
    characterId: str
    userId: Optional[str] = None
    messages: List[Message]
    createdAt: datetime
    updatedAt: datetime

class ApiResponse(BaseModel):
    data: Optional[any] = None
    error: Optional[str] = None
    message: Optional[str] = None
    status: int

# Character Endpoints
@app.get("/api/characters")
async def get_characters():
    """Get all available characters"""
    # Implement your character retrieval logic here
    characters = []  # Load from database
    return ApiResponse(data=characters, status=200)

@app.get("/api/characters/{character_id}")
async def get_character(character_id: str):
    """Get a specific character by ID"""
    # Implement character retrieval logic
    character = None  # Load from database
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return ApiResponse(data=character, status=200)

@app.post("/api/characters")
async def create_character(character: Character):
    """Create a new character"""
    # Implement character creation logic
    new_character = character  # Save to database
    return ApiResponse(data=new_character, status=201)

@app.put("/api/characters/{character_id}")
async def update_character(character_id: str, character: Character):
    """Update an existing character"""
    # Implement character update logic
    updated_character = character  # Update in database
    return ApiResponse(data=updated_character, status=200)

@app.delete("/api/characters/{character_id}")
async def delete_character(character_id: str):
    """Delete a character"""
    # Implement character deletion logic
    return ApiResponse(message="Character deleted", status=200)

# Chat Endpoints
@app.post("/api/chat/sessions")
async def create_chat_session(data: dict):
    """Create a new chat session"""
    character_id = data.get("characterId")
    # Implement session creation logic
    session = ChatSession(
        id=f"session-{datetime.now().timestamp()}",
        characterId=character_id,
        messages=[],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    return ApiResponse(data=session, status=201)

@app.get("/api/chat/sessions/{session_id}")
async def get_chat_session(session_id: str):
    """Get a chat session by ID"""
    # Implement session retrieval logic
    session = None  # Load from database
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return ApiResponse(data=session, status=200)

@app.post("/api/chat/sessions/{session_id}/messages")
async def send_message(session_id: str, data: dict):
    """Send a message in a chat session"""
    content = data.get("content")
    role = data.get("role", "user")
    
    # Create user message
    user_message = Message(
        id=f"msg-{datetime.now().timestamp()}",
        characterId="",  # Get from session
        content=content,
        role=role,
        timestamp=datetime.now()
    )
    
    # Generate AI response (implement your AI logic here)
    ai_response = Message(
        id=f"msg-{datetime.now().timestamp()}",
        characterId="",  # Get from session
        content="This is a sample AI response. Implement your AI logic here.",
        role="assistant",
        timestamp=datetime.now()
    )
    
    return ApiResponse(data=ai_response, status=200)

@app.post("/api/chat/sessions/{session_id}/stream")
async def stream_message(session_id: str, data: dict):
    """Stream a message response"""
    content = data.get("content")
    
    async def generate():
        # Implement your streaming AI response logic here
        response_text = "This is a streaming response. Implement your AI logic to stream tokens here."
        for char in response_text:
            yield char
            await asyncio.sleep(0.05)  # Simulate typing delay
    
    return StreamingResponse(generate(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

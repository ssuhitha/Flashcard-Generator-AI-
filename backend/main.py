from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class TextInput(BaseModel):
    text: str

@app.post("/generate-flashcards")
def generate_flashcards(input: TextInput):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are a flashcard generator. Given any text, generate exactly 6 flashcards.
Return ONLY a valid JSON array with no extra text, no markdown, no explanation.
Format:
[
  {"question": "question here", "answer": "answer here"},
  {"question": "question here", "answer": "answer here"}
]"""
            },
            {
                "role": "user",
                "content": f"Generate 6 flashcards from this text:\n\n{input.text}"
            }
        ]
    )
    raw = response.choices[0].message.content.strip()
    flashcards = json.loads(raw)
    return {"flashcards": flashcards}
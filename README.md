# ✨ AI Flashcard Generator

A full stack AI-powered flashcard generator built with React.js and Python FastAPI, using the Groq LLM API.

## 💙 Features
- Paste any notes or text and get 6 AI-generated flashcards instantly
- Beautiful popup card UI with flip animation
- Progress bar tracking your study session
- "Got it ✓" to mark cards done
- Celebration screen when all cards are completed
- Soft pastel blue aesthetic

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, CSS3
- **Backend:** Python, FastAPI, Uvicorn
- **AI:** Groq API (LLaMA 3.3 70B)

## 🚀 How to Run

### Backend
```bash
cd backend
pip install fastapi uvicorn groq python-dotenv
# Create a .env file and add: GROQ_API_KEY=your_key_here
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---
*by Suhitha K — part of my 30-Day AI Learning Challenge 💙*

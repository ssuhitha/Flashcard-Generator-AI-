import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setFlashcards([]);
    setError("");
    setFinished(false);
    setShowCard(false);
    try {
      const response = await fetch("http://localhost:8000/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setFlashcards(data.flashcards);
      setCurrent(0);
      setFlipped(false);
      setShowCard(true);
    } catch {
      setError("Error connecting to backend. Please try again.");
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (current + 1 >= flashcards.length) {
      setFinished(true);
      setShowCard(false);
    } else {
      setFlipped(false);
      setTimeout(() => setCurrent((p) => p + 1), 150);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setFlipped(false);
    setFinished(false);
    setShowCard(true);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <span className="tag">AI powered</span>
        <h1>Flashcard Generator</h1>
        <p className="subtitle">paste your notes — get study cards instantly</p>
      </div>

      {/* INPUT */}
      <div className="input-section">
        <label className="input-label">Your Notes</label>
        <textarea
          className="input-box"
          rows={6}
          
          placeholder="paste any lecture notes, paragraph, or topic here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="char-count">{text.length} characters</p>
        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? "generating ..." : "✨ generate flashcards"}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {/* POPUP OVERLAY */}
      {showCard && flashcards.length > 0 && (
        <div className="overlay" onClick={() => setShowCard(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>

            {/* Progress */}
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{ width: `${((current + 1) / flashcards.length) * 100}%` }}
              />
            </div>
            <p className="progress-text">
              card {current + 1} of {flashcards.length}
            </p>

            {/* Card */}
            <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
              <div className="card-inner">
                <div className="card-front">
                  <span className="card-label">Question 💭</span>
                  <p>{flashcards[current].question}</p>
                  <span className="hint">tap to reveal answer</span>
                </div>
                <div className="card-back">
                  <span className="card-label">Answer 💡</span>
                  <p>{flashcards[current].answer}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="popup-btns">
              <button className="skip-btn" onClick={handleNext}>
                skip →
              </button>
              <button className="gotit-btn" onClick={handleNext}>
                got it ✓
              </button>
            </div>

            <button className="close-btn" onClick={() => setShowCard(false)}>✕</button>
          </div>
        </div>
      )}

      {/* FINISHED */}
      {finished && (
        <div className="overlay" onClick={() => setFinished(false)}>
          <div className="popup finished-popup" onClick={(e) => e.stopPropagation()}>
            <p className="finished-emoji">🎉</p>
            <h2>you did it!</h2>
            <p className="finished-sub">all {flashcards.length} cards completed — you're amazing!</p>
            <button className="generate-btn" style={{ marginTop: "24px" }} onClick={handleRestart}>
              study again
            </button>
            <button className="close-btn" onClick={() => setFinished(false)}>✕</button>
          </div>
        </div>
      )}

      <p className="byline">by Suhitha K</p>
    </div>
  );
}

export default App;
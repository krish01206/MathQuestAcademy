import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ScoreCard({ score, totalQuestions, onRestart, badgesUnlocked = [] }) {
  const [confetti, setConfetti] = useState([]);
  const xpGained = score * 10;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Generate confetti items
  useEffect(() => {
    const colors = ["#6C5DD3", "#FF7551", "#3CD4A0", "#FFB156", "#2196F3", "#E91E63"];
    const pieces = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${Math.random() * 8 + 6}px`,
      duration: `${Math.random() * 2 + 2}s`,
    }));
    setConfetti(pieces);
  }, []);

  const getMascotMessage = () => {
    if (percentage === 100) return "🧙‍♂️ Amazing! A perfect score! You are a Math Wizard!";
    if (percentage >= 70) return "🧙‍♂️ Great job! Your brain muscles are growing fast!";
    if (percentage >= 40) return "🧙‍♂️ Nice effort! Practice makes perfect. Let's do it again!";
    return "🧙‍♂️ Keep practicing! Every mistake is a step closer to solving it!";
  };

  return (
    <div className="card-game p-4 p-md-5 text-center position-relative overflow-hidden">
      {/* Confetti Container */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 10
        }}
      >
        {confetti.map((c) => (
          <div
            key={c.id}
            className="confetti-piece"
            style={{
              left: c.left,
              animationDelay: c.delay,
              backgroundColor: c.color,
              width: c.size,
              height: c.size,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>

      <div className="mb-4">
        <span style={{ fontSize: "5rem" }}>🏆</span>
      </div>

      <h1 className="mb-3" style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--color-primary)" }}>
        Quest Completed!
      </h1>

      <div className="mascot-bubble mb-4" style={{ fontSize: "1.15rem", display: "inline-block", maxWidth: "90%" }}>
        {getMascotMessage()}
      </div>

      <div className="row justify-content-center my-4">
        <div className="col-6 col-sm-4 mb-3">
          <div className="p-3 border-game" style={{ background: "rgba(108, 93, 211, 0.05)", borderRadius: "20px", border: "2px solid" }}>
            <div className="text-muted fw-bold small">CORRECT</div>
            <div className="fs-2 fw-black text-primary">{score} / {totalQuestions}</div>
          </div>
        </div>
        <div className="col-6 col-sm-4 mb-3">
          <div className="p-3 border-game" style={{ background: "rgba(60, 212, 160, 0.05)", borderRadius: "20px", border: "2px solid", borderColor: "var(--color-success)" }}>
            <div className="text-muted fw-bold small">XP EARNED</div>
            <div className="fs-2 fw-black text-success">+{xpGained} XP</div>
          </div>
        </div>
      </div>

      {badgesUnlocked.length > 0 && (
        <div className="my-4 p-4" style={{ backgroundColor: "rgba(255, 177, 86, 0.08)", border: "3px dashed var(--color-warning)", borderRadius: "24px" }}>
          <h4 className="text-warning fw-black mb-3">🏆 Badges Unlocked!</h4>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {badgesUnlocked.map((badge) => (
              <div 
                key={badge} 
                className="badge-item unlocked" 
                style={{ width: "120px", padding: "0.8rem", boxShadow: "none" }}
              >
                <div className="badge-icon" style={{ fontSize: "2rem" }}>🥇</div>
                <div className="badge-title" style={{ fontSize: "0.85rem" }}>{badge}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
        <button onClick={onRestart} className="btn-game btn-game-primary px-4 py-3">
          🔄 Play Again
        </button>
        <Link to="/dashboard" className="btn-game btn-game-outline px-4 py-3">
          🏰 Quest Center
        </Link>
        <Link to="/leaderboard" className="btn-game btn-game-secondary px-4 py-3">
          🏆 Leaderboard
        </Link>
      </div>
    </div>
  );
}

export default ScoreCard;

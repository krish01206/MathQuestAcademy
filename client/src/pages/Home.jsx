import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container position-relative py-5 d-flex flex-column align-items-center justify-content-center min-vh-100 overflow-hidden">
      {/* Floating Math Symbols for Kid-friendly decoration */}
      <div className="floating-math" style={{ top: "15%", left: "10%", animationDelay: "0s" }}>➕</div>
      <div className="floating-math" style={{ top: "25%", right: "15%", animationDelay: "1s" }}>🔢</div>
      <div className="floating-math" style={{ bottom: "20%", left: "15%", animationDelay: "2s" }}>📐</div>
      <div className="floating-math" style={{ bottom: "15%", right: "12%", animationDelay: "3s" }}>🎓</div>
      <div className="floating-math" style={{ top: "45%", left: "80%", animationDelay: "1.5s" }}>✖️</div>
      <div className="floating-math" style={{ bottom: "50%", left: "5%", animationDelay: "2.5s" }}>❓</div>

      <div className="card-game p-4 p-md-5 text-center col-12 col-md-8 shadow-lg position-relative" style={{ zIndex: 2 }}>
        <div className="mb-4" style={{ fontSize: "5.5rem", animation: "float 6s ease-in-out infinite" }}>
          🧙‍♂️
        </div>
        
        <h1 className="mb-3" style={{ fontSize: "3.5rem", fontWeight: 900, color: "var(--color-primary)" }}>
          MathQuest Academy
        </h1>
        
        <p className="fs-4 text-muted mb-4 fw-bold" style={{ maxWidth: "550px", margin: "0 auto" }}>
          Unleash your inner math wizard! Solve fun puzzles, level up your grade, earn golden badges, and climb the leaderboard!
        </p>

        <div className="mascot-container text-start mb-4 justify-content-center">
          <span className="mascot-face">🤖</span>
          <div className="mascot-bubble" style={{ fontSize: "1.05rem" }}>
            "Welcome, Young Scholar! Select your quest below and let the math adventure begin!"
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mt-4">
          <Link to="/login" className="btn-game btn-game-primary px-5 py-3 fs-5">
            🔑 Enter Portal (Login)
          </Link>
          <Link to="/register" className="btn-game btn-game-secondary px-5 py-3 fs-5">
            ⚔️ Register Quest (Sign Up)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
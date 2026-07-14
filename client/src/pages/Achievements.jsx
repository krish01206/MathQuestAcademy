import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Achievements() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>Please log in to view achievements.</h3>
      </div>
    );
  }

  // Predefined list of standard badges in MathQuest Academy
  const badgesList = [
    { title: "Bronze Star", icon: "⭐", desc: "Unlock by accumulating 100 XP in your quests.", xpNeeded: 100 },
    { title: "Silver Star", icon: "🥈", desc: "Unlock by accumulating 300 XP in your quests.", xpNeeded: 300 },
    { title: "Gold Star", icon: "🏆", desc: "Unlock by accumulating 500 XP in your quests.", xpNeeded: 500 },
    { title: "Math Pioneer", icon: "🚀", desc: "Start strong! Unlocks at 50 XP.", xpNeeded: 50 },
    { title: "Grand Master", icon: "👑", desc: "Attain legendary scholar status by reaching 1000 XP.", xpNeeded: 1000 },
    { title: "Centurion", icon: "💯", desc: "Attain a massive 100 XP score milestone.", xpNeeded: 100 }
  ];

  const userBadges = user.badges || [];

  return (
    <div className="container py-5">
      <div className="card-game p-4 p-md-5 col-12 col-lg-10 mx-auto">
        <div className="text-center mb-4">
          <span style={{ fontSize: "5rem" }}>🏅</span>
          <h2 className="fw-black text-primary" style={{ fontSize: "2.5rem" }}>Badge Showcase</h2>
          <p className="text-muted fw-bold">Display your achievements and progress toward becoming a Math Grandmaster!</p>
        </div>

        {/* User stats summary */}
        <div className="p-4 mb-4 text-center" style={{ backgroundColor: "rgba(108, 93, 211, 0.05)", border: "2px solid var(--border-game)", borderRadius: "24px" }}>
          <h4 className="fw-bold mb-2">Total Wealth of Knowledge</h4>
          <div className="fs-1 fw-black text-warning">{user.xp} XP Points</div>
          <p className="text-muted fw-bold mb-0 mt-1">Unlocked {userBadges.length} out of {badgesList.length} badges available</p>
        </div>

        {/* Achievements Grid */}
        <div className="row mt-4">
          {badgesList.map((badge) => {
            // User has unlocked it if they either have the string in their badges list OR their XP exceeds the requirement
            const isUnlocked = userBadges.includes(badge.title) || user.xp >= badge.xpNeeded;

            return (
              <div key={badge.title} className="col-12 col-sm-6 col-md-4 mb-4">
                <div 
                  className={`card h-100 p-3 text-center border-game transition-bounce`}
                  style={{
                    borderRadius: "24px",
                    border: "3px solid",
                    borderColor: isUnlocked ? "var(--color-warning)" : "var(--border-game)",
                    background: isUnlocked 
                      ? "linear-gradient(145deg, var(--bg-card), rgba(255, 177, 86, 0.05))" 
                      : "var(--bg-game)",
                    boxShadow: isUnlocked ? "var(--shadow-md)" : "none",
                    opacity: isUnlocked ? 1 : 0.6,
                    transform: isUnlocked ? "translateY(-3px)" : "none",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div 
                    style={{ 
                      fontSize: "3.5rem", 
                      marginBottom: "0.5rem",
                      filter: isUnlocked ? "none" : "grayscale(100%)" 
                    }}
                  >
                    {badge.icon}
                  </div>

                  <h4 className="fw-black text-dark mb-2" style={{ fontSize: "1.2rem" }}>
                    {badge.title} {isUnlocked ? "✅" : "🔒"}
                  </h4>
                  
                  <p className="text-muted small fw-bold mb-2" style={{ minHeight: "40px" }}>
                    {badge.desc}
                  </p>

                  <div className="mt-auto">
                    {isUnlocked ? (
                      <span className="badge bg-success px-3 py-2 fw-bold" style={{ borderRadius: "10px" }}>Unlocked</span>
                    ) : (
                      <span className="badge bg-secondary px-3 py-2 fw-bold" style={{ borderRadius: "10px" }}>Requires {badge.xpNeeded} XP</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4 pt-3 border-top border-game flex-wrap">
          <Link to="/dashboard" className="btn-game btn-game-primary px-4 py-2">
            🏰 Return to Quest Center
          </Link>
          <Link to="/leaderboard" className="btn-game btn-game-secondary px-4 py-2">
            🏆 Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
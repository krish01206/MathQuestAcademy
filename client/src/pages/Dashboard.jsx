import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // List of all achievements/badges in the game
  const allBadges = [
    { title: "Bronze Star", icon: "⭐", desc: "Reach 100 XP", xpNeeded: 100 },
    { title: "Silver Star", icon: "🥈", desc: "Reach 300 XP", xpNeeded: 300 },
    { title: "Gold Star", icon: "🏆", desc: "Reach 500 XP", xpNeeded: 500 },
    { title: "Math Pioneer", icon: "🚀", desc: "Earn at least 50 XP", xpNeeded: 50 },
    { title: "Grand Master", icon: "👑", desc: "Reach 1000 XP", xpNeeded: 1000 }
  ];

  const userBadgesList = user.badges || [];
  
  // Dynamic mascot message depending on XP level
  const getMascotMessage = () => {
    if (user.xp >= 1000) return `🧙‍♂️ "Incredible, ${user.name}! You have attained Grand Master status! The kingdom of math is yours!"`;
    if (user.xp >= 500) return `🧙‍♂️ "Sensational work! You have earned the Gold Star badge. Ready to seek more math treasure?"`;
    if (user.xp >= 100) return `🧙‍♂️ "Well done, young scholar! You've unlocked badges and gained serious XP. Let's do another quest!"`;
    return `🧙‍♂️ "Hello, ${user.name}! Welcome to the Academy. Solve quests to earn XP and unlock your very first badge, the Bronze Star!"`;
  };

  return (
    <div className="container py-5">
      <div className="row">
        
        {/* Left Column: Mascot & User Stats Card */}
        <div className="col-12 col-lg-8 mb-4">
          <div className="card-game mb-4">
            <h2 className="fw-black mb-4 text-primary">🧙‍♂️ Academy Dashboard</h2>
            
            {/* Mascot interaction */}
            <div className="mascot-container mb-4">
              <div className="mascot-face">🧙‍♂️</div>
              <div className="mascot-bubble">
                {getMascotMessage()}
              </div>
            </div>

            {/* Profile XP Info */}
            <div className="p-4 mb-4" style={{ backgroundColor: "rgba(108, 93, 211, 0.05)", border: "2px solid var(--border-game)", borderRadius: "24px" }}>
              <div className="row text-center align-items-center">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <span style={{ fontSize: "3rem" }}>{user.role === "admin" ? "🧙‍♂️" : "🎒"}</span>
                  <div className="fw-black mt-2 fs-5" style={{ color: "var(--text-main)" }}>{user.name}</div>
                  <span className={`badge px-3 py-2 mt-1 ${user.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                    {user.role === "admin" ? "Admin Role" : "Student Role"}
                  </span>
                </div>
                
                <div className="col-6 col-md-4 mb-3 mb-md-0 border-start border-end border-game">
                  <div className="text-muted fw-bold small uppercase">ACADEMY GRADE</div>
                  <div className="fs-1 fw-black text-primary">Grade {user.grade}</div>
                </div>
                
                <div className="col-6 col-md-4">
                  <div className="text-muted fw-bold small uppercase">TOTAL XP</div>
                  <div className="fs-1 fw-black text-warning">{user.xp} XP</div>
                </div>
              </div>
            </div>

            {/* Interactive Adventure Map */}
            <h4 className="fw-black text-primary mb-3">🗺️ Quest Map (Grade Select)</h4>
            <p className="text-muted fw-bold mb-3">Click on any grade portal node to launch a math quiz journey for that grade level!</p>
            
            <div className="grade-pathway mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => {
                const isCurrentGrade = user.grade === g;
                let nodeClass = "grade-node";
                if (isCurrentGrade) nodeClass += " current";
                
                return (
                  <Link 
                    key={g} 
                    to={`/quiz?grade=${g}`} 
                    className={nodeClass}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>🧭</span>
                    <span>Grade {g}</span>
                    {isCurrentGrade && (
                      <span className="badge bg-success" style={{ fontSize: "0.7rem", marginTop: "2px" }}>Active</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-5">
              <Link to={`/quiz?grade=${user.grade}`} className="btn-game btn-game-primary px-5 py-3 fs-5 w-100 shadow-md">
                ⚔️ Begin Current Grade Quest!
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Badges shelf */}
        <div className="col-12 col-lg-4 mb-4">
          <div className="card-game h-100">
            <h3 className="fw-black mb-3 text-primary">🏅 Badge Case</h3>
            <p className="text-muted fw-bold mb-4">Solve quests to earn achievements and display them here!</p>
            
            <div className="d-flex flex-column gap-3">
              {allBadges.map((badge) => {
                const hasEarned = userBadgesList.includes(badge.title) || user.xp >= badge.xpNeeded;
                
                return (
                  <div 
                    key={badge.title}
                    className="p-3 d-flex align-items-center gap-3 border-game" 
                    style={{ 
                      borderRadius: "18px", 
                      border: "2px solid",
                      backgroundColor: hasEarned ? "rgba(255, 177, 86, 0.05)" : "var(--bg-game)",
                      borderColor: hasEarned ? "var(--color-warning)" : "var(--border-game)",
                      opacity: hasEarned ? 1 : 0.6
                    }}
                  >
                    <span style={{ fontSize: "2.5rem", filter: hasEarned ? "none" : "grayscale(100%)" }}>
                      {badge.icon}
                    </span>
                    <div>
                      <div className="fw-black text-dark" style={{ fontSize: "1.05rem" }}>
                        {badge.title} {hasEarned ? "✅" : "🔒"}
                      </div>
                      <div className="text-muted fw-bold small">{badge.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 text-center border-top border-game">
              <Link to="/leaderboard" className="btn-game btn-game-secondary w-100 py-3">
                🏆 View Leaderboard
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
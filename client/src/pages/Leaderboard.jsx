import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        "/api/scores/leaderboard"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      alert("Failed to load leaderboard database.");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on selected grade
  const filteredUsers = users.filter((u) => {
    if (gradeFilter === "all") return true;
    return u.grade === Number(gradeFilter);
  });

  // Extract Top 3 for the podium
  const top1 = filteredUsers[0];
  const top2 = filteredUsers[1];
  const top3 = filteredUsers[2];
  
  // Remaining users list
  const listUsers = filteredUsers.slice(3);

  return (
    <div className="container py-5">
      <div className="card-game p-4 p-md-5 col-12 col-lg-10 mx-auto">
        <div className="text-center mb-4">
          <span style={{ fontSize: "4.5rem" }}>🏆</span>
          <h2 className="fw-black text-primary" style={{ fontSize: "2.5rem" }}>Hall of Wizards</h2>
          <p className="text-muted fw-bold">See who the top scholars are in MathQuest Academy!</p>
        </div>

        {/* Grade Filter Bar */}
        <div className="d-flex justify-content-center align-items-center mb-4 gap-3 flex-wrap">
          <label className="fw-black text-dark mb-0">🔍 Filter by Grade:</label>
          <select
            className="input-game"
            style={{ width: "160px", padding: "0.5rem 1rem", height: "auto" }}
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="all">All Grades</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3 text-muted">Consulting the magic mirrors...</h4>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-5 border-game" style={{ borderRadius: "20px", background: "var(--bg-game)" }}>
            <span style={{ fontSize: "3rem" }}>🏜️</span>
            <h4 className="text-muted fw-bold mt-2">No wizard scores found in this filter.</h4>
            <p className="text-muted small">Be the first to complete a quiz in Grade {gradeFilter}!</p>
          </div>
        ) : (
          <>
            {/* Podium Visuals */}
            <div className="podium-container">
              {top2 && (
                <div className="podium-column">
                  <div className="podium-avatar">🥈</div>
                  <div className="podium-block podium-second">
                    <div style={{ fontSize: "1.2rem", fontWeight: 900 }}>2nd</div>
                    <div className="small text-truncate fw-bold w-100 text-center" style={{ maxWidth: "120px" }}>{top2.name}</div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>{top2.xp} XP</div>
                  </div>
                </div>
              )}

              {top1 && (
                <div className="podium-column">
                  <div className="podium-avatar">👑</div>
                  <div className="podium-block podium-first">
                    <div style={{ fontSize: "1.5rem", fontWeight: 900 }}>1st</div>
                    <div className="small text-truncate fw-bold w-100 text-center" style={{ maxWidth: "120px" }}>{top1.name}</div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>{top1.xp} XP</div>
                  </div>
                </div>
              )}

              {top3 && (
                <div className="podium-column">
                  <div className="podium-avatar">🥉</div>
                  <div className="podium-block podium-third">
                    <div style={{ fontSize: "1.1rem", fontWeight: 900 }}>3rd</div>
                    <div className="small text-truncate fw-bold w-100 text-center" style={{ maxWidth: "120px" }}>{top3.name}</div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>{top3.xp} XP</div>
                  </div>
                </div>
              )}
            </div>

            {/* List for the rest of leaderboard */}
            <div className="table-responsive mt-4">
              <table className="table align-middle" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
                <thead>
                  <tr className="text-muted fw-bold">
                    <th className="px-4">Rank</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>XP Score</th>
                    <th>Unlocked Badges</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map top 3 back into table lists first so they are listed, then lists the rest */}
                  {filteredUsers.map((user, index) => {
                    let rankBg = "var(--bg-game)";
                    let badgeStyles = {};
                    
                    if (index === 0) {
                      rankBg = "rgba(255, 177, 86, 0.15)";
                      badgeStyles = { border: "2px solid var(--color-warning)" };
                    } else if (index === 1) {
                      rankBg = "rgba(144, 164, 174, 0.15)";
                    } else if (index === 2) {
                      rankBg = "rgba(255, 167, 38, 0.15)";
                    }

                    return (
                      <tr 
                        key={user._id} 
                        style={{ 
                          backgroundColor: rankBg, 
                          borderRadius: "16px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
                        }}
                      >
                        <td className="px-4 py-3 fw-black" style={{ borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px", fontSize: "1.15rem", width: "80px" }}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </td>
                        <td className="fw-black text-dark">{user.name}</td>
                        <td className="fw-bold text-muted">Grade {user.grade}</td>
                        <td className="fw-black text-primary">{user.xp} XP</td>
                        <td className="py-3" style={{ borderTopRightRadius: "16px", borderBottomRightRadius: "16px" }}>
                          <div className="d-flex gap-2 flex-wrap">
                            {user.badges && user.badges.length > 0 ? (
                              user.badges.map((b) => (
                                <span 
                                  key={b} 
                                  className="badge bg-warning text-dark fw-bold" 
                                  style={{ borderRadius: "8px", fontSize: "0.75rem", ...badgeStyles }}
                                >
                                  🏆 {b}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted small fw-bold">No badges yet</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="text-center mt-4 pt-3 border-top border-game">
          <Link to="/dashboard" className="btn-game btn-game-outline px-4 py-2">
            🏰 Return to Quest Center
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
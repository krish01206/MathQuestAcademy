import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states for creating a new question
  const [question, setQuestion] = useState("");
  const [grade, setGrade] = useState(1);
  const [level, setLevel] = useState("easy");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [correctOptIndex, setCorrectOptIndex] = useState(0); // 0 = Opt1, 1 = Opt2, etc.
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admin portal only.");
      navigate("/dashboard");
      return;
    }
    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        "/api/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      alert("Failed to load admin analytics.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setFormSubmitting(true);

    const options = [opt1.trim(), opt2.trim(), opt3.trim(), opt4.trim()];
    const answer = options[correctOptIndex];

    if (options.some(opt => opt === "")) {
      alert("Please fill in all 4 answer options!");
      setFormSubmitting(false);
      return;
    }

    try {
      await api.post(
        "/api/questions",
        {
          question: question.trim(),
          options,
          answer,
          grade,
          level
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setSuccessMessage("🎉 Question successfully seeded into Academy database!");
      
      // Reset form
      setQuestion("");
      setOpt1("");
      setOpt2("");
      setOpt3("");
      setOpt4("");
      setCorrectOptIndex(0);

      // Refresh analytics metrics
      fetchAnalytics();
    } catch (error) {
      console.error("Error creating question:", error);
      alert(error.response?.data?.message || "Failed to add question.");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3 text-muted">Securing admin analytics gateways...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card-game p-4 p-md-5 col-12 col-xl-11 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-5">
          <span style={{ fontSize: "5rem" }}>🛡️</span>
          <h2 className="fw-black text-danger mb-2" style={{ fontSize: "2.5rem" }}>Grand Arch-mage Panel</h2>
          <p className="text-muted fw-bold">System management, academy analytics, and math scroll editing.</p>
        </div>

        {/* Top Section: Analytics Metrics Cards */}
        {data && (
          <div className="row mb-5">
            <div className="col-12 col-md-4 mb-3">
              <div className="p-4 border-game text-center" style={{ backgroundColor: "rgba(108, 93, 211, 0.05)", borderRadius: "24px", border: "2px solid" }}>
                <span style={{ fontSize: "2.5rem" }}>👥</span>
                <div className="text-muted fw-bold small mt-2 uppercase">TOTAL STUDENTS</div>
                <div className="fs-2 fw-black text-primary">{data.totalStudents}</div>
              </div>
            </div>
            
            <div className="col-12 col-md-4 mb-3">
              <div className="p-4 border-game text-center" style={{ backgroundColor: "rgba(60, 212, 160, 0.05)", borderRadius: "24px", border: "2px solid", borderColor: "var(--color-success)" }}>
                <span style={{ fontSize: "2.5rem" }}>📚</span>
                <div className="text-muted fw-bold small mt-2 uppercase">TOTAL QUESTIONS</div>
                <div className="fs-2 fw-black text-success">{data.totalQuestions}</div>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
              <div className="p-4 border-game text-center" style={{ backgroundColor: "rgba(255, 117, 81, 0.05)", borderRadius: "24px", border: "2px solid", borderColor: "var(--color-secondary)" }}>
                <span style={{ fontSize: "2.5rem" }}>⚔️</span>
                <div className="text-muted fw-bold small mt-2 uppercase">QUEST ATTEMPTS</div>
                <div className="fs-2 fw-black text-warning">{data.totalAttempts}</div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          
          {/* Left Side: Create Question Form */}
          <div className="col-12 col-lg-7 mb-4">
            <div className="p-4 border-game h-100" style={{ borderRadius: "24px", background: "var(--bg-game)" }}>
              <h4 className="fw-black text-dark mb-3">✍️ Add Question to Curriculum</h4>
              <p className="text-muted fw-bold small mb-4">Enter the mathematical problem details and options below to update the quiz registry.</p>
              
              {successMessage && (
                <div className="alert alert-success fw-bold text-center mb-4" style={{ borderRadius: "16px" }}>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleAddQuestion}>
                <div className="mb-3">
                  <label className="fw-bold mb-2">Problem Statement</label>
                  <input
                    type="text"
                    className="input-game bg-white"
                    placeholder="e.g. What is the value of 8 x 9?"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="fw-bold mb-2">Grade Level</label>
                    <select
                      className="input-game bg-white"
                      value={grade}
                      onChange={(e) => setGrade(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                        <option key={g} value={g}>Grade {g}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-6">
                    <label className="fw-bold mb-2">Difficulty</label>
                    <select
                      className="input-game bg-white"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <label className="fw-bold mb-2">Answer Choices (Fill all 4)</label>
                <div className="row mb-3">
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      className="input-game bg-white"
                      placeholder="Option 1"
                      required
                      value={opt1}
                      onChange={(e) => setOpt1(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      className="input-game bg-white"
                      placeholder="Option 2"
                      required
                      value={opt2}
                      onChange={(e) => setOpt2(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      className="input-game bg-white"
                      placeholder="Option 3"
                      required
                      value={opt3}
                      onChange={(e) => setOpt3(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="text"
                      className="input-game bg-white"
                      placeholder="Option 4"
                      required
                      value={opt4}
                      onChange={(e) => setOpt4(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="fw-bold mb-2">Select Correct Answer</label>
                  <select
                    className="input-game bg-white"
                    value={correctOptIndex}
                    onChange={(e) => setCorrectOptIndex(Number(e.target.value))}
                  >
                    <option value={0}>Option 1: "{opt1 || 'Empty'}"</option>
                    <option value={1}>Option 2: "{opt2 || 'Empty'}"</option>
                    <option value={2}>Option 3: "{opt3 || 'Empty'}"</option>
                    <option value={3}>Option 4: "{opt4 || 'Empty'}"</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-game btn-game-primary w-100 py-3"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? "⚡ Seeding Problem..." : "➕ Add Question to Curriculum"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Top Scholars List */}
          <div className="col-12 col-lg-5 mb-4">
            <div className="p-4 border-game h-100" style={{ borderRadius: "24px", background: "var(--bg-game)" }}>
              <h4 className="fw-black text-dark mb-3">🏆 Top Scholars Registry</h4>
              <p className="text-muted fw-bold small mb-4">Active student leaderboard ranks monitored by system administrators.</p>

              {data && data.topStudents && (
                <div className="d-flex flex-column gap-3">
                  {data.topStudents.map((student, idx) => (
                    <div 
                      key={student._id}
                      className="p-3 bg-white border-game d-flex justify-content-between align-items-center"
                      style={{ borderRadius: "18px" }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-black text-muted" style={{ fontSize: "1.1rem" }}>
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                        </span>
                        <div>
                          <div className="fw-black text-dark">{student.name}</div>
                          <div className="text-muted small fw-bold">ID: {student._id.slice(-6)}</div>
                        </div>
                      </div>
                      <div className="fw-black text-warning">{student.xp} XP</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="text-center mt-5 pt-3 border-top border-game">
          <Link to="/dashboard" className="btn-game btn-game-outline px-4 py-2 me-2">
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

export default AdminDashboard;
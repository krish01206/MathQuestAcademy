import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import QuestionCard from "../components/QuestionCard";
import ScoreCard from "../components/ScoreCard";

function Quiz() {
  const { user, setUser } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get grade from URL query param, default to user's grade
  const gradeQuery = searchParams.get("grade");
  const selectedGrade = gradeQuery ? Number(gradeQuery) : (user?.grade || 1);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [badgesUnlocked, setBadgesUnlocked] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchQuestions();
  }, [selectedGrade, user, navigate]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/api/questions/${selectedGrade}`
      );
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Could not load math questions. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelected = (option) => {
    setSelectedAnswer(option);
    const correctAns = questions[currentIdx].answer;
    const isAnsCorrect = option === correctAns;
    setIsCorrect(isAnsCorrect);
    
    if (isAnsCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(false);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    try {
      // Post score to the server
      await api.post(
        "/api/scores/submit",
        { score },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Fetch the updated user profile from backend (to sync new XP and Badges)
      const profileRes = await api.get(
        "/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Identify if any new badges were unlocked
      const oldBadges = user.badges || [];
      const newBadges = profileRes.data.badges || [];
      const newlyEarned = newBadges.filter(b => !oldBadges.includes(b));
      setBadgesUnlocked(newlyEarned);

      // Update AuthContext user state
      const updatedUser = {
        ...user,
        xp: profileRes.data.xp,
        badges: profileRes.data.badges,
      };
      
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Failed to submit score to the server. Playing offline.");
      setIsCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setIsCompleted(false);
    setBadgesUnlocked([]);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3 text-muted fw-bold">🧙‍♂️ Finding math scrolls for Grade {selectedGrade}...</h3>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card-game p-5">
          <span style={{ fontSize: "4rem" }}>🧭</span>
          <h2 className="mt-3 text-primary fw-black">Quest Unavailable</h2>
          <p className="text-muted fw-bold mb-4">No math questions are currently seeded for Grade {selectedGrade} yet.</p>
          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="btn-game btn-game-primary px-4 py-2 me-2">
              ➕ Add Questions
            </Link>
          )}
          <Link to="/dashboard" className="btn-game btn-game-outline px-4 py-2">
            🏰 Quest Center
          </Link>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="container py-5 col-12 col-md-8">
        <ScoreCard
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          badgesUnlocked={badgesUnlocked}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx) / questions.length) * 100);

  return (
    <div className="container py-5 col-12 col-md-8">
      {/* Quiz Header & Progress Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/dashboard" className="btn-game btn-game-outline py-2 px-3 fw-bold" style={{ fontSize: "0.9rem" }}>
          ⬅️ Exit Quest
        </Link>
        <span className="fw-black text-primary" style={{ fontSize: "1.1rem" }}>
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="quiz-progress-container mb-4">
        <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <QuestionCard
        questionData={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        disabled={selectedAnswer !== null}
      />

      {/* Control button */}
      {selectedAnswer && (
        <div className="text-center mt-4">
          <button 
            onClick={handleNext} 
            className="btn-game btn-game-success px-5 py-3 fs-5"
            disabled={submitting}
          >
            {submitting ? "⚡ Saving Quest..." : currentIdx + 1 === questions.length ? "🏁 Complete Quest!" : "➡️ Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
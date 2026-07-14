import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-game sticky-top">
      <div className="container-fluid">
        <Link to={user ? "/dashboard" : "/"} className="brand-game">
          <span>🧠</span> MathQuest Academy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "none", outline: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 align-items-center">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link fw-bold text-dark px-3">
                    🏰 Quest Center
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link fw-bold text-dark px-3">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/achievements" className="nav-link fw-bold text-dark px-3">
                    🏅 Achievements
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link fw-bold text-danger px-3">
                      🛡️ Admin Analytics
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {user ? (
              <>
                <div className="stat-chip">
                  <span>🎓</span> Grade {user.grade}
                </div>
                <div className="stat-chip" style={{ borderColor: "var(--color-warning)" }}>
                  <span>⭐</span> {user.xp} XP
                </div>
                <div className="stat-chip" style={{ borderColor: "var(--color-primary)" }}>
                  <span>👤</span> {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm fw-bold px-3 py-2"
                  style={{ borderRadius: "12px", border: "2px solid" }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-game btn-game-outline px-4 py-2" style={{ fontSize: "0.95rem" }}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-game btn-game-primary px-4 py-2" style={{ fontSize: "0.95rem" }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

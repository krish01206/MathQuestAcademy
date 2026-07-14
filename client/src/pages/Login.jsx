import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100">
      <div className="card-game col-12 col-md-6 p-4 p-md-5">
        <div className="text-center mb-4">
          <span style={{ fontSize: "4rem" }}>🧙‍♂️</span>
          <h2 className="mt-2 fw-black text-primary" style={{ fontSize: "2rem" }}>Portal Login</h2>
          <p className="text-muted fw-bold">Sign back in to continue your adventure!</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="form-label fw-bold text-dark mb-2">Email Address</label>
            <input
              type="email"
              className="input-game"
              placeholder="e.g. wizard@mathquest.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold text-dark mb-2">Secret Password</label>
            <input
              type="password"
              className="input-game"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-game btn-game-primary w-100 py-3 mt-2"
            disabled={loading}
          >
            {loading ? "⚡ Entering..." : "🔑 Enter Portal"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted fw-bold">
            New to the Academy?{" "}
            <Link to="/register" className="text-primary text-decoration-none fw-black">
              Create a Character
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
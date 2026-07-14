import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    grade: 1,
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "grade"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(
        "/api/auth/register",
        form
      );

      alert("Character registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100">
      <div className="card-game col-12 col-md-7 p-4 p-md-5">
        <div className="text-center mb-4">
          <span style={{ fontSize: "4rem" }}>⚔️</span>
          <h2 className="mt-2 fw-black text-primary" style={{ fontSize: "2rem" }}>Create Character</h2>
          <p className="text-muted fw-bold">Register your student account to join the Academy!</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold text-dark mb-2">Character Name</label>
              <input
                type="text"
                name="name"
                className="input-game"
                placeholder="e.g. MathMaster99"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="col-12 col-md-6 mb-3">
              <label className="form-label fw-bold text-dark mb-2">Academic Grade</label>
              <select
                name="grade"
                className="input-game"
                required
                value={form.grade}
                onChange={handleChange}
                style={{ appearance: "auto" }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-dark mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="input-game"
              placeholder="e.g. hero@academy.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold text-dark mb-2">Secret Password</label>
            <input
              type="password"
              name="password"
              className="input-game"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="btn-game btn-game-success w-100 py-3 mt-2"
            disabled={loading}
          >
            {loading ? "⚡ Registering..." : "⚔️ Register Quest Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted fw-bold">
            Already have a Character?{" "}
            <Link to="/login" className="text-primary text-decoration-none fw-black">
              Portal Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
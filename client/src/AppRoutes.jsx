import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import AdminDashboard from "./pages/AdminDashboard";
import Achievements from "./pages/Achievements";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      <Route path="/achievements" element={<Achievements />} />
    </Routes>
  );
}

export default AppRoutes;
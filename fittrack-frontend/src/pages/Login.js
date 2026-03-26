import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter all fields");

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message;

      if (status === 401 || status === 403) {
        alert(message || "Invalid credentials");
      } else {
        alert("Login Failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 font-sans">
      
      <div className="bg-slate-900 p-8 rounded-2xl w-96 shadow-xl space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold text-orange-500">
            FitTrack
          </h1>
          <p className="text-gray-400 text-sm">
            Welcome back 👋
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-slate-800 rounded outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-slate-800 rounded outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 py-3 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">
          OR
        </div>

        {/* Register */}
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-slate-800 py-3 rounded hover:bg-slate-700 transition"
        >
          Create an account
        </button>

      </div>
    </div>
  );
}

export default Login;
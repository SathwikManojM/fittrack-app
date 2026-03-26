import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) return alert("Enter all fields");

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();

      await API.post("/api/auth/register", {
        email: normalizedEmail,
        password: password.trim(),
      });

      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message;

      alert(message || "Registration Failed ❌");
      console.error("Registration error", message);
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
            Create your account 🚀
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

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 py-3 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">
          Already have an account?
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-slate-800 py-3 rounded hover:bg-slate-700 transition"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Register;
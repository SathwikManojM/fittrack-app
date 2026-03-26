import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Goal from "./pages/Goal";
import Profile from "./pages/Profile";
import Coach from "./pages/Coach"; 
import Admin from "./pages/Admin";

// 🔐 PROTECTED ROUTE
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/meals"
        element={
          <PrivateRoute>
            <Meals />
          </PrivateRoute>
        }
      />

      <Route
        path="/workouts"
        element={
          <PrivateRoute>
            <Workouts />
          </PrivateRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        }
      />

      <Route
        path="/goal/:type"
        element={
          <PrivateRoute>
            <Goal />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* 🔥 AI COACH ROUTE (FIXED) */}
      <Route
        path="/coach"
        element={
          <PrivateRoute>
            <Coach />
          </PrivateRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
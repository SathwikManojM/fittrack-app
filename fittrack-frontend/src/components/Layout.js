import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState("User");

  const [notifications, setNotifications] = useState([
    "🔥 Workout streak 5 days!",
    "🍗 Hit protein goal yesterday",
  ]);

  // 🔥 FIX: GET USER NAME FROM BACKEND
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/api/profile");

      if (res.data?.name) {
        setUserName(res.data.name);
        localStorage.setItem("name", res.data.name); // optional
      } else {
        setUserName("User");
      }

    } catch (err) {
      // fallback
      const name = localStorage.getItem("name");
      if (name) setUserName(name);
      else setUserName("User");
    }
  };

  const navItem = (path, label) => (
    <button
      onClick={() => navigate(path)}
      className={`text-left ${
        location.pathname === path
          ? "text-orange-500"
          : "text-gray-300 hover:text-orange-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 p-6 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-orange-500 mb-10">FitTrack</h1>

          <div className="flex flex-col space-y-6">
            {navItem("/dashboard", "Dashboard")}
            {navItem("/meals", "Meals")}
            {navItem("/workouts", "Workouts")}
            {navItem("/progress", "Progress")}
            {navItem("/profile", "Profile")}
            {navItem("/coach", "AI Coach")}
            {localStorage.getItem("role") === "ADMIN" &&
  navItem("/admin", "Admin")}
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            navigate("/");
          }}
          className="bg-red-500 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* NAVBAR */}
        <div className="bg-slate-900 px-8 py-4 flex justify-between items-center border-b border-slate-800">

          <h2 className="text-lg">Welcome 👋</h2>

          <div className="flex items-center gap-4">

            {/* 🔔 NOTIFICATIONS */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-slate-800 px-3 py-1 rounded"
              >
                🔔
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 bg-slate-900 p-3 rounded w-64 shadow-lg">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400">No notifications</p>
                  ) : (
                    notifications.map((n, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center mb-2"
                      >
                        <p className="text-sm">{n}</p>
                        <button
                          onClick={() =>
                            setNotifications((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            )
                          }
                          className="text-red-400 text-xs"
                        >
                          ✖
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 👤 PROFILE */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>{userName}</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 bg-slate-900 p-3 rounded w-40 shadow-lg">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left hover:text-orange-400"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("name");
                      navigate("/");
                    }}
                    className="block w-full text-left mt-2 hover:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
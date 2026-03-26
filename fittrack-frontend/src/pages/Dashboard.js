import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const p = await API.get("/api/profile");
      const m = await API.get("/api/meals");

      setProfile(p.data);
      setMeals(m.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 BMI
  const bmi = profile?.height && profile?.weight
    ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
    : 0;

  // 🔥 CALORIE TARGET (SMART)
  const calorieTarget = () => {
    if (!profile?.weight) return 0;

    const base = profile.weight * 30;

    if (profile.goal === "fatloss") return base - 400;
    if (profile.goal === "muscle") return base + 300;
    if (profile.goal === "strength") return base + 200;

    return base;
  };

  const target = calorieTarget();
  const todayCalories = meals.reduce((a, b) => a + b.calories, 0);

  // 🔥 PROGRESS SCORE (REAL SaaS LOGIC)
  const calorieScore = target ? Math.min((todayCalories / target) * 100, 100) : 0;
  const workoutScore = 70; // later connect real tracking
  const streakScore = 60;

  const totalScore = Math.round(
    calorieScore * 0.5 +
    workoutScore * 0.3 +
    streakScore * 0.2
  );

  // 🔥 INSIGHTS ENGINE
  const getInsight = () => {
    if (!profile) return "Complete your profile";

    if (bmi < 18.5) return "Increase calories + strength training";
    if (bmi < 25) return "You're on track. Stay consistent 💪";
    if (bmi < 30) return "Reduce calories and add cardio";
    return "Focus on fat loss with strict routine";
  };

  return (
    <Layout>
      <div className="space-y-10">

        <h1 className="text-3xl font-semibold">Dashboard</h1>

        {/* 🔥 TOP STATS */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-gray-400">BMI</p>
            <h2 className="text-3xl text-orange-400 mt-2">
              {bmi || "--"}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-gray-400">Target Calories</p>
            <h2 className="text-3xl mt-2">
              {target || "--"} kcal
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-gray-400">Consumed</p>
            <h2 className="text-3xl mt-2">
              {todayCalories} kcal
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-gray-400">Goal</p>
            <h2 className="text-3xl mt-2 capitalize">
              {profile?.goal || "Not Set"}
            </h2>
          </div>

        </div>

        {/* 🔥 PROGRESS SCORE (MAIN FEATURE) */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4 text-lg">Daily Performance Score</h2>

          <div className="w-full bg-slate-800 rounded-full h-5">
            <div
              className="bg-orange-500 h-5 rounded-full transition-all duration-500"
              style={{ width: `${totalScore}%` }}
            />
          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-400">
            <span>{Math.round(calorieScore)}% Nutrition</span>
            <span>{totalScore}/100 Score</span>
          </div>
        </div>

        {/* 🔥 CALORIE PROGRESS */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">Calorie Progress</h2>

          <div className="w-full bg-slate-800 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${Math.min((todayCalories / target) * 100, 100)}%`,
              }}
            />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            {todayCalories} / {target} kcal
          </p>
        </div>

        {/* 🔥 SMART INSIGHTS */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">Smart Insights</h2>

          <p className="text-orange-400 text-lg">
            {getInsight()}
          </p>

          <ul className="text-gray-400 text-sm mt-3 space-y-1">
            <li>• Stay within calorie target</li>
            <li>• Train at least 4x/week</li>
            <li>• Maintain protein intake</li>
          </ul>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");

  const [aiWorkouts, setAiWorkouts] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const [level, setLevel] = useState("beginner");
  const [days, setDays] = useState(3);

  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/api/workouts");
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const addWorkout = async () => {
    if (!name) return alert("Enter workout name");

    try {
      await API.post("/api/workouts", { name });
      setName("");
      fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 AI WORKOUT GENERATION
  const generateAIWorkouts = async () => {
    const goal = localStorage.getItem("goal");
    if (!goal) return alert("⚠️ Select goal first");

    setLoadingAI(true);

    try {
      const profileRes = await API.get("/api/profile");

      if (!profileRes.data || !profileRes.data.weight) {
        alert("⚠️ Please fill your profile first");
        setLoadingAI(false);
        return;
      }

      const res = await API.get("/api/ai/workouts", {
        params: {
          goal,
          level,
          days,
        },
      });

      setAiWorkouts(res.data);

    } catch (err) {
      console.error(err);
      alert("AI failed ❌");
      setAiWorkouts("Error generating workouts");
    }

    setLoadingAI(false);
  };

  return (
    <Layout>
      <div className="space-y-10">

        <h1 className="text-3xl font-semibold">Workouts</h1>

        {/* 🔥 AI SECTION */}
        <div className="bg-slate-900 p-6 rounded-2xl">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">AI Workout Plan</h2>

            <button
              onClick={generateAIWorkouts}
              className="bg-orange-500 px-5 py-2 rounded"
            >
              {loadingAI ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* 🔥 OPTIONS */}
          <div className="flex gap-4 mb-6 flex-wrap">

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-slate-800 p-2 rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-slate-800 p-2 rounded"
            >
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="6">6 Days</option>
            </select>

          </div>

          {/* 🔥 OUTPUT (TEXT FORMAT) */}
          {aiWorkouts && (
            <div className="bg-slate-800 p-6 rounded-xl whitespace-pre-line">
              {aiWorkouts}
            </div>
          )}
        </div>

        {/* ADD WORKOUT */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2>Add Workout</h2>

          <div className="flex gap-4 mt-4">
            <input
              placeholder="Workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 bg-slate-800 rounded w-full"
            />

            <button
              onClick={addWorkout}
              className="bg-orange-500 px-6 py-3 rounded"
            >
              Add
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Workouts;
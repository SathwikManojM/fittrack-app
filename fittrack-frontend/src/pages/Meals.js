import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(200);

  const [aiMeals, setAiMeals] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const [dietType, setDietType] = useState("veg");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await API.get("/api/meals");
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addMeal = async () => {
    if (!name) return alert("Enter meal name");

    try {
      await API.post("/api/meals", { name, calories });
      setName("");
      setCalories(200);
      fetchMeals();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FINAL AI FUNCTION (FIXED)
  const generateAIMeals = async () => {
    const goal = localStorage.getItem("goal");

    if (!goal) {
      alert("⚠️ Please select goal first");
      return;
    }

    setLoadingAI(true);
    setAiMeals(null);

    try {
      // ✅ get weight
      const profileRes = await API.get("/api/profile");
      const weight = profileRes.data?.weight || 70;

      const res = await API.get("/api/ai/meals", {
        params: {
          goal,
          diet: dietType,
          weight,
        },
      });

      if (res.data && res.data.meals) {
        setAiMeals(res.data.meals);
      } else {
        setAiMeals([]);
      }

    } catch (err) {
      console.error(err);
      alert("AI failed ❌");
      setAiMeals([]);
    }

    setLoadingAI(false);
  };

  return (
    <Layout>
      <div className="space-y-10">

        <h1 className="text-3xl font-semibold">Meals</h1>

        {/* AI SECTION */}
        <div className="bg-slate-900 p-6 rounded-2xl space-y-4">

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">AI Meal Plan</h2>

            <button
              onClick={generateAIMeals}
              className="bg-orange-500 px-5 py-2 rounded"
            >
              {loadingAI ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* DIET */}
          <select
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
            className="bg-slate-800 p-2 rounded"
          >
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>

          {/* OUTPUT */}
          {aiMeals && aiMeals.length > 0 && (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                {aiMeals.map((meal, i) => (
                  <div key={i} className="bg-slate-800 p-4 rounded-xl">
                    <h3>{meal.name}</h3>
                    <p className="text-orange-400">{meal.calories} kcal</p>
                    <p className="text-green-400">
                      {meal.protein || 0} g protein
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="text-center mt-4">
                <p className="text-orange-400">
                  Total Calories:{" "}
                  {aiMeals.reduce((a, b) => a + b.calories, 0)} kcal
                </p>
                <p className="text-green-400">
                  Total Protein:{" "}
                  {aiMeals.reduce((a, b) => a + (b.protein || 0), 0)} g
                </p>
              </div>
            </>
          )}

          {aiMeals && aiMeals.length === 0 && (
            <p className="text-red-400 text-center">
              ⚠️ No meals generated
            </p>
          )}

        </div>

        {/* ADD MEAL */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <input
            placeholder="Meal name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-slate-800 rounded w-full"
          />

          <input
            type="range"
            min="50"
            max="1000"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button onClick={addMeal} className="bg-orange-500 px-4 py-2 mt-2">
            Add Meal
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default Meals;
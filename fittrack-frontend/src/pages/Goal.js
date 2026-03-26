import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Goal() {
  const { type } = useParams();
  const navigate = useNavigate();

  const goals = {
    fatloss: {
      title: "Fat Loss",
      diet: "High protein, calorie deficit, avoid sugar & junk food.",
      workout: "Cardio + HIIT + light strength training.",
    },
    muscle: {
      title: "Muscle Gain",
      diet: "High protein, calorie surplus, eat clean carbs.",
      workout: "Heavy lifting + progressive overload.",
    },
    strength: {
      title: "Strength Training",
      diet: "Balanced diet with good protein intake.",
      workout: "Compound lifts: Squat, Deadlift, Bench Press.",
    },
    maintain: {
      title: "Maintain Fitness",
      diet: "Balanced macros, maintain calories.",
      workout: "Mix of cardio + strength workouts.",
    },
  };

  const goal = goals[type];

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">
            {goal?.title || "Goal"}
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
          >
            ← Back
          </button>
        </div>

        {goal ? (
          <>
            {/* Diet */}
            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-lg mb-2">Diet Suggestion</h2>
              <p className="text-gray-400">{goal.diet}</p>
            </div>

            {/* Workout */}
            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-lg mb-2">Workout Suggestion</h2>
              <p className="text-gray-400">{goal.workout}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Invalid goal selected</p>
        )}
      </div>
    </Layout>
  );
}

export default Goal;
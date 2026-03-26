import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progress() {
  const [entries, setEntries] = useState([]);
  const [weight, setWeight] = useState(70);

  const fetchProgress = async () => {
    try {
      const res = await API.get("/api/progress");
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const addEntry = async () => {
    if (!weight) return;

    try {
      await API.post("/api/progress", { weight });
      fetchProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = entries.map((e, i) => ({
    name: `Day ${i + 1}`,
    weight: e.weight,
  }));

  return (
    <Layout>
      <div className="space-y-10">

        <h1 className="text-3xl font-semibold">Progress</h1>

        {/* Track Weight */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">Track Weight</h2>

          <div className="flex gap-4 items-center">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-3 bg-slate-800 rounded w-40"
            />

            <button
              onClick={addEntry}
              className="bg-orange-500 px-6 py-3 rounded hover:bg-orange-600"
            >
              Add Entry
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">Weight Progress</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* History */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">History</h2>

          {entries.length === 0 ? (
            <p className="text-gray-400">No progress added yet</p>
          ) : (
            <div className="space-y-3">
              {entries.map((e) => (
                <div
                  key={e.id}
                  className="bg-slate-800 p-4 rounded flex justify-between"
                >
                  <span>Entry</span>
                  <span className="text-orange-400">
                    {e.weight} kg
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}

export default Progress;
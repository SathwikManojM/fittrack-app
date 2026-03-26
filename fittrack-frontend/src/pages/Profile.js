import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    weight: "",
    height: "",
    age: "",
    goal: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/profile");
      if (res.data) setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await API.post("/api/profile", profile);

      // 🔥 SAVE NAME
      localStorage.setItem("name", profile.name);

      alert("Saved ✅");
      window.location.reload(); // refresh navbar
    } catch (err) {
      alert("Failed ❌");
    }
  };

  return (
    <Layout>
      <div className="space-y-10 max-w-4xl">

        <h1 className="text-3xl font-semibold">Profile</h1>

        <div className="bg-slate-900 p-8 rounded-2xl grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <p className="text-gray-400 mb-1">Name</p>
            <input
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="bg-slate-800 p-3 rounded w-full"
            />
          </div>

          {/* AGE */}
          <div>
            <p className="text-gray-400 mb-1">Age</p>
            <input
              type="number"
              value={profile.age}
              onChange={(e) =>
                setProfile({ ...profile, age: e.target.value })
              }
              className="bg-slate-800 p-3 rounded w-full"
            />
          </div>

          {/* WEIGHT */}
          <div>
            <p className="text-gray-400 mb-1">Weight (kg)</p>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) =>
                setProfile({ ...profile, weight: e.target.value })
              }
              className="bg-slate-800 p-3 rounded w-full"
            />
          </div>

          {/* HEIGHT */}
          <div>
            <p className="text-gray-400 mb-1">Height (cm)</p>
            <input
              type="number"
              value={profile.height}
              onChange={(e) =>
                setProfile({ ...profile, height: e.target.value })
              }
              className="bg-slate-800 p-3 rounded w-full"
            />
          </div>

          {/* GOAL */}
          <div className="md:col-span-2">
            <p className="text-gray-400 mb-1">Goal</p>
            <select
              value={profile.goal}
              onChange={(e) =>
                setProfile({ ...profile, goal: e.target.value })
              }
              className="bg-slate-800 p-3 rounded w-full"
            >
              <option value="">Select Goal</option>
              <option value="fatloss">Fat Loss</option>
              <option value="muscle">Muscle Gain</option>
              <option value="strength">Strength</option>
              <option value="maintain">Maintain</option>
            </select>
          </div>

          <button
            onClick={saveProfile}
            className="bg-orange-500 p-3 rounded col-span-2"
          >
            Save Profile
          </button>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;

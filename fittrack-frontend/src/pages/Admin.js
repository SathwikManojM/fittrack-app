import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users ❌");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <h1 className="text-3xl font-semibold">Admin Panel 👑</h1>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="mb-4">All Users</h2>

          {users.length === 0 ? (
            <p className="text-gray-400">No users found</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="bg-slate-800 p-4 rounded flex justify-between"
                >
                  <span>{u.name || "No Name"}</span>
                  <span className="text-orange-400">
                    {u.role || "USER"}
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

export default Admin;
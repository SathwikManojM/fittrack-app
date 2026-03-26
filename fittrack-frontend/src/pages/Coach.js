import { useState } from "react";
import Layout from "../components/Layout";

function Coach() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey 👋 I’m your AI fitness coach. Ask me anything!" }
  ]);

  const [input, setInput] = useState("");

  const generateReply = (text) => {
    const msg = text.toLowerCase();

    // 🔥 FAT LOSS
    if (msg.includes("fat") || msg.includes("cut")) {
      return "🔥 Focus on calorie deficit + 8-10k steps daily + strength training.";
    }

    // 💪 MUSCLE
    if (msg.includes("muscle") || msg.includes("bulk")) {
      return "💪 Eat high protein (~1.6-2g/kg) + progressive overload in gym.";
    }

    // 🥗 DIET
    if (msg.includes("diet") || msg.includes("food")) {
      return "🥗 Balanced diet: protein + carbs + fats. Avoid junk, track calories.";
    }

    // 🏋️ WORKOUT
    if (msg.includes("workout") || msg.includes("gym")) {
      return "🏋️ Train 4-5x/week. Focus on compound lifts like squats, bench, deadlift.";
    }

    // ⚡ MOTIVATION
    if (msg.includes("motivation") || msg.includes("lazy")) {
      return "⚡ Discipline > motivation. Just show up daily.";
    }

    // ⏳ TIME
    if (msg.includes("how long")) {
      return "⏳ Visible results take ~4-8 weeks with consistency.";
    }

    // DEFAULT
    return "💡 Stay consistent, track progress, and trust the process.";
  };

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };

    const aiReply = generateReply(input);
    const aiMsg = { role: "ai", text: aiReply };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-semibold">AI Coach 🤖</h1>

        {/* CHAT BOX */}
        <div className="bg-slate-900 p-6 rounded-2xl h-[400px] overflow-y-auto space-y-4">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  msg.role === "user"
                    ? "bg-orange-500"
                    : "bg-slate-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach..."
            className="flex-1 p-3 bg-slate-800 rounded"
          />

          <button
            onClick={sendMessage}
            className="bg-orange-500 px-6 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default Coach;
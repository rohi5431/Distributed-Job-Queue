import axios from "axios";
import { useState } from "react";

export default function Topbar() {
  const [loading, setLoading] = useState(false);

  const addJob = async () => {
    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/add-job",
        {
          type: "email",
          data: {
            to: "test@gmail.com",
            message: "Hello 🚀 " + Date.now()
          }
        },
        {
          headers: {
            "x-api-key": "rohit123"
          }
        }
      );

      // 🔥 TOAST SUCCESS
      window.dispatchEvent(
        new CustomEvent("notify", {
          detail: "Job added successfully ✅",
        })
      );

    } catch (err) {
      console.error(err);

      // 🔥 TOAST ERROR
      window.dispatchEvent(
        new CustomEvent("notify", {
          detail: "Error adding job ❌",
        })
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topbar">
      <h3>Dashboard</h3>

      <button onClick={addJob} disabled={loading}>
        {loading ? "Adding..." : "Add Job"}
      </button>
    </div>
  );
}
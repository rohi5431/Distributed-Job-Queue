import { useState } from "react";

export default function Sidebar({ setActive }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2>⚡ Bull UI</h2>

      <p>Queues</p>

      {/* ✅ Dashboard Click */}
      <div
        className="menu-item jobs"
        onClick={() => setActive("dashboard")}
      >
        job-queue
      </div>

      {/* 🔥 TOGGLE BUTTON */}
      <button
        className="toggle-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Features" : "Show Features"}
      </button>

      {/* 🔥 HIDDEN FEATURES */}
      {open && (
        <div className="extra-menu">
          
          <div
            className="menu-item"
            onClick={() => setActive("analytics")}
          >
            📊 Analytics
          </div>

          <div
            className="menu-item"
            onClick={() => setActive("retry")}
          >
            🔁 Retry Jobs
          </div>

          <div
            className="menu-item"
            onClick={() => setActive("logs")}
          >
            📜 Logs
          </div>

          <div
            className="menu-item"
            onClick={() => setActive("settings")}
          >
            ⚙️ Settings
          </div>

        </div>
      )}
    </div>
  );
}
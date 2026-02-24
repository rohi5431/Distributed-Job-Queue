import "./App.css";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Metrics from "./components/Metrics";
import Charts from "./components/Charts";
import JobTable from "./components/JobTable";
import Controls from "./components/controls";

// 🔥 Advanced Features
import Retry from "./components/Retry";
import Logs from "./components/Logs";
import Settings from "./components/Settings";

// 🔥 NEW
import Notification from "./components/Notification";

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="layout">
      
      <Sidebar setActive={setActive} />

      <div className="main">
        
        <Topbar />

        {/* 🔥 GLOBAL TOAST */}
        <Notification />

        <div className="content">

          {active === "dashboard" && (
            <>
              <Metrics />
              <Controls />

              <div className="row">
                <Charts />
                <JobTable />
              </div>
            </>
          )}

          {active === "analytics" && (
            <div className="row">
              <Charts />
            </div>
          )}

          {active === "retry" && (
            <div className="table">
              <Retry />
            </div>
          )}

          {active === "logs" && (
            <div className="table">
              <Logs />
            </div>
          )}

          {active === "settings" && (
            <div className="table">
              <Settings />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
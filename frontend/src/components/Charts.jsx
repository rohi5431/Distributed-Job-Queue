import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,   // ✅ REQUIRED FOR PIE
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";  // ✅ ADD PIE
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,   // ✅ IMPORTANT
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/metrics", {
          headers: {
            "x-api-key": "rohit123",
          },
        });
        setMetrics(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div className="card">Loading Chart...</div>;

  // 🔥 COMMON DATA
  const labels = ["Waiting", "Active", "Completed", "Failed"];
  const values = [
    metrics.waiting || 0,
    metrics.active || 0,
    metrics.completed || 0,
    metrics.failed || 0,
  ];

  const colors = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"];

  // 🔥 BAR DATA
  const barData = {
    labels,
    datasets: [
      {
        label: "Jobs",
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
      },
    ],
  };

  // 🔥 PIE DATA
  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-card">
      <h3>Analytics 📊</h3>

      <div className="charts-grid">
        {/* 🔥 BAR */}
        <div className="chart-box">
          <Bar data={barData} options={options} />
        </div>

        {/* 🔥 PIE */}
        <div className="chart-box">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
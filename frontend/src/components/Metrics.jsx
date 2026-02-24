import { useEffect, useState } from "react";
import { getMetrics } from "../api/axios.js";
import { socket } from "../socket";

export default function Metrics() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);   // 🔥 NEW
  const [error, setError] = useState(null);       // 🔥 NEW

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMetrics();
      setData(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load metrics ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on("job_update", fetchData);

    return () => {
      socket.off("job_update");
    };
  }, []);

  // 🔥 LOADER
  if (loading) return <div className="card">Loading metrics...</div>;

  // 🔥 ERROR
  if (error) return <div className="card">{error}</div>;

  return (
    <div className="cards">
      <div className="card">
        <p>Total</p>
        <h2>{data.totalJobs || 0}</h2>
      </div>

      <div className="card">
        <p>Waiting</p>
        <h2>{data.waiting || 0}</h2>
      </div>

      <div className="card">
        <p>Active</p>
        <h2>{data.active || 0}</h2>
      </div>

      <div className="card">
        <p>Completed</p>
        <h2>{data.completed || 0}</h2>
      </div>

      <div className="card">
        <p>Failed</p>
        <h2>{data.failed || 0}</h2>
      </div>

      <div className="card">
        <p>Success Rate</p>
        <h2>
          {data.completed + data.failed > 0
            ? (
                (data.completed / (data.completed + data.failed)) *
                100
              ).toFixed(1)
            : 0}
          %
        </h2>
      </div>

      <div className="card">
        <p>Throughput</p>
        <h2>
          {data.throughput ? data.throughput.toFixed(2) : 0} /sec
        </h2>
      </div>
    </div>
  );
}
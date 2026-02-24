import { useEffect, useState } from "react";
import { getJobs } from "../api/axios.js";
import { socket } from "../socket";   // 🔥 ADDED

export default function JobTable() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);   // 🔥 NEW
  const [error, setError] = useState(null);       // 🔥 NEW

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobs();
      setJobs(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load jobs ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    // ❌ REMOVE polling
    // const interval = setInterval(fetchJobs, 3000);

    // 🔥 WebSocket
    socket.on("job_update", fetchJobs);

    return () => {
      socket.off("job_update");
    };
  }, []);

  // 🔥 LOADER
  if (loading) return <div className="table">Loading jobs...</div>;

  // 🔥 ERROR
  if (error) return <div className="table">{error}</div>;

  return (
    <div className="table">
      <h3 style={{ marginBottom: "10px" }}>Jobs</h3>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>ID</th>
            <th style={{ width: "30%" }}>Type</th>
            <th style={{ width: "30%" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{ cursor: "pointer" }}
            >
              <td
                title={job.id}
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {job.id}
              </td>

              <td>{job.name}</td>

              <td>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background:
                      job.status === "completed"
                        ? "#dcfce7"
                        : job.status === "failed"
                        ? "#fee2e2"
                        : "#e0f2fe",
                    color:
                      job.status === "completed"
                        ? "#16a34a"
                        : job.status === "failed"
                        ? "#dc2626"
                        : "#0284c7",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {job.status}
                </span>

                {job.status === "failed" && (
                  <button
                    style={{
                      marginLeft: "10px",
                      background: "#f59e0b",
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();

                      await fetch(
                        `http://localhost:5000/retry/${job.id}`,
                        {
                          method: "POST",
                          headers: {
                            "x-api-key": "rohit123",
                          },
                        }
                      );

                      // 🔥 TOAST (REPLACED alert)
                      window.dispatchEvent(
                        new CustomEvent("notify", {
                          detail: "Job retried 🔁",
                        })
                      );
                    }}
                  >
                    Retry
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <h3>Job Details</h3>

            <p><b>ID:</b> {selectedJob.id}</p>
            <p><b>Type:</b> {selectedJob.name}</p>
            <p><b>Status:</b> {selectedJob.status}</p>

            <h4>Payload:</h4>
            <pre>{JSON.stringify(selectedJob.data, null, 2)}</pre>

            <button onClick={() => setSelectedJob(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
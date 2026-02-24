import { useEffect, useState } from "react";
import { getJobs } from "../api/axios";

export default function Logs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="table">
      <h3>Logs 📜</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Attempts</th>
            <th>Error</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.status}</td>
              <td>{job.attempts}</td>
              <td>{job.error || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
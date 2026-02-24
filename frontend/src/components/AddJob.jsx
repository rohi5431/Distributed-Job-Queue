import { useState } from "react";
import { addJob } from "../api/axios";

export default function AddJob() {
  const [type, setType] = useState("email");
  const [data, setData] = useState("{}");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addJob({
      type,
      data: JSON.parse(data),
    });

    alert("Job Added 🚀");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Job</h3>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="email">Email</option>
        <option value="image">Image</option>
        <option value="report">Report</option>
      </select>

      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button type="submit">Add Job</button>
    </form>
  );
}
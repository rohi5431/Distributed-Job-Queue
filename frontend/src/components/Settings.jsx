import { useState } from "react";

export default function Settings() {
  const [limit, setLimit] = useState(100);

  return (
    <div>
      <h3>Settings ⚙️</h3>

      <label>Rate Limit:</label>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      <button onClick={() => alert("Saved ✅")}>Save</button>
    </div>
  );
}
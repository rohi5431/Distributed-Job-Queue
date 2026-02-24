import { useState } from "react";
import { addJob } from "../api";

export default function AddJobModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("email");
  const [data, setData] = useState("{}");

  const submit = async () => {
    await addJob({ type, data: JSON.parse(data) });
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Job</button>

      {open && (
        <div style={{ background: "black", padding: "20px" }}>
          <select onChange={(e) => setType(e.target.value)}>
            <option>email</option>
            <option>image</option>
          </select>

          <textarea onChange={(e) => setData(e.target.value)} />

          <button onClick={submit}>Submit</button>
        </div>
      )}
    </>
  );
}
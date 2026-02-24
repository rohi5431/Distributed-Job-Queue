export default function Retry() {

  const retryJob = async () => {
    const jobId = prompt("Enter Job ID");

    if (!jobId) return;

    try {
      await fetch(`http://localhost:5000/retry/${jobId}`, {
        method: "POST",
        headers: {
          "x-api-key": "rohit123",
        },
      });

      alert("Retry success ✅");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="retry-box">
      <h2>Retry Jobs 🔁</h2>

      <p>Enter Job ID to retry failed job</p>

      <button onClick={retryJob}>Retry Job</button>
    </div>
  );
}
export default function Controls() {

  const pauseQueue = async () => {
    try {
      await fetch("http://localhost:5000/pause", {
        method: "POST",
        headers: {
          "x-api-key": "rohit123"
        }
      });
      alert("Queue Paused");
    } catch (err) {
      console.error(err);
    }
  };

  const resumeQueue = async () => {
    try {
      await fetch("http://localhost:5000/resume", {
        method: "POST",
        headers: {
          "x-api-key": "rohit123"
        }
      });
      alert("Queue Resumed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Controls</h3>
      <button onClick={pauseQueue}>Pause Queue</button>
      <button onClick={resumeQueue}>Resume Queue</button>
    </div>
  );
}
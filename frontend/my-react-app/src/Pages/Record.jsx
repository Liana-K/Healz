export default function Record({ goTo }) {
  return (
    <div className="page">
      <h2>Record Recovery Test</h2>
      <p>Camera and pose tracking will appear here.</p>

      <button onClick={() => goTo("dashboard")}>
        Back
      </button>
    </div>
  );
}

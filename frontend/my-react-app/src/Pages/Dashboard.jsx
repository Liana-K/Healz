import Logo from "../components/Logo";

export default function Dashboard({ goTo }) {
  return (
    <div className="page logo-page">
      <Logo size={120} />

      <button onClick={() => goTo("record")}>
        Record Recovery Test
      </button>

      <button onClick={() => goTo("history")}>
        View History
      </button>
    </div>
  );
}

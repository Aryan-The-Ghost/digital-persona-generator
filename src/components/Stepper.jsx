export default function Stepper({ step }) {
  const steps = ["Basic Info", "Vibe", "Colors", "Interests", "Keywords"];

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      {steps.map((label, index) => (
        <div
          key={index}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            background: step === index ? "#333" : "#eee",
            color: step === index ? "white" : "#555",
            fontWeight: step === index ? "bold" : "normal",
            transition: "0.2s",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

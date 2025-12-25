import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePersonaStore } from "../store/personaStore";
import Stepper from "../components/Stepper";
import { fetchMoodboardImages } from "../api/unsplash";

// Validation schema
const schema = z.object({
  input: z.string().min(1, "This field is required"),
});

export default function Wizard() {
  const [step, setStep] = useState(0);

  const updatePersona = usePersonaStore((s) => s.updatePersona);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ---------------------------------------
  // FIXED: onNext is now ASYNC + moodboard fetch
  // ---------------------------------------
  const onNext = async (data) => {
  console.log("Step:", step);
  console.log("Input:", data.input);

  if (step === 0) updatePersona({ name: data.input });
  if (step === 1) updatePersona({ vibe: data.input });
  if (step === 2) updatePersona({ colors: data.input.split(",") });
  if (step === 3) updatePersona({ interests: data.input });

  //  Moodboard generation
  if (step === 4) {
  updatePersona({ keywords: data.input });

  try {
    console.log(" Generating complete AI persona...");
    await usePersonaStore.getState().generateCompletePersona();
    console.log(" Persona generated!");
  } catch (error) {
    console.error("Generation Error:", error);
  }
}

  setStep((prev) => prev + 1);
  reset({ input: "" });
};



  const questions = [
    "What's your name or persona name?",
    "Describe your vibe (2–3 words)",
    "Enter favorite colors (comma-separated)",
    "What are your interests?",
    "Enter keywords describing your personality",
  ];

  // Completed
  if (step >= questions.length) {
    return (
      <div style={{ marginTop: "40px", fontSize: "20px" }}>
        <h1>🎉 All steps finished!</h1>
        <p>
          Now go to the <b>Results</b> page to see your persona!
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Stepper step={step} />

      <h2 style={{ marginTop: "20px" }}>{questions[step]}</h2>

      <form
        onSubmit={handleSubmit(onNext)}
        style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("input")}
          placeholder="Type your answer..."
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {errors.input && (
          <span style={{ color: "red", marginTop: "6px" }}>
            {errors.input.message}
          </span>
        )}

        <button
          type="submit"
          style={{
            marginTop: "24px",
            padding: "12px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </form>
    </div>
  );
}

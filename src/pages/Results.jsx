import React from "react";
import { usePersonaStore } from "../store/personaStore";
import { exportJSON, exportHTML } from "../utils/exportUtils.js";

const Results = () => {
  // Destructure persona and regeneratePersona action from store
  const { persona, regeneratePersona } = usePersonaStore();

  // Handle case where no persona exists
  if (!persona) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>No persona data available. Please add dummy data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      
      {/* COLOR PALETTE
<section>
  <h2 className="text-xl font-bold mb-4">Color Palette</h2>
  
  {persona.colors && persona.colors.length > 0 ? (
    <div className="flex gap-3">
      {persona.colors.map((c, i) => (
        <div 
          key={i} 
          className="w-16 h-16 rounded-lg shadow-lg border-2 border-gray-300" 
          style={{ backgroundColor: c }}
          title={c}
        ></div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No colors available</p>
  )}
</section> */}

      {/* BIO */}
      <section>
        <h2 className="text-xl font-bold mb-2">Bio</h2>
        <p className="text-base bg-white/10 p-3 rounded-lg shadow">
          {persona.bio}
        </p>
      </section>

      {/* AVATAR */}
      <section>
        <h2 className="text-xl font-bold mb-2">Avatar</h2>
        <img
  src={persona.avatar}
  alt="avatar"
  className="w-40 h-40 rounded-full shadow border"
  onError={(e) => {
    // fallback if SVG fails
    e.target.src = "https://via.placeholder.com/150";
  }}
/>


      </section>

      {/* MOODBOARD */}
      <section>
  <h2 className="text-xl font-bold mb-2">Aesthetic Moodboard</h2>

  <div className="grid grid-cols-3 gap-4 mt-4">
  {persona.moodboard?.map((url, i) => (
    <img
      key={i}
      src={url}
      alt="mood"
      className="w-full h-32 object-cover rounded-lg"
    />
  ))}
</div>

</section>



      {/* IG HIGHLIGHT COVERS */}
      <section>
        <h2 className="text-xl font-bold mb-2">IG Highlight Covers</h2>
        <div className="grid grid-cols-3 gap-3">
          {persona.highlights.map((h, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full shadow bg-white text-black flex items-center justify-center text-xs font-medium"
            >
              {h}
            </div>
          ))}
        </div>
      </section>

      {/* WEBSITE PREVIEW */}
      <section>
        <h2 className="text-xl font-bold mb-2">Website Preview</h2>
        <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
          <div dangerouslySetInnerHTML={{ __html: persona.website }} />
        </div>
      </section>

      {/* REGENERATE BUTTON */}
<section>
  <button
    onClick={async () => await regeneratePersona()}
    className="px-4 py-2 bg-purple-500 text-white rounded-lg"
  >
    Regenerate Persona
  </button>
</section>

      {/* Export Buttons */}
      <section className="flex gap-4 mt-6">
        <button
          onClick={() => exportJSON(persona)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Download JSON
        </button>

        <button
          onClick={() => exportHTML(persona)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Export Website HTML
        </button>
      </section>
    </div>
  );
};

export default Results;

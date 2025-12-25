import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchMoodboardImages } from "../api/unsplash";
import { generateBio, generateHighlights, generateWebsiteHTML } from "../api/groq";

// Helper for random avatar
function getRandomSeed() {
  return Math.floor(Math.random() * 100000);
}

export const usePersonaStore = create(
  persist(
    (set, get) => ({
      // Initial data
      persona: {
        name: "Palak",
        vibe: "Cute aesthetic",
        colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
        interests: "",
        keywords: "",
        avatar: `https://api.dicebear.com/6.x/bottts/png?seed=${getRandomSeed()}`,
        bio: "Creative explorer | Loves color palettes & cute aesthetics ✨",
        highlights: ["Life", "Vibes", "Trips", "Food"],
        website:
          "<h1>Palak's Aesthetic Website</h1><p>Welcome to my creative world!</p>",
        moodboard: [],
      },

      // Update persona
      updatePersona: (newData) =>
        set((state) => ({
          persona: { ...state.persona, ...newData },
        })),

      // Shuffle colors & new avatar
      regeneratePersona: async () => {
        const state = get();
        const keyword = state.persona.keywords || state.persona.vibe || "aesthetic";

        // Fetch new moodboard images
        const images = await fetchMoodboardImages(keyword);

        set((state) => ({
          persona: {
            ...state.persona,
            colors: [...state.persona.colors].sort(() => Math.random() - 0.5),
            avatar: `https://api.dicebear.com/6.x/bottts/png?seed=${getRandomSeed()}`,
            moodboard: images,
          },
        }));
      },

      // ⭐ NEW: Generate EVERYTHING with AI
      generateCompletePersona: async () => {
        const state = get();
        const userData = state.persona;

        console.log("🤖 Generating AI persona...");
        console.log("📋 User data:", userData);

        try {
          // Generate all content in parallel
          const [bio, highlights, websiteHTML, images] = await Promise.all([
            generateBio(userData),
            generateHighlights(userData),
            generateWebsiteHTML(userData),
            fetchMoodboardImages(userData.keywords || userData.vibe || "aesthetic"),
          ]);

          console.log("Generated content:", { bio, highlights, websiteHTML, imageCount: images.length });

          // Update everything at once
          set((state) => ({
            persona: {
              ...state.persona,
              bio,
              highlights,
              website: websiteHTML,
              moodboard: images,
              avatar: `https://api.dicebear.com/6.x/bottts/png?seed=${getRandomSeed()}`,
            },
          }));

          console.log(" AI persona generated successfully!");
        } catch (error) {
          console.error(" Error generating persona:", error);
        }
      },

      // Async moodboard generator (kept for compatibility)
      generateMoodboard: async (keyword) => {
        const images = await fetchMoodboardImages(keyword || "aesthetic");

        set((state) => ({
          persona: {
            ...state.persona,
            moodboard: images,
          },
        }));
      },
    }),

    {
      name: "persona-storage",
    }
  )
);



export async function generateBio(userData) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  console.log(" Groq API Key exists?", !!apiKey);
  console.log("First 10 chars:", apiKey?.substring(0, 10));

  if (!apiKey) {
    console.error("Groq API key missing!");
    return "Creative soul exploring the digital world ";
  }
  

  const prompt = `You are a creative Instagram bio writer. Write a short, catchy bio (2-3 sentences max) for:

Name: ${userData.name}
Vibe: ${userData.vibe}
Interests: ${userData.interests}
Keywords: ${userData.keywords}

Make it fun, authentic, and use 1-2 emojis. Just write the bio, nothing else.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(" Groq API error:", error);
      return "Creative soul exploring the digital world ";
    }

    const data = await response.json();
    const bio = data.choices[0]?.message?.content?.trim() || "Creative soul ";

    return bio;
  } catch (err) {
    console.error(" Bio generation failed:", err);
    return "Creative soul exploring the digital world ";
  }
}

export async function generateHighlights(userData) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    return ["Life", "Vibes", "Travel", "Food"];
  }

  const prompt = `Generate exactly 4 Instagram highlight cover names (1-2 words each) for someone interested in: ${userData.interests}.

Format: Just list them separated by commas, nothing else.
Example: Life, Travel, Food, Style`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    const text = data.choices[0]?.message?.content?.trim() || "";

    const highlights = text
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h.length > 0 && h.length < 15)
      .slice(0, 4);

    return highlights.length === 4 ? highlights : ["Life", "Vibes", "Travel", "Food"];
  } catch (err) {
    console.error("Highlights generation failed:", err);
    return ["Life", "Vibes", "Travel", "Food"];
  }
}

export async function generateWebsiteHTML(userData) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const colors = userData.colors || ["#FF6B6B", "#FFD93D", "#6BCB77"];

  if (!apiKey) {
    return `
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          background: linear-gradient(135deg, ${colors[0]}, ${colors[1]}); 
          color: white;
          padding: 40px;
          text-align: center;
        }
        h1 { font-size: 3em; margin-bottom: 20px; }
        p { font-size: 1.2em; line-height: 1.6; }
      </style>
      <h1>Welcome to ${userData.name}'s World</h1>
      <p>A ${userData.vibe} space where ${userData.interests} come to life </p>
    `;
  }

  const prompt = `Create a beautiful single-page HTML website for ${userData.name}.

Details:
- Vibe: ${userData.vibe}
- Interests: ${userData.interests}
- Color palette: ${colors.join(", ")}

Requirements:
- Include inline CSS with gradient background using their colors
- Modern, aesthetic design
- 1 heading and 2-3 short paragraphs
- Use their name and interests naturally
- Add some emojis
- NO external links or scripts

Return ONLY the HTML code, nothing else.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    let html = data.choices[0]?.message?.content?.trim() || "";

    // Clean up markdown code blocks if present
    html = html.replace(/```html\n?/g, "").replace(/```\n?/g, "");

    return html;
  } catch (err) {
    console.error(" Website generation failed:", err);
    return `
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          background: linear-gradient(135deg, ${colors[0]}, ${colors[1]}); 
          color: white;
          padding: 40px;
          text-align: center;
        }
        h1 { font-size: 3em; margin-bottom: 20px; }
        p { font-size: 1.2em; line-height: 1.6; }
      </style>
      <h1>Welcome to ${userData.name}'s World</h1>
      <p>A ${userData.vibe} space where ${userData.interests} come to life </p>
    `;
  }
}
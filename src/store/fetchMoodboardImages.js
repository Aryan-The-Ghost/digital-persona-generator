export async function fetchMoodboardImages(query) {
  const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  console.log(" Unsplash Key Loaded:", key);

  if (!key) {
    console.error(" Unsplash API key missing!");
    return [];
  }

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${key}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Unsplash error:", await res.text());
      return [];
    }

    const data = await res.json();
    console.log("Unsplash images:", data.results);

    return data.results.map((img) => img.urls.small);
  } catch (err) {
    console.error(" Fetch failed:", err);
    return [];
  }
}

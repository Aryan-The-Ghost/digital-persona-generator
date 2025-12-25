export async function fetchMoodboardImages(query) {
  const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Debug log (REMOVE later)
  console.log("Unsplash Key:", key);

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${key}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Unsplash error:", await res.text());
    return [];
  }

  const data = await res.json();

  return data.results.map(img => img.urls.small);
}

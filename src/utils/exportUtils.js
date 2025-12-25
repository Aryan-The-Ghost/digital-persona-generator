// Export persona as JSON
export function exportJSON(persona) {
  const dataStr = JSON.stringify(persona, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "persona.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Export website HTML
export function exportHTML(persona) {
  const htmlContent = `
  <html>
    <head>
      <title>${persona.bio}</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; background: #f4f4f4; }
        h1 { color: #333; }
        p { color: #555; }
      </style>
    </head>
    <body>
      <h1>${persona.bio}</h1>
      <p>Colors: ${persona.colors.join(", ")}</p>
      <img src="${persona.avatar}" alt="avatar" width="150"/>
    </body>
  </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "persona.html";
  a.click();
  URL.revokeObjectURL(url);
}

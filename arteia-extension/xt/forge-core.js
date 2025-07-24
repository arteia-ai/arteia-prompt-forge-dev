let lastNegative = "";

export async function generatePrompt(text) {
  // ⚠️ Replace this URL with your own Cloudflare Worker endpoint
  const apiURL = "YOUR_API_URL"; // Example: https://your-worker.username.workers.dev
  const apiKey = "YOUR_API_KEY"; // Optional: only if your API requires a key

  if (apiURL.includes("YOUR_API_URL")) {
    throw new Error("🛠️ This extension requires your own Cloudflare Worker.\n\nPlease edit forge-core.js and replace the API URL with your own.");
  }

  try {
    const res = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Uncomment the line below if your API requires a key:
        // "X-Arteia-Key": apiKey,
      },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`⛔ Error ${res.status}: ${errMsg}`);
    }

    const data = await res.json();
    lastNegative = data.negative || "";
    return data.prompt;

  } catch (err) {
    throw new Error(`💥 Error: ${err.message}`);
  }
}

export function getLastNegative() {
  return lastNegative;
}

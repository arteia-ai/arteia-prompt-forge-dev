export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Arteia-Key",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    // Access token check
    const auth = request.headers.get("X-Arteia-Key");
    if (auth !== env.AUTH_TOKEN) {
      return new Response("Unauthorized", {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Only POST allowed", {
        status: 405,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    let text: string;
    try {
      const body = await request.json();
      text = body.text;
      if (!text) throw new Error();
    } catch {
      return new Response("Missing 'text' field", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    const llamaPrompt = `
You are a professional prompt engineer specialized in generating visually stunning AI art prompts.

Take the user's description and reframe it into 6 categories:
Subject, Style, Quality, Environment, Action, Framing.

Translate everything to English. If any element is missing, infer or enhance it to create a more vivid and imaginative result.

Use precise, high-impact language suitable for Stable Diffusion prompts (e.g. “8k”, “masterpiece”, “volumetric lighting”, “hyper detailed”, “cinematic wide shot”).

Then, based on the subject type, create a matching **negative prompt**:
- If it's a human/animal/creature → include things like "deformed face, extra limbs, blurry eyes"
- If it's an object or scene → use terms like "low resolution, watermark, text, low poly"

Return the output in plain text using this format:
Positive: [your positive prompt]
@Negative: [your negative prompt]
No code blocks. No markdown. No extra commentary.

User input:
${text}
`;

    const res = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.AI_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: llamaPrompt }
          ]
        })
      }
    );

    const json = await res.json();
    const raw = json.result?.response;

    let prompt = "";
    let negative = "";

    try {
      // First attempt: valid JSON parsing
      const parsed = JSON.parse(raw);
      prompt = parsed.positive || "";
      negative = parsed.negative || "";
    } catch {
      // Fallback: extract from plain text using markers
      const lines = raw.split("\n");
      for (const line of lines) {
        if (line.toLowerCase().startsWith("positive:")) {
          prompt = line.split(":")[1].trim();
        }
        if (line.toLowerCase().startsWith("@negative:")) {
          negative = line.split(":")[1].trim();
        }
      }
    }

    return new Response(JSON.stringify({ prompt, negative }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};

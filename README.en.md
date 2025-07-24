
<div align="center">
  <img src="./assets/banner_github.jpg" alt="ArteIA Prompt Forge banner" width="100%">
</div>

# 🔥 ArteIA Prompt Forge

**Turn any image description into optimized prompts for AI models like Stable Diffusion.**  
Powered by Cloudflare Workers, Llama 3, and a minimal frontend for fast testing.  
This repository contains the project core: the backend (`forge/`) and a testing interface (`web/`).

---

## ⚙️ What does it do?

Give it an input like:

> _"A glowing warrior woman with magical tattoos in an enchanted forest, fantasy illustration, medium shot"_

And it returns a prompt like:

```
a glowing tattooed warrior woman, fantasy illustration style, 8k, high quality, masterpiece, in an enchanted forest with magical light, walking through the foliage, cinematic medium shot
```

Plus its matching **negative prompt**, automatically generated based on the subject type:

```
deformed face, extra limbs, blurry eyes, watermark
```

---

## 🧠 Tech stack

| Area | Stack |
|------|-------|
| Worker | [Cloudflare Workers](https://developers.cloudflare.com/workers/) |
| AI | [Llama-3-8B Instruct](https://developers.cloudflare.com/workers-ai/models/meta/llama-3-8b-instruct) |
| Frontend test | HTML + Vanilla JS |
| Tooling | Wrangler 3/4, TypeScript |

---

## 📁 Project structure

```
arteia-prompt-forge/
├── forge/         # Cloudflare Worker (backend)
│   ├── src/index.ts
│   ├── wrangler.jsonc
│   └── ...
├── web/           # Simple web test UI
│   ├── index.html
│   ├── script.js
│   └── style.css
├── assets/
│   └── banner_github.jpg
├── .env.example   # Required variables for local dev
├── .gitignore
└── README.md
```

---

## 🚀 How to run it locally (for developers only)

1. Clone the repo and enter the `forge/` folder
2. Create a `.env` file with your credentials (based on `.env.example`)
3. Install dependencies and launch the worker locally:

```bash
npm install
npx wrangler dev
```

4. Open `web/index.html` in your browser and start forging.

---

## ☁️ Production endpoint

This project is live via Cloudflare Workers:  
👉 [`https://prompt-forge-worker.arteia2808.workers.dev`](https://prompt-forge-worker.arteia2808.workers.dev)

Public access is protected by a secret key (`X-Arteia-Key`). The key is used by the web test UI and the upcoming browser extension.

---

## 🛡 Security

This repo **does not include any real API keys**.  
Secrets are stored in `wrangler.jsonc` or environment variables, and request authentication is enforced.

---

## ☕ Credits & Support

This project is part of the [ArteIA](https://youtube.com/@arteia) universe, created for artists, makers and curious minds who love the fusion of creativity and technology.

👉 [ko-fi.com/arteia](https://ko-fi.com/arteia) if you'd like to support the project with a coffee.

---

🔧 Project by [ArteIA](https://youtube.com/@arteia)  
🎨 Tools, workflows and tutorials about AI-powered art

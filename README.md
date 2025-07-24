
<div align="center">
  <img src="./assets/banner_github.jpg" alt="ArteIA Prompt Forge banner" width="100%">
</div>

# 🔥 ArteIA Prompt Forge

**Transforma cualquier descripción de imagen en prompts optimizados para modelos de IA como Stable Diffusion.**  
Desarrollado con Cloudflare Workers, Llama 3 y una interfaz simple para testeo rápido.  
Este repositorio contiene el núcleo del sistema: el backend (`forge/`) y el frontend de pruebas (`web/`).

---

## ⚙️ ¿Qué hace esto?

Tomas un input como:

> _"Una guerrera con tatuajes luminosos en un bosque encantado, ilustración fantástica, plano medio"_

Y devuelve un prompt como:

```
a glowing tattooed warrior woman, fantasy illustration style, 8k, high quality, masterpiece, in an enchanted forest with magical light, walking through the foliage, cinematic medium shot
```

Y su correspondiente **negative prompt**, generado automáticamente según el tipo de sujeto:

```
deformed face, extra limbs, blurry eyes, watermark
```

---

## 🧠 Tecnologías utilizadas

| Área | Stack |
|------|-------|
| Worker | [Cloudflare Workers](https://developers.cloudflare.com/workers/) |
| IA | [Llama-3-8B Instruct](https://developers.cloudflare.com/workers-ai/models/meta/llama-3-8b-instruct) |
| Frontend test | HTML + JS Vanilla |
| Gestión | Wrangler 3/4, TypeScript |

---

## 📁 Estructura del proyecto

```
arteia-prompt-forge/
├── forge/         # Worker de Cloudflare (backend)
│   ├── src/index.ts
│   ├── wrangler.jsonc
│   └── ...
├── web/           # Interfaz web de testeo rápido
│   ├── index.html
│   ├── script.js
│   └── style.css
├── assets/
│   └── banner_github.jpg
├── .env.example   # Variables necesarias para producción
├── .gitignore
└── README.md
```

---

## 🚀 Cómo probarlo localmente (solo para desarrolladores)

1. Clona el repo y entra a `forge/`
2. Crea un archivo `.env` con tus credenciales (basado en `.env.example`)
3. Instala dependencias y lanza el worker en local:

```bash
npm install
npx wrangler dev
```

4. Abre `web/index.html` en navegador y empieza a forjar.

---

## ☁️ Deploy online (Cloudflare)

Este proyecto ya está en producción vía Cloudflare Workers:  
👉 [`https://prompt-forge-worker.arteia2808.workers.dev`](https://prompt-forge-worker.arteia2808.workers.dev)

La versión pública está protegida por una clave interna (`X-Arteia-Key`), pero es accesible desde la interfaz web de test o la futura extensión.

---

## 🛡 Seguridad

Este repo **no contiene claves reales**.  
Las variables están aisladas en `wrangler.jsonc` o `.env` y se usa un token secreto para prevenir forks maliciosos o abusos en Cloudflare.

---

## ☕ Créditos y apoyo

Este proyecto forma parte del universo de [ArteIA](https://youtube.com/@arteia), impulsado por una comunidad que ama el arte, la IA y las ideas bien hechas.

👉 [ko-fi.com/arteia](https://ko-fi.com/arteia) si quieres invitarme a un café y apoyar el proyecto.

---

🔧 Proyecto creado por [ArteIA](https://youtube.com/@arteia)  
🎨 Herramientas, flujos de trabajo y tutoriales sobre arte con IA

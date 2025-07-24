<div align="center">
  <img src="./assets/banner_github.jpg" alt="ArteIA Prompt Forge banner" width="100%">
</div>

# 🔥 ArteIA Prompt Forge

**Transforma cualquier descripción de imagen en prompts optimizados para modelos de IA como Stable Diffusion.**  
Desarrollado con Cloudflare Workers, Llama 3 y una interfaz simple para testeo rápido.  
Este repositorio contiene el núcleo del sistema: el backend (`forge/`) y el frontend de pruebas (`web/`).

---

## ⚠️ IMPORTANTE: necesitas tu propio Worker

Esta versión del proyecto **no incluye la API oficial**.  
Para que funcione correctamente, debes desplegar tu propio Worker en Cloudflare siguiendo las instrucciones de más abajo.

También debes configurar el archivo `xt/forge-core.js` y reemplazar:

```js
const apiURL = "YOUR_API_URL";  // ← Ej: https://tu-nombre.usuario.workers.dev
const apiKey = "YOUR_API_KEY";  // ← Si tu API requiere una clave personalizada
```

> Si no lo haces, la extensión lanzará un error al generar prompts.

---

## ⚙️ ¿Qué hace esto?

Tomas un input como:

> _"Una guerrera con tatuajes luminosos en un bosque encantado, ilustración fantástica, plano medio"_

Y devuelve un prompt como:

```
a glowing tattooed warrior woman, fantasy illustration style, 8k, high quality, masterpiece, in an enchanted forest with magical light, walking through the foliage, cinematic medium shot
```

Y su correspondiente **negative prompt**, generado automáticamente:

```
deformed face, extra limbs, blurry eyes, watermark
```

Además:
- Puedes regenerar el último prompt pulsando `Shift + clic` en el botón de forjar.
- También puedes insertar el último *prompt negativo* generado.
- Puedes generar texto en cualquier idioma y la extensión se encargará de traducirlo.

---

## 🧠 Tecnologías utilizadas

| Área | Stack |
|------|-------|
| Worker | [Cloudflare Workers](https://developers.cloudflare.com/workers/) |
| IA | [Llama-3-8B Instruct](https://developers.cloudflare.com/workers-ai/models/meta/llama-3-8b-instruct) |
| Frontend test | HTML + JavaScript Vanilla |
| Extensión Chrome | Manifest V3 + UI flotante |
| Gestión | Wrangler 3/4, TypeScript |

---

## 🛡 Seguridad

- Este repo **no incluye claves reales ni endpoints funcionales por defecto**.
- Las variables sensibles están aisladas en `.env` y `wrangler.jsonc`.
- Puedes implementar validaciones extra en tu Worker (como protección por ID de extensión o verificación de integridad).

---

## 🧩 Extensión Chrome

Incluye una interfaz flotante sobre cualquier `textarea`.  
Solo debes:
- Activar la extensión (haciendo clic en el icono).
- Pulsar en el logo flotante junto al campo.
- Forjar tu prompt con un clic.

🎨 También puedes personalizarla visualmente desde los archivos en `xt/`.

---

## ☕ Créditos y apoyo

Este proyecto forma parte del universo de [ArteIA](https://youtube.com/@arteia), impulsado por una comunidad que ama el arte, la IA y las ideas bien hechas.

👉 [ko-fi.com/arteia](https://ko-fi.com/arteia) si quieres invitarme a un café y apoyar el proyecto.

---

🔧 Proyecto creado por [ArteIA](https://youtube.com/@arteia)  
🎨 Herramientas, flujos de trabajo y tutoriales sobre arte con IA

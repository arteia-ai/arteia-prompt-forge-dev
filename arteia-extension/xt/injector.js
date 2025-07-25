(async () => {
  console.log("ArteIA Forge intentando inyectarse...");

  if (document.getElementById("logoArteia")) {
    console.log("ArteIA Forge ya está activo en esta página.");
    return;
  }


  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = chrome.runtime.getURL("xt/ui.css");
  document.head.appendChild(css);


  const toastContainer = document.createElement("div");
  document.body.appendChild(toastContainer);

  const toast = (msg, type = "success") => {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b"
    };
    const el = document.createElement("div");
    el.textContent = msg;
    Object.assign(el.style, {
      position: "fixed",
      top: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      background: colors[type] || "#333",
      color: "#fff",
      padding: "10px 16px",
      fontSize: "14px",
      borderRadius: "8px",
      zIndex: "9999",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      opacity: "0",
      transition: "opacity 0.3s ease"
    });
    toastContainer.appendChild(el);
    requestAnimationFrame(() => (el.style.opacity = "1"));
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300);
    }, 3000);
  };

  const htmlText = await fetch(chrome.runtime.getURL("xt/ui.html")).then(res => res.text());
  const container = document.createElement("div");
  container.innerHTML = htmlText;
  document.body.append(...container.children);

  const logoEl = document.getElementById("logoArteia");
  logoEl.src = chrome.runtime.getURL("xt/media/arteia-iso.svg");

  const logo = logoEl;
  const panel = document.getElementById("hoverPanel");
  const forgeBtn = panel.querySelector(".btn-forge");
  const negativeBtn = panel.querySelector(".btn-negative");
  const kofiBtn = panel.querySelector(".btn-kofi");

  const areas = document.querySelectorAll("textarea");
  let currentTextarea = null;
  let lastInputPrompt = null;

  const { generatePrompt, getLastNegative } = await import(chrome.runtime.getURL("xt/forge-core.js"));

  function positionOverlay(el) {
    const rect = el.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const panelHeight = 36;
    const logoSize = 48;
    const offsetBottom = 6;

    panel.style.left = `${rect.left + scrollX + 12}px`;
    panel.style.top = `${rect.bottom + scrollY - panelHeight - offsetBottom}px`;
    logo.style.left = `${rect.left + scrollX - 5}px`;
    logo.style.top = `${rect.bottom + scrollY - panelHeight - offsetBottom + (panelHeight / 2) - (logoSize / 2) + 5}px`;
  }

  areas.forEach(textarea => {
    textarea.addEventListener("focus", () => {
      currentTextarea = textarea;
      positionOverlay(textarea);
      logo.classList.add("show");
    });

    textarea.addEventListener("blur", () => {
      setTimeout(() => {
        const active = document.activeElement;
        const stillFocused = [...areas].includes(active);
        const overLogo = logo.matches(":hover");
        const overPanel = panel.matches(":hover");
        if (!stillFocused && !overLogo && !overPanel) {
          logo.classList.remove("show");
        }
      }, 150);
    });
  });

  window.addEventListener("scroll", () => {
    if (currentTextarea) positionOverlay(currentTextarea);
  });

  window.addEventListener("resize", () => {
    if (currentTextarea) positionOverlay(currentTextarea);
  });

  forgeBtn.addEventListener("click", async (event) => {
    if (!currentTextarea) return;

    let input = "";

    if (event.shiftKey) {
      if (!lastInputPrompt) {
        toast("⚠️ No hay prompt anterior para regenerar.", "warning");
        return;
      }
      input = lastInputPrompt;
      console.log("🔁 Re-forjando prompt con:", input);
    } else {
      input = currentTextarea.value.trim();
      if (!input) {
        toast("⚠️ Escribe una descripción primero.", "warning");
        return;
      }
      lastInputPrompt = input;
      console.log("✨ Nuevo prompt con:", input);
    }

    const baseText = event.shiftKey
      ? "⏳ Re-Forjando prompt con ArteIA"
      : "⏳ Forjando prompt con ArteIA";

    let dots = 0;
    currentTextarea.style.opacity = "0.5";

    const loadingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      currentTextarea.value = `${baseText}${".".repeat(dots)}`;
    }, 400);

    try {
      const prompt = await generatePrompt(input);
      clearInterval(loadingInterval);

      if (!prompt) throw new Error("La IA no devolvió ningún prompt.");

      currentTextarea.value = prompt;
      currentTextarea.focus();
      console.log("Prompt recibido:", prompt);
    } catch (err) {
      clearInterval(loadingInterval);
      currentTextarea.value = input;
      toast(err.message, "error");
      console.warn("Error en generación:", err);
    } finally {
      currentTextarea.style.opacity = "1";
    }
  });

  negativeBtn.addEventListener("click", () => {
    if (!currentTextarea) return;

    const negative = getLastNegative();
    if (!negative) {
      toast("⚠️ Todavía no has forjado ningún prompt positivo.", "warning");
      return;
    }

    currentTextarea.value += `${negative}`;
    currentTextarea.focus();
  });

  kofiBtn.addEventListener("click", () => {
    window.open("https://ko-fi.com/arteia", "_blank");
  });

  console.log("ArteIA Forge inyectado correctamente");
})();

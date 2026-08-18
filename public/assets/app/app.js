(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > .slice"));
  var activeSection = 0;

  /* Navegación principal, tema y scrollspy. */
  var siteNav = document.getElementById("siteNav");
  var menuButton = document.getElementById("menuButton");
  var mainNav = document.getElementById("mainNav");
  var navLinks = mainNav ? Array.prototype.slice.call(mainNav.querySelectorAll('a[href^="#"]')) : [];

  function setMenu(open) {
    if (!menuButton || !mainNav) return;
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    mainNav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    mainNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });

  var rail = document.getElementById("sectionRail");
  var railNames = ["Inicio", "El desafío", "Soluciones", "Del dato a la acción", "Showcase", "Cómo trabajamos", "Por qué INDATTA", "Contacto"];
  if (rail) {
    sections.forEach(function (section, index) {
      var link = document.createElement("a");
      var label = document.createElement("span");
      link.href = "#" + section.id;
      link.setAttribute("aria-label", railNames[index] || "Sección " + (index + 1));
      label.textContent = railNames[index] || "Sección " + (index + 1);
      link.appendChild(label);
      rail.appendChild(link);
    });
  }
  var railLinks = rail ? Array.prototype.slice.call(rail.querySelectorAll("a")) : [];

  function setActiveSection(index) {
    if (index < 0 || index >= sections.length) return;
    activeSection = index;
    var current = sections[index];
    var isLight = current.getAttribute("data-theme") === "light";
    if (siteNav) siteNav.classList.toggle("is-light", isLight);
    navLinks.forEach(function (link) {
      var target = link.getAttribute("href");
      if (target === "#" + current.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    railLinks.forEach(function (link, railIndex) {
      if (railIndex === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visible[0]) setActiveSection(sections.indexOf(visible[0].target));
    }, { rootMargin: "-24% 0px -58% 0px", threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  } else {
    setActiveSection(0);
  }

  /* Navegación por teclado entre slices. No intercepta formularios, tabs ni controles. */
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp"].indexOf(event.key) === -1) return;
    var target = event.target;
    if (target && target.closest && target.closest("input, textarea, select, button, a, [role='tab'], [contenteditable='true']")) return;
    var direction = event.key === "ArrowDown" || event.key === "PageDown" ? 1 : -1;
    var next = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
    if (next === activeSection) return;
    event.preventDefault();
    sections[next].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  /* Entradas progresivas, con fallback y respeto por reduced motion. */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* Showcase accesible: autoplay suave, pausa manual y navegación por teclado. */
  var showcase = document.querySelector(".showcase-frame");
  var tabs = showcase ? Array.prototype.slice.call(showcase.querySelectorAll('[role="tab"]')) : [];
  var panels = showcase ? Array.prototype.slice.call(showcase.querySelectorAll('[role="tabpanel"]')) : [];
  var autoplayControl = document.getElementById("autoplayControl");
  var showcaseProgress = document.getElementById("showcaseProgress");
  var showcaseIndex = 0;
  var showcaseTimer = null;
  var userPaused = reduceMotion;
  var showcaseVisible = true;
  var AUTOPLAY_MS = 6000;

  function updateAutoplayLabel() {
    if (!autoplayControl) return;
    autoplayControl.setAttribute("aria-pressed", userPaused ? "true" : "false");
    var icon = autoplayControl.querySelector("span");
    var label = autoplayControl.querySelector("b");
    if (icon) icon.textContent = userPaused ? "▶" : "Ⅱ";
    if (label) label.textContent = userPaused ? "Reproducir" : "Pausar";
  }

  function resetProgress() {
    if (!showcaseProgress) return;
    showcaseProgress.classList.remove("is-running");
    void showcaseProgress.offsetWidth;
    if (!userPaused && showcaseVisible && !reduceMotion) showcaseProgress.classList.add("is-running");
  }

  function scheduleShowcase() {
    window.clearTimeout(showcaseTimer);
    resetProgress();
    if (userPaused || !showcaseVisible || reduceMotion || tabs.length < 2) return;
    showcaseTimer = window.setTimeout(function () {
      activateShowcase((showcaseIndex + 1) % tabs.length, false);
    }, AUTOPLAY_MS);
  }

  function activateShowcase(index, manual) {
    if (index < 0 || index >= tabs.length) return;
    showcaseIndex = index;
    tabs.forEach(function (tab, tabIndex) {
      var active = tabIndex === index;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });
    panels.forEach(function (panel, panelIndex) {
      var active = panelIndex === index;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (manual) {
      userPaused = true;
      updateAutoplayLabel();
    }
    scheduleShowcase();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { activateShowcase(index, true); });
    tab.addEventListener("keydown", function (event) {
      var next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateShowcase(next, true);
      tabs[next].focus();
    });
  });

  if (autoplayControl) {
    autoplayControl.addEventListener("click", function () {
      userPaused = !userPaused;
      updateAutoplayLabel();
      scheduleShowcase();
    });
  }

  if (showcase && "IntersectionObserver" in window) {
    var showcaseObserver = new IntersectionObserver(function (entries) {
      showcaseVisible = !!entries[0].isIntersecting;
      scheduleShowcase();
    }, { threshold: 0.18 });
    showcaseObserver.observe(showcase);
  }
  updateAutoplayLabel();
  activateShowcase(0, false);

  /* Año del footer. */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* =========================================================
     FORMULARIO
     Contrato preservado desde V005:
     POST /api/contacto, mismos nombres, payload y flujo WhatsApp.
     ========================================================= */
  var API_BASE = "/api";
  var WHATSAPP_NUMBER = "56941946724";
  var form = document.getElementById("leadForm");

  if (form) {
    var summary = document.getElementById("formSummary");
    var status = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");
    var submitBtnLabel = document.getElementById("submitBtnLabel");
    var telOptMark = document.getElementById("telOptMark");
    var telReqMark = document.getElementById("telReqMark");
    var canalRadios = Array.prototype.slice.call(form.querySelectorAll('input[name="canal"]'));
    var required = ["nombre", "empresa", "cargo", "correo", "solucion", "problema"];
    var labels = {
      nombre: "Nombre",
      empresa: "Empresa",
      cargo: "Cargo",
      correo: "Correo",
      solucion: "Tipo de desafío",
      problema: "Mensaje",
      consentimiento: "Consentimiento",
      telefono: "Teléfono o WhatsApp",
      canal: "Canal de contacto preferido"
    };
    var canalBtnLabel = { "Correo": "Conversemos", "Teléfono": "Solicitar llamada", "WhatsApp": "Continuar en WhatsApp" };
    var canalOkMessage = {
      "Correo": "Recibimos tu solicitud. Te contactaremos por correo.",
      "Teléfono": "Recibimos tu solicitud. Te contactaremos por teléfono."
    };

    function fieldEl(name) { return form.querySelector('[name="' + name + '"]'); }
    function fieldWrap(name) { return form.querySelector('[data-field="' + name + '"]'); }

    function showError(name) {
      var wrap = fieldWrap(name);
      var error = document.getElementById("err-" + name);
      var element = fieldEl(name);
      if (wrap) wrap.setAttribute("data-invalid", "true");
      if (error) error.classList.add("is-visible");
      if (element) element.setAttribute("aria-invalid", "true");
    }

    function clearError(name) {
      var wrap = fieldWrap(name);
      var error = document.getElementById("err-" + name);
      var element = fieldEl(name);
      if (wrap) wrap.removeAttribute("data-invalid");
      if (error) error.classList.remove("is-visible");
      if (element) element.removeAttribute("aria-invalid");
    }

    function isEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
    function isPhone(value) {
      var digits = (value || "").replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    }
    function currentCanal() {
      var checked = form.querySelector('input[name="canal"]:checked');
      return checked ? checked.value : "";
    }
    function canalNeedsPhone(canal) { return canal === "Teléfono" || canal === "WhatsApp"; }

    function updateChannelUI() {
      var canal = currentCanal();
      var needsPhone = canalNeedsPhone(canal);
      if (telOptMark) telOptMark.hidden = needsPhone;
      if (telReqMark) telReqMark.hidden = !needsPhone;
      if (submitBtnLabel) submitBtnLabel.textContent = canalBtnLabel[canal] || "Conversemos";
      if (!needsPhone) clearError("telefono");
      var canalError = document.getElementById("err-canal");
      if (canal && canalError) canalError.classList.remove("is-visible");
    }

    canalRadios.forEach(function (radio) { radio.addEventListener("change", updateChannelUI); });
    updateChannelUI();

    function validate() {
      var errors = [];
      required.forEach(function (name) {
        var element = fieldEl(name);
        var value = (element.value || "").trim();
        if (!value) { errors.push(name); showError(name); }
        else clearError(name);
      });

      var correoEl = fieldEl("correo");
      if (correoEl.value.trim() && !isEmail(correoEl.value.trim())) {
        if (errors.indexOf("correo") === -1) errors.push("correo");
        showError("correo");
      }

      var canal = currentCanal();
      var canalError = document.getElementById("err-canal");
      if (!canal) {
        errors.push("canal");
        if (canalError) canalError.classList.add("is-visible");
      } else if (canalError) canalError.classList.remove("is-visible");

      if (canalNeedsPhone(canal)) {
        var phone = fieldEl("telefono").value.trim();
        if (!phone || !isPhone(phone)) {
          if (errors.indexOf("telefono") === -1) errors.push("telefono");
          showError("telefono");
        } else clearError("telefono");
      } else clearError("telefono");

      var consent = document.getElementById("f-consent");
      if (!consent.checked) {
        errors.push("consentimiento");
        document.getElementById("err-consent").classList.add("is-visible");
        consent.setAttribute("aria-invalid", "true");
      } else {
        document.getElementById("err-consent").classList.remove("is-visible");
        consent.removeAttribute("aria-invalid");
      }
      return errors;
    }

    function renderSummary(errors) {
      while (summary.firstChild) summary.removeChild(summary.firstChild);
      summary.appendChild(document.createTextNode("Revisa " + errors.length + (errors.length === 1 ? " campo" : " campos") + " antes de continuar: "));
      errors.forEach(function (name, index) {
        var link = document.createElement("a");
        link.href = "#f-" + (name === "consentimiento" ? "consent" : name);
        link.textContent = labels[name] || name;
        summary.appendChild(link);
        summary.appendChild(document.createTextNode(index === errors.length - 1 ? "." : ", "));
      });
      summary.classList.add("is-visible");
      summary.setAttribute("tabindex", "-1");
      summary.focus();
    }

    function sendLead(data) {
      return fetch(API_BASE + "/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(function (response) {
        if (response.ok) return response.json().catch(function () { return {}; });
        return response.json().catch(function () { return {}; }).then(function (body) {
          var detail = body && (body.detail || body.mensaje);
          throw new Error(typeof detail === "string" ? detail : "No pudimos procesar tu solicitud (" + response.status + ").");
        });
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      summary.classList.remove("is-visible");
      status.classList.remove("is-visible", "ok");
      var errors = validate();
      if (errors.length) {
        renderSummary(errors);
        return;
      }

      var canal = currentCanal();
      form.setAttribute("data-state", "sending");
      submitBtn.setAttribute("disabled", "");

      var data = {
        nombre: fieldEl("nombre").value.trim(),
        empresa: fieldEl("empresa").value.trim(),
        cargo: fieldEl("cargo").value.trim(),
        correo: fieldEl("correo").value.trim(),
        telefono: fieldEl("telefono").value.trim(),
        solucion: fieldEl("solucion").value,
        canal: canal,
        problema: fieldEl("problema").value.trim(),
        consentimiento: document.getElementById("f-consent").checked,
        pagina_web: fieldEl("pagina_web") ? fieldEl("pagina_web").value.trim() : ""
      };

      sendLead(data)
        .then(function () {
          form.removeAttribute("data-state");
          submitBtn.removeAttribute("disabled");

          if (canal === "WhatsApp") {
            status.textContent = "Solicitud recibida. Abriendo WhatsApp…";
            status.classList.add("is-visible", "ok");
            var message = encodeURIComponent(
              "Hola, soy " + data.nombre + " de " + data.empresa +
              ". Completé el formulario de INDATTA y quiero evaluar un proyecto relacionado con " + data.solucion + "."
            );
            window.location.assign("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message);
            return;
          }

          status.textContent = canalOkMessage[canal] || "Recibimos tu solicitud.";
          status.classList.add("is-visible", "ok");
          status.setAttribute("tabindex", "-1");
          status.focus();
        })
        .catch(function (error) {
          form.removeAttribute("data-state");
          submitBtn.removeAttribute("disabled");
          summary.textContent = "No pudimos enviar tu solicitud. " + (error && error.message ? error.message : "Intenta nuevamente en unos minutos.") + " Tus datos siguen aquí — puedes volver a intentarlo.";
          summary.classList.add("is-visible");
          summary.setAttribute("tabindex", "-1");
          summary.focus();
        });
    });
  }
})();

(() => {
  const rail = document.querySelector("[data-rail]");
  if (rail) {
    const active = rail.dataset.active;
    const items = [
      ["studio", "studio.html", "✦", "Studio"],
      ["avatars", "avatars.html", "◉", "Avatars"],
      ["profile", "profile.html", "◎", "Profile"],
      ["settings", "settings.html", "⌁", "Settings"],
      ["help", "help.html", "?", "Help"],
      ["loading", "loading.html", "◌", "Loading states"],
    ];
    rail.className = "app-rail";
    rail.innerHTML = `
      <a class="rail-brand" href="index.html" aria-label="Expansion review">◇</a>
      <button class="rail-item" type="button" data-toast="New project opens in Studio" aria-label="New project">＋<span class="rail-tip">New project</span></button>
      ${items.map(([id, href, icon, label]) => `<a class="rail-item ${active === id ? "active" : ""}" href="${href}" aria-label="${label}">${icon}<span class="rail-tip">${label}</span></a>`).join("")}
      <span class="rail-spacer"></span>
      <a class="rail-item" href="index.html" aria-label="Review gallery">↗<span class="rail-tip">Review gallery</span></a>
    `;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  let toastTimer;

  const announce = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1900);
  };

  document.querySelectorAll("[data-toast]").forEach((control) => {
    control.addEventListener("click", () => announce(control.dataset.toast));
  });

  document.querySelectorAll("[data-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("on");
      toggle.setAttribute("aria-pressed", String(toggle.classList.contains("on")));
      announce(toggle.classList.contains("on") ? "Preference enabled" : "Preference disabled");
    });
  });

  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    group.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const scope = tabs.dataset.tabs;
    tabs.querySelectorAll("button[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        tabs.querySelectorAll("button[data-tab]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        document.querySelectorAll(`[data-tab-panel="${scope}"]`).forEach((panel) => {
          panel.hidden = panel.dataset.tabId !== button.dataset.tab;
        });
      });
    });
  });

  const settingsCopy = {
    identity: ["Who you are", "Identity", "Name, handle, photos and the public story attached to your work."],
    appearance: ["How the app looks", "Appearance", "Tune density, theme, language, timezone and motion without losing atmosphere."],
    notifications: ["How we reach you", "Notifications", "Choose which production, audience and account events deserve your attention."],
    privacy: ["Who sees what", "Privacy", "Control discoverability, activity, social permissions and your blocklist."],
    creator: ["Your economy", "Creator", "Shape patron tiers, audience goals, payout identity and supporter access."],
    playback: ["Content defaults", "Playback", "Set autoplay, captions, preview quality and generation handoff defaults."],
    effects: ["Your signature look", "Effects & VFX", "Build a reusable finishing fingerprint for enhancement, grain and atmosphere."],
    studio: ["What it has learned", "Studio profile", "Inspect and tune the creative taste Small Bridges learns from your choices."],
    billing: ["Credits & invoices", "Billing", "See live balance, holds, auto-recharge rules, invoices and spend history."],
    security: ["Account safety", "Security", "Manage password, passkeys, 2FA, active sessions and trusted devices."],
    developers: ["Build on us", "Developers", "Create scoped API keys, configure webhooks and inspect delivery health."],
    data: ["Your data", "Data & account", "Export your archive, deactivate access or permanently close the account."],
  };

  const settingsLinks = document.querySelectorAll("[data-settings-link]");
  if (settingsLinks.length) {
    const kicker = document.querySelector("[data-settings-kicker]");
    const title = document.querySelector("[data-settings-title]");
    const lead = document.querySelector("[data-settings-lead]");
    settingsLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.dataset.settingsLink;
        settingsLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        document.querySelectorAll("[data-settings-section]").forEach((section) => {
          section.classList.toggle("active", section.dataset.settingsSection === id);
        });
        const copy = settingsCopy[id];
        if (copy) {
          kicker.textContent = copy[0];
          title.textContent = copy[1];
          lead.textContent = copy[2];
        }
      });
    });
  }

  const tools = document.querySelectorAll("[data-studio-tool]");
  const toolTitle = document.querySelector("[data-studio-title]");
  const toolDesc = document.querySelector("[data-studio-desc]");
  const toolCopy = {
    Generate: "Frame the idea, select the model, and set the production contract.",
    Effects: "Apply cinematic effects and physically inspired VFX treatments.",
    Image: "Generate key art, references, storyboards and production stills.",
    Photo: "Repair, relight, reframe and transform an existing photograph.",
    Cast: "Build a continuity-safe ensemble from your characters and house talent.",
    Voice: "Direct narration, dialogue, delivery and multilingual performance.",
    Music: "Shape the score, stems, timing, energy and emotional movement.",
    Worlds: "Choose a production-ready environment and its lighting logic.",
    Look: "Define grade, lens character, grain and finishing texture.",
    Story: "Develop the logline, beat map and scene-to-scene dramatic structure.",
    Templates: "Start from proven formats while keeping every layer editable.",
  };
  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      tools.forEach((item) => item.classList.remove("active"));
      tool.classList.add("active");
      if (toolTitle) toolTitle.textContent = tool.dataset.studioTool;
      if (toolDesc) toolDesc.textContent = toolCopy[tool.dataset.studioTool] || "Configure this production layer.";
    });
  });

  const avatarSearch = document.querySelector("[data-avatar-search]");
  const avatarCards = [...document.querySelectorAll("[data-avatar-card]")];
  if (avatarSearch) {
    avatarSearch.addEventListener("input", () => {
      const q = avatarSearch.value.trim().toLowerCase();
      avatarCards.forEach((card) => {
        card.hidden = !card.dataset.avatarCard.toLowerCase().includes(q);
      });
    });
  }

  document.querySelectorAll("[data-avatar-filter]").forEach((filter) => {
    filter.addEventListener("click", () => {
      document.querySelectorAll("[data-avatar-filter]").forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");
      const value = filter.dataset.avatarFilter;
      avatarCards.forEach((card) => {
        card.hidden = value !== "all" && card.dataset.type !== value;
      });
    });
  });

  const drawer = document.querySelector("[data-avatar-drawer]");
  const drawerImage = document.querySelector("[data-drawer-image]");
  const drawerName = document.querySelector("[data-drawer-name]");
  const drawerRole = document.querySelector("[data-drawer-role]");
  avatarCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!drawer) return;
      drawerImage.src = card.dataset.image;
      drawerName.textContent = card.dataset.name;
      drawerRole.textContent = card.dataset.role;
      drawer.classList.add("open");
    });
  });
  document.querySelectorAll("[data-drawer-close]").forEach((button) => {
    button.addEventListener("click", () => drawer?.classList.remove("open"));
  });

  document.querySelectorAll("[data-cast-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      button.classList.toggle("primary");
      button.textContent = button.classList.contains("primary") ? "In cast ✓" : "Add to cast";
      announce(button.classList.contains("primary") ? "Character added to this production" : "Character removed from this production");
    });
  });

  const helpSearch = document.querySelector("[data-help-search]");
  const helpCards = [...document.querySelectorAll("[data-help-card]")];
  const helpCount = document.querySelector("[data-help-count]");
  if (helpSearch) {
    helpSearch.addEventListener("input", () => {
      const q = helpSearch.value.trim().toLowerCase();
      let shown = 0;
      helpCards.forEach((card) => {
        const visible = card.textContent.toLowerCase().includes(q);
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      helpCount.textContent = q ? `${shown} matched guides` : "Search all guides";
    });
  }

  document.querySelectorAll("[data-support-type]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-support-type]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const subject = document.querySelector("[data-support-subject]");
      if (subject) subject.placeholder = `${button.textContent.trim()} subject`;
    });
  });

  const replay = document.querySelector("[data-replay-loading]");
  replay?.addEventListener("click", () => {
    const house = document.querySelector(".loading-house");
    const animated = house ? [...house.querySelectorAll(".aperture, .aperture-ring, .progress-line i")] : [];
    animated.forEach((element) => { element.style.animation = "none"; });
    void house?.offsetWidth;
    animated.forEach((element) => { element.style.removeProperty("animation"); });
    announce("Render choreography replayed");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") drawer?.classList.remove("open");
  });
})();

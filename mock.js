(() => {
  const rail = document.querySelector("[data-rail]");
  if (rail) {
    const active = rail.dataset.active;
    const items = [
      ["studio", "studio.html", "✦", "Director Chat"],
      ["avatars", "avatars.html", "◉", "Avatars"],
      ["profile", "profile.html", "◎", "Profile"],
      ["settings", "settings.html", "⌁", "Settings"],
      ["help", "help.html", "?", "Help"],
      ["loading", "loading.html", "◌", "Loading states"],
    ];
    rail.className = "app-rail";
    rail.innerHTML = `
      <a class="rail-brand" href="index.html" aria-label="Expansion review">◇</a>
      <button class="rail-item" type="button" data-toast="New project opens at the Director’s Desk" aria-label="New project">＋<span class="rail-tip">New project</span></button>
      ${items.map(([id, href, icon, label]) => `<a class="rail-item ${active === id ? "active" : ""}" href="${href}" aria-label="${label}">${icon}<span class="rail-tip">${label}</span></a>`).join("")}
      <span class="rail-spacer"></span>
      <a class="rail-item" href="../projection-house-live/index.html" aria-label="Implemented rooms">↗<span class="rail-tip">Implemented rooms</span></a>
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
    studio: ["What it has learned", "Director taste", "Inspect and tune the creative taste Small Bridges learns from your confirmed choices."],
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

  // Director Chat — Studio is the conversational filmmaking workspace. The
  // tabs only change which evidence is being inspected; creative choices are
  // deliberately sent through the conversation, matching the real contract.
  const directorViews = document.querySelectorAll("[data-director-view]");
  directorViews.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.directorView;
      directorViews.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelectorAll("[data-director-panel]").forEach((panel) => {
        const selected = panel.dataset.directorPanel === view;
        panel.classList.toggle("active", selected);
        panel.hidden = !selected;
      });
    });
  });

  const cutImage = document.querySelector("[data-cut-image]");
  const cutLabel = document.querySelector("[data-cut-label]");
  document.querySelectorAll("[data-scene-card]").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll("[data-scene-card]").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      if (cutImage) cutImage.src = card.dataset.image;
      if (cutLabel) cutLabel.textContent = card.dataset.label;
    });
  });

  const directorLog = document.querySelector("[data-director-log]");
  const directorInput = document.querySelector("[data-director-input]");
  const directorSend = document.querySelector("[data-director-send]");
  const composerWell = directorInput?.closest(".composer-well");
  const directorReplies = {
    "Ask the whole crew to cover it.": "I’ve called the Director, Cinematographer, Production Designer, Editor and Sound Designer. Their coverage will land here as receipts before anything is priced.",
    "Keep it to one slow dolly-in.": "Good. One patient dolly-in is now the camera plan for the crossing. I’ll preserve the bridge axis and let the practical light do the reveal.",
    "Show me the script before we plan shots.": "The screenplay is open on the board. Read it there; when you are ready, tell me what the camera should protect.",
    "Make the reveal quieter": "I’ve pulled the score back, removed the second reaction beat and let the paper mechanism carry the reveal.",
    "Read the current cut": "Four scenes, thirty-eight seconds: arrival, signal, passage, return. Three control frames exist; the final camera plan is still open.",
    "Use my usual pacing": "I’m using your confirmed taste: measured entries, a held reveal and no cut that arrives before the gesture finishes.",
  };

  const sendDirectorLine = (raw) => {
    const line = raw.trim();
    if (!line || !directorLog) return;

    const userTurn = document.createElement("article");
    userTurn.className = "user-turn director-echo";
    const userCopy = document.createElement("p");
    userCopy.textContent = line;
    userTurn.appendChild(userCopy);
    directorLog.appendChild(userTurn);

    const nextMove = directorLog.querySelector(".next-move-card");
    if (nextMove) nextMove.remove();

    const directorTurn = document.createElement("article");
    directorTurn.className = "director-turn compact-turn director-echo";
    const label = document.createElement("p");
    label.className = "turn-label";
    label.textContent = "Small Bridges";
    const copy = document.createElement("p");
    copy.textContent = directorReplies[line] || "I have that direction. I’ll reconcile it with the current story, continuity sources, camera plan and spend ceiling before proposing the next move.";
    directorTurn.append(label, copy);
    directorLog.appendChild(directorTurn);

    if (directorInput) directorInput.value = "";
    composerWell?.classList.remove("has-copy");
    directorLog.scrollTo({ top: directorLog.scrollHeight, behavior: "smooth" });
    announce("Direction entered into the conversation");
  };

  document.querySelectorAll("[data-director-reply]").forEach((button) => {
    button.addEventListener("click", () => sendDirectorLine(button.dataset.directorReply || button.textContent || ""));
  });
  document.querySelectorAll("[data-director-suggestion]").forEach((button) => {
    button.addEventListener("click", () => sendDirectorLine(button.textContent || ""));
  });
  directorInput?.addEventListener("input", () => composerWell?.classList.toggle("has-copy", !!directorInput.value.trim()));
  directorInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendDirectorLine(directorInput.value);
    }
  });
  directorSend?.addEventListener("click", () => sendDirectorLine(directorInput?.value || ""));

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
  document.querySelectorAll("[data-help-query]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!helpSearch) return;
      helpSearch.value = button.dataset.helpQuery || "";
      helpSearch.dispatchEvent(new Event("input", { bubbles: true }));
      helpSearch.focus();
    });
  });

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
    const animated = house ? [...house.querySelectorAll(".aperture, .aperture-ring, .progress-line i, .render-scan, .projector-beam")] : [];
    animated.forEach((element) => { element.style.animation = "none"; });
    void house?.offsetWidth;
    animated.forEach((element) => { element.style.removeProperty("animation"); });
    announce("Render choreography replayed");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") drawer?.classList.remove("open");
  });
})();

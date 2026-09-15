/* =========================================================
   BEST BUDDIES CANADA TEACHER HUB
   My Chapter prototype personalization layer

   IMPORTANT
   - This is NOT production authentication.
   - The existing access gate protects the prototype.
   - My Chapter state is stored only in localStorage.
   ========================================================= */

(() => {
  "use strict";

  const PROFILE_KEY = "bbMyChapterProfileV1";
  const TASKS_KEY = "bbMyChapterTasksV1";
  const CHECKIN_KEY = "bbMyChapterCheckinV1";
  const BANK_KEY = "bbBuddyBankV1";
  const PLANS_KEY = "bbSavedMeetingPlansV1";
  const NOTES_KEY = "bbMyChapterNotesV1";
  const PINS_KEY = "bbMyChapterPinsV1";

  let toolbarOpen = false;
  let activeToolbarSection = "";


  const DEFAULT_TASKS = {
    elementary: {
      organized: false,
      registration: false,
      meeting: false
    }
  };

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function profile() {
    return readJSON(PROFILE_KEY, null);
  }

  function isSignedIn() {
    const value = profile();
    return Boolean(value && value.firstName && value.schoolName && value.program);
  }

  function programLabel(program) {
    return program === "high-school" ? "High School" : "Elementary & Middle School";
  }

  function programHome(program) {
    return program === "high-school" ? "high-school.html" : "elementary-middle.html";
  }

  function monthLabel() {
    const now = new Date();
    const labels = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return labels[now.getMonth()];
  }

  function getTasks(program = profile()?.program || "elementary") {
    const saved = readJSON(TASKS_KEY, {});
    const defaults = DEFAULT_TASKS[program] || {};
    return { ...defaults, ...(saved[program] || {}) };
  }

  function setTask(task, completed, program = profile()?.program || "elementary") {
    const all = readJSON(TASKS_KEY, {});
    all[program] = { ...getTasks(program), [task]: Boolean(completed) };
    writeJSON(TASKS_KEY, all);
    dispatchChange("tasks");
    renderAll();
  }

  function taskProgress(program = profile()?.program || "elementary") {
    const tasks = getTasks(program);
    const values = Object.values(tasks);
    const total = values.length;
    const complete = values.filter(Boolean).length;
    return { complete, total };
  }

  function getCheckin() {
    return readJSON(CHECKIN_KEY, { status: "", topic: "" });
  }

  function setCheckin(value) {
    writeJSON(CHECKIN_KEY, { ...getCheckin(), ...value });
    dispatchChange("checkin");
  }

  function getBank() {
    return readJSON(BANK_KEY, []);
  }

  function getSavedPlans() {
    return readJSON(PLANS_KEY, []);
  }


  function currentPageTitle() {
    const heading = document.querySelector("main h1");
    if (heading && heading.textContent.trim()) {
      return heading.textContent.trim().replace(/\s+/g, " ");
    }

    return (document.title || "Teacher Hub")
      .replace(/\s*\|\s*Best Buddies Canada.*$/i, "")
      .trim() || "Teacher Hub";
  }

  function currentPageURL() {
    const url = new URL(window.location.href);
    return `${url.pathname.split("/").pop() || "index.html"}${url.search}${url.hash}`;
  }

  function getNotes() {
    const notes = readJSON(NOTES_KEY, []);
    return Array.isArray(notes) ? notes : [];
  }

  function addNote(text) {
    const clean = String(text || "").trim();
    if (!clean || !isSignedIn()) return false;

    const notes = getNotes();
    const note = {
      id: `note-${Date.now()}`,
      text: clean,
      title: currentPageTitle(),
      url: currentPageURL(),
      createdAt: new Date().toISOString()
    };

    notes.unshift(note);
    writeJSON(NOTES_KEY, notes.slice(0, 50));
    dispatchChange("notes");
    renderAll();
    return note;
  }

  function removeNote(id) {
    writeJSON(
      NOTES_KEY,
      getNotes().filter((note) => note.id !== id)
    );
    dispatchChange("notes");
    renderAll();
  }

  function getPins() {
    const pins = readJSON(PINS_KEY, []);
    return Array.isArray(pins) ? pins : [];
  }

  function currentPageIsPinned() {
    const url = currentPageURL();
    return getPins().some((pin) => pin.url === url);
  }

  function togglePinCurrentPage() {
    if (!isSignedIn()) return false;

    const url = currentPageURL();
    const pins = getPins();
    const existing = pins.findIndex((pin) => pin.url === url);

    if (existing >= 0) {
      pins.splice(existing, 1);
    } else {
      pins.unshift({
        id: `pin-${Date.now()}`,
        title: currentPageTitle(),
        url,
        createdAt: new Date().toISOString()
      });
    }

    writeJSON(PINS_KEY, pins.slice(0, 30));
    dispatchChange("pins");
    renderAll();
    return existing < 0;
  }

  function removePin(id) {
    writeJSON(
      PINS_KEY,
      getPins().filter((pin) => pin.id !== id)
    );
    dispatchChange("pins");
    renderAll();
  }

  function saveMeetingPlan(plan) {
    if (!isSignedIn()) return false;

    const plans = getSavedPlans();
    const normalized = {
      id: plan.id || `plan-${Date.now()}`,
      title: plan.title || "Saved meeting plan",
      month: plan.month || "",
      minutes: plan.minutes || "",
      activityIds: Array.isArray(plan.activityIds) ? plan.activityIds : [],
      activityTitles: Array.isArray(plan.activityTitles) ? plan.activityTitles : [],
      savedAt: new Date().toISOString()
    };

    plans.unshift(normalized);
    writeJSON(PLANS_KEY, plans.slice(0, 12));
    dispatchChange("plans");
    renderAll();
    return normalized;
  }

  function removeMeetingPlan(id) {
    const plans = getSavedPlans().filter((plan) => plan.id !== id);
    writeJSON(PLANS_KEY, plans);
    dispatchChange("plans");
    renderAll();
  }

  function setProfile(value) {
    writeJSON(PROFILE_KEY, value);
    dispatchChange("profile");
    renderAll();
  }

  function signOut() {
    localStorage.removeItem(PROFILE_KEY);
    dispatchChange("profile");
    renderAll();
  }

  function resetDemo() {
    [PROFILE_KEY, TASKS_KEY, CHECKIN_KEY, BANK_KEY, PLANS_KEY, NOTES_KEY, PINS_KEY].forEach((key) => {
      localStorage.removeItem(key);
    });
    dispatchChange("reset");
    renderAll();
  }

  function dispatchChange(detail) {
    window.dispatchEvent(new CustomEvent("bb:my-chapter-change", { detail }));
  }

  function navLink() {
    const signed = isSignedIn();
    return `
      <a class="bb-my-chapter-nav ${signed ? "is-signed-in" : ""}" href="my-chapter.html">
        ${signed ? "My Chapter" : "Sign in"}
      </a>
    `;
  }

  function ensureNavLink() {
    document.querySelectorAll(".portal-nav").forEach((nav) => {
      if (nav.querySelector(".bb-my-chapter-nav")) return;
      nav.insertAdjacentHTML("afterbegin", navLink());
    });

    document.querySelectorAll(".site-menu-panel").forEach((menu) => {
      if (menu.querySelector(".bb-my-chapter-menu-link")) return;
      const signed = isSignedIn();
      menu.insertAdjacentHTML(
        "afterbegin",
        `<a class="bb-my-chapter-menu-link" href="my-chapter.html">${signed ? "My Chapter" : "Sign in to My Chapter"}</a>`
      );
    });
  }

  function refreshNavLink() {
    document.querySelectorAll(".bb-my-chapter-nav").forEach((link) => {
      link.textContent = isSignedIn() ? "My Chapter" : "Sign in";
      link.classList.toggle("is-signed-in", isSignedIn());
    });

    document.querySelectorAll(".bb-my-chapter-menu-link").forEach((link) => {
      link.textContent = isSignedIn() ? "My Chapter" : "Sign in to My Chapter";
    });
  }

  function slotMarkup(slot) {
    const signed = isSignedIn();
    const variant = slot.dataset.myChapterSlot || "compact";
    const user = profile();
    const progress = taskProgress(user?.program);

    if (!signed) {
      if (variant === "home") {
        return `
          <div class="bb-personal-card bb-personal-card-home">
            <div>
              <span class="bb-personal-kicker">My Chapter</span>
              <strong>Want the Hub to remember where you are?</strong>
              <p>Sign in for chapter progress, quick check-ins, saved meeting plans, and your Buddy Bank.</p>
            </div>
            <a href="my-chapter.html">Sign in to My Chapter →</a>
          </div>
        `;
      }

      if (variant === "program") {
        return `
          <div class="bb-personal-card bb-personal-card-program">
            <div>
              <span class="bb-personal-kicker">My Chapter</span>
              <strong>Want a more personal view?</strong>
              <p>The Hub still works without signing in. Sign in if you want it to remember your chapter and where you left off.</p>
            </div>
            <a href="my-chapter.html">Sign in to My Chapter →</a>
          </div>
        `;
      }

      if (variant === "builder") {
        return `
          <div class="bb-personal-inline">
            <span><strong>Want to save your meeting plans?</strong> Sign in to My Chapter and this builder can remember them for you.</span>
            <a href="my-chapter.html">Sign in →</a>
          </div>
        `;
      }

      return `<a class="bb-personal-compact" href="my-chapter.html">Sign in to My Chapter →</a>`;
    }

    const progressText = progress.total
      ? `${progress.complete} of ${progress.total} September steps complete`
      : `${monthLabel()} · My Chapter`;

    if (variant === "home" || variant === "program") {
      return `
        <a class="bb-personal-card bb-personal-card-signed" href="my-chapter.html">
          <div>
            <span class="bb-personal-kicker">My Chapter</span>
            <strong>Hi, ${escapeHTML(user.firstName)}.</strong>
            <p>${escapeHTML(user.schoolName)} · ${escapeHTML(programLabel(user.program))}</p>
          </div>
          <span class="bb-personal-status">${escapeHTML(progressText)} →</span>
        </a>
      `;
    }

    if (variant === "builder") {
      return `
        <div class="bb-personal-inline is-signed-in">
          <span><strong>My Chapter</strong> · ${escapeHTML(user.schoolName)}</span>
          <a href="my-chapter.html">Open My Chapter →</a>
        </div>
      `;
    }

    return `<a class="bb-personal-compact is-signed-in" href="my-chapter.html">My Chapter · ${escapeHTML(progressText)} →</a>`;
  }

  function renderSlots() {
    document.querySelectorAll("[data-my-chapter-slot]").forEach((slot) => {
      slot.innerHTML = slotMarkup(slot);
    });
  }

  function renderProtectedCommunity() {
    document.querySelectorAll("[data-my-chapter-required]").forEach((element) => {
      element.hidden = !isSignedIn();
    });

    document.querySelectorAll("[data-my-chapter-locked]").forEach((element) => {
      element.hidden = isSignedIn();
    });
  }


  function toolbarMarkup() {
    const user = profile();
    const notes = getNotes();
    const pins = getPins();
    const bank = getBank();
    const plans = getSavedPlans();
    const pinned = currentPageIsPinned();

    const noteRows = notes.length
      ? notes.slice(0, 4).map((note) => `
          <article class="bb-tool-note">
            <div class="bb-tool-note-top">
              <strong>${escapeHTML(note.title)}</strong>
              <button type="button" class="bb-tool-remove" data-remove-note="${escapeHTML(note.id)}" aria-label="Delete note">×</button>
            </div>
            <p>${escapeHTML(note.text)}</p>
            <a href="${escapeHTML(note.url)}">Return to page →</a>
          </article>
        `).join("")
      : `<p class="bb-tool-empty">No sticky notes yet. Add one while you’re on a page you want to remember.</p>`;

    const pinRows = pins.length
      ? pins.slice(0, 5).map((pin) => `
          <div class="bb-tool-pin">
            <a href="${escapeHTML(pin.url)}">${escapeHTML(pin.title)} →</a>
            <button type="button" class="bb-tool-remove" data-remove-pin="${escapeHTML(pin.id)}" aria-label="Unpin page">×</button>
          </div>
        `).join("")
      : `<p class="bb-tool-empty">Nothing pinned yet.</p>`;

    return `
      <div class="bb-chapter-tools" data-chapter-tools>
        <button
          class="bb-chapter-tools-tab"
          type="button"
          aria-expanded="false"
          aria-controls="bb-chapter-tools-drawer"
          data-tools-toggle
        >
          <span class="bb-tools-tab-logo" aria-hidden="true">
            <img src="assets/bb-logo-coloured.png" alt="">
          </span>
          <span class="bb-tools-tab-label">My Chapter</span>
        </button>

        <div class="bb-chapter-tools-scrim" data-tools-close></div>

        <aside
          class="bb-chapter-tools-drawer"
          id="bb-chapter-tools-drawer"
          aria-label="My Chapter tools"
          aria-hidden="true"
        >
          <div class="bb-tools-head">
            <div>
              <span>My Chapter</span>
              <strong>${escapeHTML(user?.schoolName || "")}</strong>
            </div>
            <button type="button" class="bb-tools-close" data-tools-close aria-label="Close My Chapter tools">×</button>
          </div>

          <nav class="bb-tools-links" aria-label="My Chapter quick links">
            <a href="my-chapter.html">
              <span>My Chapter</span>
              <b>→</b>
            </a>

            <a href="buddy-board.html">
              <span>Buddy Board</span>
              <b>→</b>
            </a>

            <a href="buddy-board.html#bank">
              <span>Buddy Bank</span>
              <small>${bank.length}</small>
            </a>

            <button type="button" data-tools-section="notes">
              <span>Notes</span>
              <small>${notes.length}</small>
            </button>

            <button type="button" data-tools-section="pins">
              <span>Pinned</span>
              <small>${pins.length}</small>
            </button>

            <a href="my-chapter.html#saved-plans">
              <span>Saved Plans</span>
              <small>${plans.length}</small>
            </a>

            <a href="support.html">
              <span>Program Advisor</span>
              <b>→</b>
            </a>
          </nav>

          <section class="bb-tools-on-page">
            <span class="bb-tools-kicker">On this page</span>

            <button
              type="button"
              class="bb-tools-action ${pinned ? "is-active" : ""}"
              data-pin-current
            >
              ${pinned ? "✓ Pinned" : "Pin this page"}
            </button>

            <details class="bb-tools-note-details" data-note-details>
              <summary class="bb-tools-action">Add sticky note</summary>

              <form class="bb-tools-note-form" data-note-form>
                <label for="bb-tools-note-text">Quick note</label>
                <textarea
                  id="bb-tools-note-text"
                  name="note"
                  rows="3"
                  placeholder="What do you want to remember from this page?"
                  required
                ></textarea>
                <p>Keep notes chapter-focused. Please don’t include student names or personal information.</p>
                <div>
                  <button type="submit">Save note →</button>
                  <button type="button" data-note-cancel>Cancel</button>
                </div>
              </form>
            </details>
          </section>

          <section class="bb-tools-section" data-tools-panel="notes">
            <div class="bb-tools-section-head">
              <span class="bb-tools-kicker">Sticky notes</span>
              <small>${notes.length}</small>
            </div>
            <div class="bb-tools-note-list">${noteRows}</div>
          </section>

          <section class="bb-tools-section" data-tools-panel="pins">
            <div class="bb-tools-section-head">
              <span class="bb-tools-kicker">Pinned</span>
              <small>${pins.length}</small>
            </div>
            <div class="bb-tools-pin-list">${pinRows}</div>
          </section>
        </aside>
      </div>
    `;
  }

  function ensureToolbar() {
    const existing = document.querySelector("[data-chapter-tools]");

    if (!isSignedIn()) {
      existing?.remove();
      toolbarOpen = false;
      activeToolbarSection = "";
      document.body.classList.remove("bb-tools-open");
      return;
    }

    const markup = toolbarMarkup();

    if (!existing) {
      document.body.insertAdjacentHTML("beforeend", markup);
    } else {
      existing.outerHTML = markup;
    }

    applyToolbarState();
  }

  function applyToolbarState() {
    const wrap = document.querySelector("[data-chapter-tools]");
    if (!wrap) return;

    wrap.classList.toggle("is-open", toolbarOpen);
    document.body.classList.toggle("bb-tools-open", toolbarOpen);

    const drawer = wrap.querySelector(".bb-chapter-tools-drawer");
    const toggle = wrap.querySelector("[data-tools-toggle]");

    drawer?.setAttribute("aria-hidden", toolbarOpen ? "false" : "true");
    toggle?.setAttribute("aria-expanded", toolbarOpen ? "true" : "false");

    wrap.querySelectorAll("[data-tools-panel]").forEach((panel) => {
      panel.classList.toggle(
        "is-highlighted",
        Boolean(activeToolbarSection) &&
        panel.dataset.toolsPanel === activeToolbarSection
      );
    });
  }

  function openToolbar() {
    toolbarOpen = true;
    applyToolbarState();
  }

  function closeToolbar() {
    toolbarOpen = false;
    applyToolbarState();
  }

  function showToolSection(name) {
    activeToolbarSection = name || "";
    openToolbar();

    requestAnimationFrame(() => {
      const panel = document.querySelector(
        `[data-chapter-tools] [data-tools-panel="${name}"]`
      );

      panel?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  }


  function closeNoteForm() {
    const details = document.querySelector("[data-chapter-tools] [data-note-details]");
    const form = document.querySelector("[data-chapter-tools] [data-note-form]");

    if (form) form.reset();
    if (details) details.open = false;
  }

  function handleToolbarClick(event) {
    const wrap = event.target.closest("[data-chapter-tools]");
    if (!wrap) return;

    const toggle = event.target.closest("[data-tools-toggle]");
    if (toggle) {
      event.preventDefault();
      toolbarOpen ? closeToolbar() : openToolbar();
      return;
    }

    const close = event.target.closest("[data-tools-close]");
    if (close) {
      event.preventDefault();
      closeToolbar();
      return;
    }

    const sectionButton = event.target.closest("[data-tools-section]");
    if (sectionButton) {
      event.preventDefault();
      showToolSection(sectionButton.dataset.toolsSection);
      return;
    }

    const pinButton = event.target.closest("[data-pin-current]");
    if (pinButton) {
      event.preventDefault();
      toolbarOpen = true;
      togglePinCurrentPage();
      return;
    }

    const noteOpen = event.target.closest("[data-add-note-open]");
    if (noteOpen) {
      event.preventDefault();
      openNoteForm();
      return;
    }

    const noteCancel = event.target.closest("[data-note-cancel]");
    if (noteCancel) {
      event.preventDefault();
      closeNoteForm();
      return;
    }

    const removeNoteButton = event.target.closest("[data-remove-note]");
    if (removeNoteButton) {
      event.preventDefault();
      toolbarOpen = true;
      activeToolbarSection = "notes";
      removeNote(removeNoteButton.dataset.removeNote);
      return;
    }

    const removePinButton = event.target.closest("[data-remove-pin]");
    if (removePinButton) {
      event.preventDefault();
      toolbarOpen = true;
      activeToolbarSection = "pins";
      removePin(removePinButton.dataset.removePin);
    }
  }

  function handleToolbarSubmit(event) {
    const form = event.target.closest("[data-chapter-tools] [data-note-form]");
    if (!form) return;

    event.preventDefault();

    const field = form.querySelector('textarea[name="note"]');
    const value = field?.value || "";

    if (!value.trim()) {
      field?.focus();
      return;
    }

    toolbarOpen = true;
    activeToolbarSection = "notes";

    const saved = addNote(value);

    if (saved) {
      closeNoteForm();

      requestAnimationFrame(() => {
        showToolSection("notes");
      });
    }
  }

  function bindToolbarDelegation() {
    if (document.documentElement.dataset.bbToolsBound === "true") return;

    document.documentElement.dataset.bbToolsBound = "true";

    document.addEventListener("click", handleToolbarClick);
    document.addEventListener("submit", handleToolbarSubmit);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toolbarOpen) {
        closeToolbar();
      }
    });
  }

  function renderAll() {
    ensureNavLink();
    refreshNavLink();
    renderSlots();
    renderProtectedCommunity();
    ensureToolbar();
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.BBMyChapter = {
    PROFILE_KEY,
    TASKS_KEY,
    CHECKIN_KEY,
    BANK_KEY,
    PLANS_KEY,
    NOTES_KEY,
    PINS_KEY,
    isSignedIn,
    getProfile: profile,
    setProfile,
    signOut,
    resetDemo,
    getTasks,
    setTask,
    taskProgress,
    getCheckin,
    setCheckin,
    getBank,
    getSavedPlans,
    getNotes,
    addNote,
    removeNote,
    getPins,
    togglePinCurrentPage,
    removePin,
    saveMeetingPlan,
    removeMeetingPlan,
    programLabel,
    programHome,
    renderAll
  };

  bindToolbarDelegation();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll, { once: true });
  } else {
    renderAll();
  }
})();

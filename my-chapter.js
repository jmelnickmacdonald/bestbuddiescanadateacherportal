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
    [PROFILE_KEY, TASKS_KEY, CHECKIN_KEY, BANK_KEY, PLANS_KEY].forEach((key) => {
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
        ${signed ? "My Chapter" : "My Chapter · Sign in"}
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
        `<a class="bb-my-chapter-menu-link" href="my-chapter.html">${signed ? "My Chapter" : "My Chapter · Sign in"}</a>`
      );
    });
  }

  function refreshNavLink() {
    document.querySelectorAll(".bb-my-chapter-nav").forEach((link) => {
      link.textContent = isSignedIn() ? "My Chapter" : "My Chapter · Sign in";
      link.classList.toggle("is-signed-in", isSignedIn());
    });

    document.querySelectorAll(".bb-my-chapter-menu-link").forEach((link) => {
      link.textContent = isSignedIn() ? "My Chapter" : "My Chapter · Sign in";
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

  function renderAll() {
    ensureNavLink();
    refreshNavLink();
    renderSlots();
    renderProtectedCommunity();
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
    saveMeetingPlan,
    removeMeetingPlan,
    programLabel,
    programHome,
    renderAll
  };

  document.addEventListener("DOMContentLoaded", renderAll);
})();

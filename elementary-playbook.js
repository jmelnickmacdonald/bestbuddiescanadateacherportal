(() => {
  "use strict";

  const storageKey = "bbElementaryPlaybookChecksV2";
  const checks = [...document.querySelectorAll("[data-playbook-check]")];
  const reset = document.querySelector("[data-reset-playbook]");

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch (_) {
    saved = {};
  }

  checks.forEach((check) => {
    const id = check.dataset.playbookCheck;
    check.checked = Boolean(saved[id]);

    check.addEventListener("change", () => {
      saved[id] = check.checked;
      try {
        localStorage.setItem(storageKey, JSON.stringify(saved));
      } catch (_) {}
    });
  });

  reset?.addEventListener("click", () => {
    saved = {};
    checks.forEach((check) => {
      check.checked = false;
    });

    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
  });

  function openHashStage() {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target?.matches("details.epb-stage")) {
      target.open = true;
    }
  }

  openHashStage();
  window.addEventListener("hashchange", openHashStage);
})();

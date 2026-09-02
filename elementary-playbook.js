(() => {
  "use strict";

  const storageKey = "bbElementaryPlaybookChecksV2";
  const checks = [...document.querySelectorAll("[data-playbook-check]")];
  const reset = document.querySelector("[data-reset-playbook]");
  const progressLabel = document.querySelector("[data-progress-label]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const stageCounts = [...document.querySelectorAll("[data-stage-count]")];

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
      updateProgress();
    });
  });

  function updateProgress() {
    const complete = checks.filter((check) => check.checked).length;
    const total = checks.length;
    const pct = total ? Math.round((complete / total) * 100) : 0;

    if (progressLabel) {
      progressLabel.textContent = `${complete} of ${total} checked`;
    }

    if (progressBar) {
      progressBar.style.width = `${pct}%`;
    }

    stageCounts.forEach((node) => {
      const stage = node.dataset.stageCount;
      const stageChecks = checks.filter((check) => check.dataset.stage === stage);
      const stageDone = stageChecks.filter((check) => check.checked).length;
      node.textContent = `${stageDone} / ${stageChecks.length}`;
    });
  }

  reset?.addEventListener("click", () => {
    saved = {};
    checks.forEach((check) => {
      check.checked = false;
    });

    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}

    updateProgress();
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

  updateProgress();
})();

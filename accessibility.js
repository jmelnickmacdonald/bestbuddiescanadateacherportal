/* =========================================================
   BEST BUDDIES CANADA TEACHER HUB
   Accessibility preferences
   File: accessibility.js
========================================================= */

(() => {
  "use strict";

  const KEY = "bbTeacherHubAccessibility";

  const defaults = {
    text: "default",
    contrast: "default",
    links: "default",
    spacing: "default",
    focus: "default",
    motion: "default"
  };

  function loadSettings() {
    try {
      return {
        ...defaults,
        ...JSON.parse(localStorage.getItem(KEY) || "{}")
      };
    } catch {
      return { ...defaults };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(KEY, JSON.stringify(settings));
  }

  function applySettings(settings) {
    const root = document.documentElement;

    root.dataset.a11yText = settings.text;
    root.dataset.a11yContrast = settings.contrast;
    root.dataset.a11yLinks = settings.links;
    root.dataset.a11ySpacing = settings.spacing;
    root.dataset.a11yFocus = settings.focus;
    root.dataset.a11yMotion = settings.motion;
  }

  function buildUI() {
    const launcher = document.createElement("button");

    launcher.className = "accessibility-launcher";
    launcher.type = "button";
    launcher.setAttribute(
      "aria-label",
      "Accessibility adjustments"
    );
    launcher.setAttribute(
      "aria-expanded",
      "false"
    );
    launcher.setAttribute(
      "aria-controls",
      "accessibility-panel"
    );

    launcher.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="4.5" r="2"></circle>
        <path d="M5 8.5h14"></path>
        <path d="M12 7v6"></path>
        <path d="M8.5 21 12 13l3.5 8"></path>
        <path d="M8 11 5.5 15"></path>
        <path d="M16 11 18.5 15"></path>
      </svg>
    `;

    const panel = document.createElement("section");

    panel.className = "accessibility-panel";
    panel.id = "accessibility-panel";
    panel.hidden = true;
    panel.setAttribute(
      "aria-label",
      "Accessibility adjustments"
    );

    panel.innerHTML = `
      <div class="accessibility-panel-header">

        <div>
          <span class="accessibility-panel-kicker">
            Teacher Hub
          </span>

          <h2>
            Accessibility adjustments
          </h2>
        </div>

        <button
          class="accessibility-close"
          type="button"
          aria-label="Close accessibility adjustments"
        >
          ×
        </button>

      </div>

      <div class="accessibility-group">

        <span class="accessibility-group-label">
          Text size
        </span>

        <div class="accessibility-choice-row">

          <button
            class="accessibility-choice"
            type="button"
            data-setting="text"
            data-value="default"
          >
            Default
          </button>

          <button
            class="accessibility-choice"
            type="button"
            data-setting="text"
            data-value="large"
          >
            Larger
          </button>

          <button
            class="accessibility-choice"
            type="button"
            data-setting="text"
            data-value="larger"
          >
            Largest
          </button>

        </div>

      </div>

      <div class="accessibility-group">

        <span class="accessibility-group-label">
          Reading & navigation
        </span>

        <div class="accessibility-choice-row">

          <button
            class="accessibility-toggle"
            type="button"
            data-setting="contrast"
            data-on="high"
          >
            High contrast
          </button>

          <button
            class="accessibility-toggle"
            type="button"
            data-setting="links"
            data-on="underline"
          >
            Underline links
          </button>

          <button
            class="accessibility-toggle"
            type="button"
            data-setting="spacing"
            data-on="comfortable"
          >
            More spacing
          </button>

          <button
            class="accessibility-toggle"
            type="button"
            data-setting="focus"
            data-on="strong"
          >
            Stronger focus
          </button>

          <button
            class="accessibility-toggle"
            type="button"
            data-setting="motion"
            data-on="reduce"
          >
            Reduce motion
          </button>

        </div>

      </div>

      <button
        class="accessibility-reset"
        type="button"
      >
        Reset adjustments
      </button>
    `;

    document.body.append(
      launcher,
      panel
    );

    return {
      launcher,
      panel
    };
  }

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      let settings = loadSettings();

      applySettings(settings);

      const {
        launcher,
        panel
      } = buildUI();

      const close =
        panel.querySelector(
          ".accessibility-close"
        );

      const reset =
        panel.querySelector(
          ".accessibility-reset"
        );

      function syncButtons() {

        panel
          .querySelectorAll(
            "[data-setting][data-value]"
          )
          .forEach(button => {

            button.setAttribute(
              "aria-pressed",
              settings[
                button.dataset.setting
              ] ===
              button.dataset.value
                ? "true"
                : "false"
            );

          });

        panel
          .querySelectorAll(
            "[data-setting][data-on]"
          )
          .forEach(button => {

            button.setAttribute(
              "aria-pressed",
              settings[
                button.dataset.setting
              ] ===
              button.dataset.on
                ? "true"
                : "false"
            );

          });

      }

      function openPanel() {

        panel.hidden = false;

        launcher.setAttribute(
          "aria-expanded",
          "true"
        );

        try {
          close.focus({
            preventScroll: true
          });
        } catch {
          close.focus();
        }

      }

      function closePanel() {

        panel.hidden = true;

        launcher.setAttribute(
          "aria-expanded",
          "false"
        );

        try {
          launcher.focus({
            preventScroll: true
          });
        } catch {
          launcher.focus();
        }

      }

      launcher.addEventListener(
        "click",
        () => {

          if (panel.hidden) {
            openPanel();
          } else {
            closePanel();
          }

        }
      );

      close.addEventListener(
        "click",
        closePanel
      );

      panel.addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              "[data-setting]"
            );

          if (!button) {
            return;
          }

          const setting =
            button.dataset.setting;

          if (button.dataset.value) {

            settings[setting] =
              button.dataset.value;

          } else if (
            button.dataset.on
          ) {

            settings[setting] =
              settings[setting] ===
              button.dataset.on
                ? "default"
                : button.dataset.on;

          }

          saveSettings(settings);

          applySettings(settings);

          syncButtons();

        }
      );

      reset.addEventListener(
        "click",
        () => {

          settings = {
            ...defaults
          };

          saveSettings(settings);

          applySettings(settings);

          syncButtons();

        }
      );

      document.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Escape" &&
            !panel.hidden
          ) {
            closePanel();
          }

        }
      );

      syncButtons();

    }
  );

})();

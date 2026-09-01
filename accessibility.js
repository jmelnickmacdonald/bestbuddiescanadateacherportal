/* =========================================================
   BEST BUDDIES CANADA TEACHER HUB
   Accessibility preferences
   File: accessibility.js
========================================================= */

(() => {
  "use strict";

  const STORAGE_KEY = "bbTeacherHubAccessibility";

  const defaults = {
    text: "default",
    contrast: "default",
    links: "default",
    spacing: "default",
    focus: "default",
    motion: "default"
  };


  /* =======================================================
     SETTINGS
  ======================================================= */

  function loadSettings() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      return {
        ...defaults,
        ...saved
      };
    } catch {
      return { ...defaults };
    }
  }


  function saveSettings(settings) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );
    } catch {
      /* Preferences still work for the current page
         if localStorage is unavailable. */
    }
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


  /* =======================================================
     BUILD ACCESSIBILITY UI
  ======================================================= */

  function buildAccessibilityUI() {

    const launcher = document.createElement("button");

    launcher.className = "accessibility-launcher";
    launcher.type = "button";

    launcher.setAttribute(
      "aria-label",
      "Accessibility options"
    );

    launcher.setAttribute(
      "aria-expanded",
      "false"
    );

    launcher.setAttribute(
      "aria-controls",
      "accessibility-panel"
    );


    /* Universal Access icon */
    launcher.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="2.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="4.25" r="2.25"></circle>

        <path d="M5 8.5h14"></path>

        <path d="M12 8.5v5"></path>

        <path d="M8.5 21 12 13.5 15.5 21"></path>

        <path d="M8.25 11 5.5 15"></path>

        <path d="M15.75 11 18.5 15"></path>
      </svg>

      <span class="accessibility-launcher-label">
        Accessibility options
      </span>
    `;


    const panel = document.createElement("section");

    panel.className = "accessibility-panel";
    panel.id = "accessibility-panel";
    panel.hidden = true;

    panel.setAttribute(
      "role",
      "dialog"
    );

    panel.setAttribute(
      "aria-labelledby",
      "accessibility-panel-title"
    );


    panel.innerHTML = `
      <div class="accessibility-panel-header">

        <div>
          <span class="accessibility-panel-kicker">
            Teacher Hub
          </span>

          <h2 id="accessibility-panel-title">
            Accessibility options
          </h2>
        </div>


        <button
          class="accessibility-close"
          type="button"
          aria-label="Close accessibility options"
        >
          ×
        </button>

      </div>


      <p class="accessibility-panel-intro">
        Adjust how the Teacher Hub looks and feels on this device.
      </p>


      <div class="accessibility-group">

        <span class="accessibility-group-label">
          Text size
        </span>

        <div
          class="accessibility-choice-row"
          role="group"
          aria-label="Text size"
        >

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
          Reading &amp; navigation
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


  /* =======================================================
     INITIALIZE
  ======================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      let settings = loadSettings();

      applySettings(settings);


      const {
        launcher,
        panel
      } = buildAccessibilityUI();


      const closeButton =
        panel.querySelector(
          ".accessibility-close"
        );


      const resetButton =
        panel.querySelector(
          ".accessibility-reset"
        );


      /* ===================================================
         UPDATE BUTTON STATES
      =================================================== */

      function syncButtons() {

        panel
          .querySelectorAll(
            "[data-setting][data-value]"
          )
          .forEach(button => {

            const active =
              settings[
                button.dataset.setting
              ] ===
              button.dataset.value;


            button.setAttribute(
              "aria-pressed",
              active
                ? "true"
                : "false"
            );

          });


        panel
          .querySelectorAll(
            "[data-setting][data-on]"
          )
          .forEach(button => {

            const active =
              settings[
                button.dataset.setting
              ] ===
              button.dataset.on;


            button.setAttribute(
              "aria-pressed",
              active
                ? "true"
                : "false"
            );

          });

      }


      /* ===================================================
         OPEN / CLOSE
      =================================================== */

      function openPanel() {

        panel.hidden = false;

        launcher.setAttribute(
          "aria-expanded",
          "true"
        );


        try {
          closeButton.focus({
            preventScroll: true
          });
        } catch {
          closeButton.focus();
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


      closeButton.addEventListener(
        "click",
        closePanel
      );


      /* ===================================================
         SETTING BUTTONS
      =================================================== */

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


          /* Radio-style options */
          if (button.dataset.value) {

            settings[setting] =
              button.dataset.value;

          }


          /* Toggle options */
          else if (button.dataset.on) {

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


      /* ===================================================
         RESET
      =================================================== */

      resetButton.addEventListener(
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


      /* ===================================================
         ESCAPE KEY
      =================================================== */

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


      /* ===================================================
         CLOSE WHEN CLICKING OUTSIDE
      =================================================== */

      document.addEventListener(
        "pointerdown",
        event => {

          if (
            panel.hidden ||
            panel.contains(event.target) ||
            launcher.contains(event.target)
          ) {
            return;
          }


          panel.hidden = true;

          launcher.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );


      syncButtons();

    }
  );

})();

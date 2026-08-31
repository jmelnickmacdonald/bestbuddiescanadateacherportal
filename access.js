/* =========================================================
   BEST BUDDIES TEACHER HUB
   Prototype access gate
========================================================= */

const PROTOTYPE_PASSWORD = "BestBuddies2026";
const ACCESS_KEY = "bestBuddiesTeacherHubAccess";

function hasTeacherAccess() {
  return sessionStorage.getItem(ACCESS_KEY) === "granted";
}

function grantTeacherAccess() {
  sessionStorage.setItem(ACCESS_KEY, "granted");
}

function removeTeacherAccess() {
  sessionStorage.removeItem(ACCESS_KEY);
}

function getProgramLabel() {
  const program = document.body.dataset.program;

  if (program === "elementary-middle") {
    return "Elementary & Middle School";
  }

  if (program === "high-school") {
    return "High School";
  }

  return "Teacher Hub";
}

function goToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
}

function openAccessGate() {
  goToTop();

  if (hasTeacherAccess()) {
    document.body.classList.remove("access-locked", "access-pending");
    requestAnimationFrame(goToTop);
    return;
  }

  document.body.classList.add("access-locked");
  document.body.classList.remove("access-pending");

  document.querySelector(".access-gate")?.remove();

  const gate = document.createElement("div");

  gate.className = "access-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "access-title");

  gate.innerHTML = `
    <div class="access-gate-card">

      <img
        src="assets/bb-logo.png"
        alt="Best Buddies Canada"
        class="access-logo"
      >

      <div class="access-kicker">
        Teacher Hub
      </div>

      <div class="access-program">
        ${getProgramLabel()}
      </div>

      <h1 id="access-title">
        Welcome back.
      </h1>

      <p class="access-intro">
        Enter the Teacher Hub password to open this program area.
      </p>

      <form id="access-form">

        <label for="teacher-password">
          Password
        </label>

        <input
          type="password"
          id="teacher-password"
          name="teacher-password"
          autocomplete="current-password"
          required
        >

        <p
          id="access-error"
          class="access-error"
          aria-live="polite"
        ></p>

        <button
          type="submit"
          class="access-button"
        >
          Continue
        </button>

      </form>

      <p class="access-help">
        Need access? Contact your Best Buddies Program Advisor.
      </p>

      <a
        href="index.html"
        class="access-back"
      >
        ← Back to Teacher Hub
      </a>

    </div>
  `;

  document.body.appendChild(gate);

  const form = document.getElementById("access-form");
  const passwordInput = document.getElementById("teacher-password");
  const error = document.getElementById("access-error");

  requestAnimationFrame(() => {
    goToTop();

    try {
      passwordInput.focus({ preventScroll: true });
    } catch {
      passwordInput.focus();
      goToTop();
    }
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PROTOTYPE_PASSWORD) {
      grantTeacherAccess();

      document.body.classList.remove("access-locked");

      gate.classList.add("access-gate-exit");

      setTimeout(() => {
        gate.remove();
        goToTop();
      }, 180);

    } else {
      error.textContent =
        "That password doesn’t look right. Please try again.";

      passwordInput.select();
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const protectedPage =
    document.body.dataset.protected === "true";

  if (protectedPage) {
    goToTop();

    requestAnimationFrame(() => {
      goToTop();
      openAccessGate();
    });
  }
});

/* =========================================================
   BEST BUDDIES TEACHER HUB
   Prototype access gate

   IMPORTANT:
   This is suitable for a prototype only.
   It is not secure authentication for a production website.
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


function openAccessGate() {

  if (hasTeacherAccess()) {
    document.body.classList.remove("access-locked");
    return;
  }


  document.body.classList.add("access-locked");


  const gate = document.createElement("div");

  gate.className = "access-gate";

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

      <h1>
        Welcome back.
      </h1>

      <p class="access-intro">
        This area includes additional resources and guidance
        for teachers and Staff Advisors supporting Best Buddies chapters.
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
          Enter Teacher Hub
        </button>

      </form>

      <p class="access-help">
        Need access?
        Contact your Best Buddies Program Advisor.
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


  setTimeout(() => {
    passwordInput.focus();
  }, 100);


  form.addEventListener("submit", function(event) {

    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();


    if (enteredPassword === PROTOTYPE_PASSWORD) {

      grantTeacherAccess();

      document.body.classList.remove("access-locked");

      gate.classList.add("access-gate-exit");


      setTimeout(() => {
        gate.remove();
      }, 250);

    } else {

      error.textContent = "That password doesn’t look right. Please try again.";

      passwordInput.select();

    }

  });

}


document.addEventListener("DOMContentLoaded", function() {

  const protectedPage =
    document.body.dataset.protected === "true";


  if (protectedPage) {
    openAccessGate();
  }

});

(() => {
  "use strict";

  const applyMonthFromUrl = () => {
    const select = document.querySelector("[data-gb-month]");
    if (!select) return;

    const requested = new URLSearchParams(window.location.search)
      .get("month")
      ?.trim()
      .toLowerCase();

    const allowed = new Set(["september","october","november","december","january","any"]);
    if (!requested || !allowed.has(requested)) return;

    if (select.value !== requested) {
      select.value = requested;
      select.dispatchEvent(new Event("change", { bubbles:true }));
    }
  };

  // This file is loaded after gathering-builder.js. Apply once immediately,
  // then once on the next tick so the builder has finished its first render.
  applyMonthFromUrl();
  window.setTimeout(applyMonthFromUrl, 0);
})();

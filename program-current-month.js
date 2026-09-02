(() => {
  const section = document.querySelector(".simple-current-month");
  if (!section) return;

  const program = document.body.dataset.program;
  if (program !== "elementary-middle") return;

  const label = section.querySelector(".simple-current-label");
  const title = section.querySelector("#current-month-title");
  const copy = section.querySelector(".simple-current-month p");
  const button = section.querySelector(".simple-current-button");

  if (!label || !title || !copy || !button) return;

  const months = {
    8: {
      label: "September",
      title: "Getting Set Up",
      copy:
        "Start the year by getting the word out, connecting with your Program Advisor, and choosing a first gathering date when your group is ready.",
      button: "Plan September →",
      href: "elementary-september.html"
    },

    9: {
      label: "October",
      title: "Meet & Greet",
      copy:
        "Bring your group together, get to know one another, complete Sensitivity Training, and keep recruitment going as needed.",
      button: "Plan October →",
      href: "elementary-october.html"
    }
  };

  const now = new Date();
  const current = months[now.getMonth()];

  if (current) {
    label.textContent = current.label;
    title.textContent = current.title;
    copy.textContent = current.copy;
    button.textContent = current.button;
    button.href = current.href;
    return;
  }

  const monthName = new Intl.DateTimeFormat("en-CA", {
    month: "long"
  }).format(now);

  label.textContent = monthName;
  title.textContent = "See what’s happening this month";
  copy.textContent =
    "Check the month-by-month planning page for current priorities, activities, and reminders.";
  button.textContent = `Open ${monthName} →`;
  button.href = "elementary-months.html";
})();

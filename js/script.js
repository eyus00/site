const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");

/* ===============================
   THEME HANDLING
================================ */

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggle.checked = savedTheme === "light";
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";

  root.setAttribute("data-theme", systemTheme);
  themeToggle.checked = systemTheme === "light";
}

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

/* ===============================
   CLIPBOARD HANDLING
================================ */

function showNotification(text) {
  notification.textContent = text;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

username.addEventListener("click", () => {
  navigator.clipboard.writeText(username.textContent)
    .then(() => showNotification("Username copied to clipboard!"))
    .catch(console.error);
});

emailText.addEventListener("click", () => {
  navigator.clipboard.writeText(emailText.textContent)
    .then(() => showNotification("Email copied to clipboard!"))
    .catch(console.error);
});

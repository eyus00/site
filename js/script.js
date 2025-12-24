const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const favicon = document.getElementById("favicon");

/* ===============================
   THEME HANDLING + FAVICON
================================ */

const lightLogo = "media/1.svg"; // light logo (used for dark theme)
const darkLogo = "media/2.svg";  // dark logo (used for light theme)

function updateTheme(theme) {
  // theme: "light" or "dark"
  root.setAttribute("data-theme", theme);
  favicon.href = theme === "light" ? darkLogo : lightLogo;

  // Show correct logo on page
  document.querySelector(".logo-light-on-dark").style.display = theme === "dark" ? "block" : "none";
  document.querySelector(".logo-dark-on-light").style.display = theme === "light" ? "block" : "none";

  // Update switcher
  themeToggle.checked = theme === "light";
}

// Determine initial theme
let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  updateTheme(savedTheme);
} else {
  // No saved preference, use system mode
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";
  updateTheme(systemTheme);
}

// Save manual toggle
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateTheme(newTheme);
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

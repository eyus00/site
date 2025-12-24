const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const favicon = document.getElementById("favicon");

/* ===============================
   THEME HANDLING + FAVICON
   Ranking system:
   1. Saved user preference
   2. System mode (if no saved preference)
================================ */

const lightLogo = "media/1.svg"; // light logo (for dark theme)
const darkLogo = "media/2.svg";  // dark logo (for light theme)

// ICO favicons
const lightFavicon = "media/1.ico"; // for dark theme
const darkFavicon = "media/2.ico";  // for light theme

function updateTheme(theme) {
  root.setAttribute("data-theme", theme);

  // Update page logo
  document.querySelector(".logo-light-on-dark").style.display = theme === "dark" ? "block" : "none";
  document.querySelector(".logo-dark-on-light").style.display = theme === "light" ? "block" : "none";

  // Update favicon
  favicon.href = theme === "light" ? darkFavicon : lightFavicon;

  // Update switcher
  themeToggle.checked = theme === "light";
}

// Determine initial theme
let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  updateTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";
  updateTheme(systemTheme);
}

// Manual toggle
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

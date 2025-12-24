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

const lightFavicon32 = "media/2_32.png";  // light logo for dark theme
const lightFavicon180 = "media/2_180.png";
const darkFavicon32 = "media/1_32.png";   // dark logo for light theme
const darkFavicon180 = "media/1_180.png";

function updateTheme(theme) {
  root.setAttribute("data-theme", theme);

  // Update favicon
  favicon.href = theme === "light" ? darkFavicon32 : lightFavicon32;

  // Update Apple touch icon for iOS
  const appleTouch = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleTouch) appleTouch.href = theme === "light" ? darkFavicon180 : lightFavicon180;

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

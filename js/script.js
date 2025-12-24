const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const favicon = document.getElementById("favicon");

/* ===============================
   THEME HANDLING + FAVICON
================================ */

// Paths for logos
const lightLogo = "media/1.svg"; // light logo (used in dark mode)
const darkLogo = "media/2.svg";  // dark logo (used in light mode)

function updateFavicon(theme) {
  // theme: "light" or "dark"
  favicon.href = theme === "light" ? darkLogo : lightLogo;
}

// Load saved theme or fall back to system preference
const savedTheme = localStorage.getItem("theme");

let currentTheme;
if (savedTheme) {
  currentTheme = savedTheme;
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  currentTheme = prefersDark ? "dark" : "light";
}

root.setAttribute("data-theme", currentTheme);
themeToggle.checked = currentTheme === "light";
updateFavicon(currentTheme);

// Save manual toggle and update favicon
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateFavicon(newTheme);
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

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const logo = document.getElementById("logo");

/* ===============================
   THEME HANDLING
================================ */

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.checked = theme === "light";

  logo.src =
    theme === "light"
      ? "media/Dark_Maroon_No_BG.svg"
      : "media/Light_Grey_No_BG.svg";
}

// Load saved theme or system preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

// Manual toggle
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "light" : "dark";
  applyTheme(newTheme);
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
    .then(() => showNotification("Username copied to clipboard!"));
});

emailText.addEventListener("click", () => {
  navigator.clipboard.writeText(emailText.textContent)
    .then(() => showNotification("Email copied to clipboard!"));
});

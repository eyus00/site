const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const logo = document.getElementById("logo");
const favicon = document.getElementById("favicon");

const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");

const logos = {
  light: "media/Dark_Maroon_No_BG.svg",
  dark: "media/Light_Grey_No_BG.svg"
};

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.checked = theme === "light";

  logo.src = logos[theme];
  favicon.href = logos[theme];

  localStorage.setItem("theme", theme);
}

/* Load theme */
const saved = localStorage.getItem("theme");
if (saved) {
  applyTheme(saved);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

/* Toggle */
toggle.addEventListener("change", () => {
  applyTheme(toggle.checked ? "light" : "dark");
});

/* Clipboard */
function showNotification(text) {
  notification.textContent = text;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

username.addEventListener("click", () => {
  navigator.clipboard.writeText(username.textContent)
    .then(() => showNotification("Username copied!"));
});

emailText.addEventListener("click", () => {
  navigator.clipboard.writeText(emailText.textContent)
    .then(() => showNotification("Email copied!"));
});

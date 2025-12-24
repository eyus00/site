const root = document.documentElement;
const logo = document.querySelector(".logo");
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const favicon = document.getElementById("favicon");

const lightFavicon = "media/2.png";
const darkFavicon = "media/1.png";

function updateTheme(theme) {
  root.setAttribute("data-theme", theme);
  favicon.href = theme === "light" ? lightFavicon : darkFavicon;
}

// Initial theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  updateTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  updateTheme(prefersDark ? "dark" : "light");
}

// Toggle theme on logo click
logo.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  updateTheme(next);
});

// Clipboard + notification
function showNotification(text) {
  notification.textContent = text;
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

username.addEventListener("click", () => {
  navigator.clipboard.writeText(username.textContent)
    .then(() => showNotification("Username copied"));
});

emailText.addEventListener("click", () => {
  navigator.clipboard.writeText(emailText.textContent)
    .then(() => showNotification("Email copied"));
});
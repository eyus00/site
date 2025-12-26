const root = document.documentElement;
const username = document.getElementById("username");
const emailText = document.getElementById("email-text");
const notification = document.getElementById("notification");
const logo = document.querySelector(".logo");

/* ===============================
   THEME HANDLING
================================ */
function updateTheme(theme) {
  root.setAttribute("data-theme", theme);
}

// Initial theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  updateTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  updateTheme(prefersDark ? "dark" : "light");
}

// Toggle theme by clicking logo
logo.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
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

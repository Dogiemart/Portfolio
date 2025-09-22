const toggleBtn = document.getElementById("dark-mode-toggle");
const darkIcon = document.getElementById("dark-mode-icon");
const page = document.querySelector(".page");
const editButtons = document.querySelectorAll(".edit-btn");

if (localStorage.getItem("theme") === "dark") {
  page.classList.add("dark");
  darkIcon.src = "light.png";
}

toggleBtn.addEventListener("click", () => {
  page.classList.toggle("dark");
  if (page.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    darkIcon.src = "light.png";
  } else {
    localStorage.setItem("theme", "light");
    darkIcon.src = "dark.png";
  }
});

editButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const element = document.getElementById(targetId);

    if (element.isContentEditable) {
      element.contentEditable = "false";
      btn.textContent = "Edit";
      localStorage.setItem(targetId, element.innerHTML);
    } else {
      element.contentEditable = "true";
      element.focus();
      btn.textContent = "Save";
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[id]").forEach((el) => {
    const saved = localStorage.getItem(el.id);
    if (saved) el.innerHTML = saved;
  });
});

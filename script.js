const toggleBtn = document.getElementById("dark-mode-toggle");
const page = document.querySelector(".page");

if (localStorage.getItem("theme") === "dark") {
  page.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  page.classList.toggle("dark");
  if (page.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

function toggleEdit(id, button) {
  const element = document.getElementById(id);
  if (element.isContentEditable) {
    element.contentEditable = "false";
    button.textContent = "Edit";
  } else {
    element.contentEditable = "true";
    element.focus();
    button.textContent = "Save";
  }
}

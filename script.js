const toggleBtn = document.getElementById("dark-mode-toggle");
const darkIcon = document.getElementById("dark-mode-icon");
const page = document.querySelector(".page");
const editButtons = document.querySelectorAll(".edit-btn");
const backToTop = document.querySelector(".back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

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

    if (targetId === "skills-list") {
      const items = element.querySelectorAll("li");
      if (items[0].isContentEditable) {
        items.forEach(li => li.contentEditable = "false");
        btn.textContent = "Edit";
        localStorage.setItem("skills-list", element.innerHTML);
      } else {
        items.forEach(li => li.contentEditable = "true");
        items[0].focus();
        btn.textContent = "Save";
      }
    } else {
      if (element.isContentEditable) {
        element.contentEditable = "false";
        btn.textContent = "Edit";
        localStorage.setItem(targetId, element.innerHTML);
      } else {
        element.contentEditable = "true";
        element.focus();
        btn.textContent = "Save";
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[id]").forEach((el) => {
    const saved = localStorage.getItem(el.id);
    if (saved) el.innerHTML = saved;
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

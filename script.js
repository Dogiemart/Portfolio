const toggleBtn = document.getElementById("dark-mode-toggle");
const darkIcon = document.getElementById("dark-mode-icon");
const page = document.querySelector(".page");
const editButtons = document.querySelectorAll(".edit-btn");
const navLinks = document.querySelectorAll("nav ul li a");
const backToTop = document.querySelector(".back-to-top");

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

window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  if (window.scrollY > 200) {
    backToTop.style.opacity = "1";
    backToTop.style.pointerEvents = "auto";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.pointerEvents = "none";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

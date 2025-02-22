document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Cierra el menú al hacer clic en un enlace
  document.querySelectorAll(".navbar-collapse a").forEach(function (el) {
      el.addEventListener("click", function () {
          let navbar = document.querySelector(".navbar-collapse");
          if (navbar.classList.contains("show")) {
              let bsCollapse = new bootstrap.Collapse(navbar);
              bsCollapse.hide();
          }
      });
  });

  // Scroll suave a los enlaces con clase .smoothscroll
  document.querySelectorAll(".smoothscroll").forEach(function (el) {
      el.addEventListener("click", function (event) {
          event.preventDefault();

          let targetId = el.getAttribute("href");
          let targetElement = document.querySelector(targetId);
          let headerHeight = document.querySelector(".navbar").offsetHeight;

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - headerHeight,
                  behavior: "smooth"
              });
          }
      });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: "is-sticky",
      wrapperClassName: "sticky-wrapper",
      center: false,
      getWidthFrom: "",
      widthFromWrapper: true,
      responsiveWidth: false
  };

  var sticked = [];
  var windowHeight = window.innerHeight;

  function scroller() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var documentHeight = document.documentElement.scrollHeight;
      var dwh = documentHeight - windowHeight;
      var extra = scrollTop > dwh ? dwh - scrollTop : 0;

      sticked.forEach(function (s) {
          var elementTop = s.stickyWrapper.getBoundingClientRect().top + window.scrollY;
          var etse = elementTop - s.topSpacing - extra;

          // Actualiza la altura del contenedor
          s.stickyWrapper.style.height = s.stickyElement.offsetHeight + "px";

          if (scrollTop <= etse) {
              if (s.currentTop !== null) {
                  s.stickyElement.style.width = "";
                  s.stickyElement.style.position = "";
                  s.stickyElement.style.top = "";
                  s.stickyElement.parentNode.classList.remove(s.className);
                  s.currentTop = null;
              }
          } else {
              var newTop = documentHeight - s.stickyElement.offsetHeight - s.topSpacing - s.bottomSpacing - scrollTop - extra;
              newTop = newTop < 0 ? newTop + s.topSpacing : s.topSpacing;

              if (s.currentTop !== newTop) {
                  var newWidth = s.getWidthFrom
                      ? document.querySelector(s.getWidthFrom).offsetWidth || null
                      : s.widthFromWrapper
                      ? s.stickyWrapper.offsetWidth
                      : s.stickyElement.offsetWidth;

                  s.stickyElement.style.width = newWidth + "px";
                  s.stickyElement.style.position = "fixed";
                  s.stickyElement.style.top = newTop + "px";
                  s.stickyElement.parentNode.classList.add(s.className);
                  s.currentTop = newTop;
              }
          }
      });
  }

  function resizer() {
      windowHeight = window.innerHeight;
      sticked.forEach(function (s) {
          if (s.getWidthFrom && s.responsiveWidth) {
              var newWidth = document.querySelector(s.getWidthFrom).offsetWidth;
              if (newWidth) s.stickyElement.style.width = newWidth + "px";
          } else if (s.widthFromWrapper) {
              s.stickyElement.style.width = s.stickyWrapper.offsetWidth + "px";
          }
      });
  }

  function initSticky(element, options) {
      var o = Object.assign({}, defaults, options);
      var stickyElement = element;
      var stickyId = stickyElement.id || "sticky-element";
      var stickyHeight = stickyElement.offsetHeight;

      var wrapper = document.createElement("div");
      wrapper.id = stickyId + "-" + o.wrapperClassName;
      wrapper.className = o.wrapperClassName;
      stickyElement.parentNode.insertBefore(wrapper, stickyElement);
      wrapper.appendChild(stickyElement);

      if (o.center) {
          wrapper.style.width = stickyElement.offsetWidth + "px";
          wrapper.style.marginLeft = "auto";
          wrapper.style.marginRight = "auto";
      }

      if (getComputedStyle(stickyElement).float === "right") {
          stickyElement.style.float = "none";
          wrapper.style.float = "right";
      }

      wrapper.style.height = stickyHeight + "px";

      o.stickyElement = stickyElement;
      o.stickyWrapper = wrapper;
      o.currentTop = null;
      sticked.push(o);
  }

  function unstickElement(element) {
      sticked = sticked.filter(function (s) {
          return s.stickyElement !== element;
      });

      var wrapper = element.parentNode;
      wrapper.parentNode.insertBefore(element, wrapper);
      wrapper.parentNode.removeChild(wrapper);

      element.style.width = "";
      element.style.position = "";
      element.style.top = "";
      element.style.float = "";
  }

  window.addEventListener("scroll", scroller, false);
  window.addEventListener("resize", resizer, false);

  // Aplicar sticky a la barra de navegación
  var navbar = document.querySelector(".navbar");
  if (navbar) {
      initSticky(navbar, { topSpacing: 0 });
  }
});

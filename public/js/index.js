document.addEventListener("DOMContentLoaded", () => {
  /*
   * Multilingual dropdown list
   */

  $(document).ready(function () {
    $("a.dropdown-a").on("click", function (e) {
      e.preventDefault();
    });
    $(".dropdown-li").hover(
      function () {
        clearTimeout($.data(this, "timer"));
        $("ul, .disabled_langs", this).stop(true, true).slideDown(200);
      },
      function () {
        $.data(
          this,
          "timer",
          setTimeout(
            $.proxy(function () {
              $("ul, .disabled_langs, .disabled_langs_mob", this)
                .stop(true, true)
                .slideUp(200);
            }, this),
            100
          )
        );
      }
    );
  });

  /*
   * Video for mobile version
   */
  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 475) {
    let movie = document.querySelector("video");
    // change "#" to video path
    // movie.setAttribute("src", "https://imans.io/background-video_mob.mp4");
    document.querySelector("video").play();
  }
});

// *********************************************************** //

/*
 * Preloader actions
 */

setTimeout(function () {
  let preloader = document.querySelector(".preloader");
  preloader.classList.add("hide");
}, 2000);

// *********************************************************** //

/*
 * Nav-bar scroll
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// *********************************************************** //
/*
 * Move slider buttons on mobile version
 */

function moveButtons() {
  const sliderContainer = document.getElementById("block-slider");
  const arrows = sliderContainer.querySelector(".arrows-slider");
  const slider = sliderContainer.querySelector(".slider");

  if (window.innerWidth <= 768) {
    slider.appendChild(arrows);
  } else {
    const sliderLeft = sliderContainer.querySelector(".slider-left");
    sliderLeft.appendChild(arrows);
  }
}

window.addEventListener("DOMContentLoaded", moveButtons);
window.addEventListener("resize", moveButtons);

// *********************************************************** //
/*
 * Move button in education block
 */

const button = document.querySelector(".block-education-btn");
const parentContainer = document.querySelector(".block-education-lower");

function moveButton() {
  if (window.innerWidth <= 768) {
    parentContainer.appendChild(button);
  }
}

window.addEventListener("load", moveButton);
window.addEventListener("resize", moveButton);

// *********************************************************** //

function moveFooterTextOnMobile() {
  const formContainer = document.querySelector(".form-container");
  const formContainerFooterText = document.querySelector(
    ".form-container-footer-text"
  );
  const headerForm = document.querySelector(".header-form");

  if (window.innerWidth <= 850) {
    formContainer.insertBefore(formContainerFooterText, headerForm);
  }
}

window.addEventListener("DOMContentLoaded", moveFooterTextOnMobile);
window.addEventListener("resize", moveFooterTextOnMobile);

// *********************************************************** //
/*
 * Function to open modal at different parts of the screen
 */

function openModal(referenceElement) {
  const modal = document.querySelector(".popup_menu");
  const modalGratitude = document.querySelector(".popup_menu-gratitude");

  // Получение позиции относительно опорного элемента
  const rect = referenceElement.getBoundingClientRect();
  const topGratitude =
    rect.top + window.scrollY + referenceElement.offsetHeight;
  const top = window.scrollY + referenceElement.offsetHeight;

  modal.style.top = `${top}px`;
  modalGratitude.style.top = `${topGratitude}px`;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.querySelector(".popup_menu");
  modal.style.display = "none";
}

const blueBtn = document.querySelector(".blue-btn");
const projectCardBtns = document.querySelectorAll(
  ".block-project-card-find-btn"
);
const communityBtns = document.querySelectorAll(".community-block-btn");
const educationBtns = document.querySelectorAll(".block-education-btn");

blueBtn.addEventListener("click", function () {
  const referenceElement = this;
  openModal(referenceElement);
});

projectCardBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const referenceElement = this;
    openModal(referenceElement);
  });
});

communityBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const referenceElement = this;
    openModal(referenceElement);
  });
});

educationBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const referenceElement = this;
    openModal(referenceElement);
  });
});

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closeModal);

// *********************************************************** //

/*
 * Burger menu toggle
 */

// function toggleMobileMenu() {
//   const mobileMenu = document.querySelector(".nav-bar-mobile");
//   mobileMenu.classList.toggle("hidden");

//   const mobileMenuOverlay = document.querySelector(".nav-bar-mobile-overlay");
//   mobileMenuOverlay.style.display = mobileMenu.classList.contains("hidden")
//     ? "none"
//     : "block";
// }

function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".nav-bar-mobile");
  const mobileMenuOverlay = document.querySelector(".nav-bar-mobile-overlay");
  const isHidden = mobileMenu.classList.contains("hidden");

  if (isHidden) {
    mobileMenu.style.transform = "translateX(0)";
    mobileMenuOverlay.style.display = "block";
    mobileMenu.style.display = "block";

    // Удаляем класс .hidden после завершения анимации
    setTimeout(() => {
      mobileMenu.classList.remove("hidden");
    }, 400);
  } else {
    mobileMenu.style.transform = "translateX(100%)";
    mobileMenuOverlay.style.display = "none";
    mobileMenu.classList.add("hidden");
  }
}

function hideMobileMenu() {
  const mobileMenu = document.querySelector(".nav-bar-mobile");
  const mobileMenuOverlay = document.querySelector(".nav-bar-mobile-overlay");

  mobileMenu.style.transform = "translateX(100%)";
  mobileMenuOverlay.style.display = "none";

  // Добавляем обработчик события transitionend
  mobileMenu.addEventListener("transitionend", function () {
    mobileMenu.style.display = "none";
  });

  mobileMenu.classList.add("hidden");
}

function smoothScroll(targetId) {
  const mobileMenu = document.querySelector(".nav-bar-mobile");
  const mobileMenuOverlay = document.querySelector(".nav-bar-mobile-overlay");

  function closeMobileMenu() {
    mobileMenu.style.transform = "translateX(100%)";
    mobileMenuOverlay.style.display = "none";
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 400); // Задержка перед скрытием меню в миллисекундах (здесь 400 мс)
  }

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTimestamp = null;

    function animation(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * percentage);
      if (progress < duration) requestAnimationFrame(animation);
      else {
        closeMobileMenu(); // Закрыть меню после завершения анимации
        mobileMenu.classList.add("hidden");
      }
    }

    requestAnimationFrame(animation);
  }
}

// function smoothScroll(targetId) {
//   const mobileMenu = document.querySelector(".nav-bar-mobile");
//   const mobileMenuOverlay = document.querySelector(".nav-bar-mobile-overlay");

//   function closeMobileMenu() {
//     mobileMenu.style.transform = "translateX(100%)";
//     mobileMenuOverlay.style.display = "none";
//     setTimeout(() => {
//       mobileMenu.style.display = "none";
//     }, 400); // Время анимации скрытия в миллисекундах (здесь 400 мс)
//   }

//   const targetElement = document.getElementById(targetId);
//   if (targetElement) {
//     const targetPosition = targetElement.getBoundingClientRect().top;
//     const startPosition = window.pageYOffset;
//     const distance = targetPosition - startPosition;
//     const duration = 800;
//     let startTimestamp = null;

//     function animation(timestamp) {
//       if (!startTimestamp) startTimestamp = timestamp;
//       const progress = timestamp - startTimestamp;
//       const percentage = Math.min(progress / duration, 1);
//       window.scrollTo(0, startPosition + distance * percentage);
//       if (progress < duration) requestAnimationFrame(animation);
//       else closeMobileMenu(); // Закрыть меню после завершения анимации
//     }

//     requestAnimationFrame(animation);
//   }
// }

// *********************************************************** //

/*
 * Popup actions
 */

function popupShow() {
  let popup = document.querySelector(".popup_menu");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  let popup = document.querySelector(".popup_menu");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "none";
  overlay.style.display = "none";

  const mobileMenu = document.querySelector(".nav-bar-mobile");
  mobileMenu.classList.add("hidden");
}

const mobileMenuItems = document.querySelectorAll(".nav-bar-mobile-menu-items");
mobileMenuItems.forEach((item) => {
  item.addEventListener("click", closePopup);
});

function overlayClose() {
  let popup = document.querySelector(".popup_menu");
  let popupG = document.querySelector(".popup_menu-gratitude");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "none";
  popupG.style.display = "none";
  overlay.style.display = "none";
}

function gratitudePopupShow() {
  closePopup();
  let popup = document.querySelector(".popup_menu-gratitude");
  let overlay = document.querySelector(".overlay");
  popup.style.display = "block";
  overlay.style.display = "block";
}

function gratitudeClosePopup() {
  let popup = document.querySelector(".popup_menu-gratitude");
  popup.style.display = "none";
  overlayClose();
}

// *********************************************************** //
/*
 * Submit actions
 */

function handleHeaderFormSubmit(event, url) {
  event.preventDefault();

  const form = document.forms.headerForm;

  const submitButton = document.querySelector(".form-btn");
  submitButton.disabled = true;

  const hostname = new URL(url).hostname;

  let formData = {};
  let formFields = form.getElementsByTagName("input");

  for (let i = 0; i < formFields.length; i++) {
    let fieldName = formFields[i].name;
    let fieldValue = formFields[i].value;
    formData[fieldName] = fieldValue;
  }

  formData["source"] = hostname;
  formData["url"] = url;

  console.log("formData :>> ", formData);

  axios
    .post("/api/v1/client", formData)
    .then((response) => {
      console.log("Данные формы хедера успешно отправлены на сервер");
      gratitudePopupShow();
      form.reset();
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных формы хедера:", error.message);
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  return false;
}

function handleModalFormSubmit(event, url) {
  event.preventDefault();

  const form = document.forms.myForm;

  const submitButton = document.querySelector(".download-modal-btn");
  submitButton.disabled = true;

  const hostname = new URL(url).hostname;

  let formData = {};
  let formFields = form.getElementsByTagName("input");

  for (let i = 0; i < formFields.length; i++) {
    let fieldName = formFields[i].name;
    let fieldValue = formFields[i].value;
    formData[fieldName] = fieldValue;
  }

  formData["source"] = hostname;
  formData["url"] = url;

  console.log("formData :>> ", formData);

  axios
    .post("/api/v1/client", formData)
    .then((response) => {
      console.log("Данные формы модального окна успешно отправлены на сервер");
      gratitudePopupShow();
      form.reset();
    })
    .catch((error) => {
      console.error(
        "Ошибка при отправке данных формы модального окна:",
        error.message
      );
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  return false;
}

// *********************************************************** //
/*
 * Change language actions
 */

function changeLanguage(event, lang) {
  event.preventDefault();
  const hostname = window.location.hostname;
  const port = window.location.port;
  const newUrl = `http://${hostname}:${port}/${lang}`;
  window.location.href = newUrl;
}

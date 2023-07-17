/*
 * Multilingual dropdown list
 */
document.addEventListener("DOMContentLoaded", () => {
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
});

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
 * Slider actions
 */

document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function goToNextSlide() {
    slides[currentIndex].classList.add("hidden");
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].classList.remove("hidden");
  }

  function goToPrevSlide() {
    slides[currentIndex].classList.add("hidden");
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    slides[currentIndex].classList.remove("hidden");
  }

  prevButton.addEventListener("click", goToPrevSlide);
  nextButton.addEventListener("click", goToNextSlide);
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

  // Получение позиции относительно опорного элемента
  const rect = referenceElement.getBoundingClientRect();
  const top = rect.top + window.scrollY + referenceElement.offsetHeight;
  // const left = rect.left + window.scrollX;

  // Установка позиции модального окна
  modal.style.top = `${top}px`;
  // modal.style.left = `${left}px`; // Добавим позиционирование по горизонтали

  // Отображение модального окна
  modal.style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.querySelector(".popup_menu");
  modal.style.display = "none";
}

// Находим все кнопки, которые должны открывать модальное окно
const blueBtn = document.querySelector(".blue-btn");
const projectCardBtns = document.querySelectorAll(
  ".block-project-card-find-btn"
);
const communityBtns = document.querySelectorAll(".community-block-btn");
const educationBtns = document.querySelectorAll(".block-education-btn");

// Назначаем обработчики событий для каждой кнопки
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

// Назначаем обработчик события для закрытия модального окна по клику на его кнопку закрытия
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closeModal);

// *********************************************************** //

/*
 * Preloader actions
 */

// setTimeout(function () {
//   let preloader = document.querySelector(".preloader");
//   preloader.classList.add("hide");
// }, 2000);

// *********************************************************** //

/*
 * Popup actions
 */

function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".nav-bar-mobile");
  mobileMenu.classList.toggle("hidden");
}

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
function handleSubmit(event, url) {
  event.preventDefault();

  const submitButton = document.querySelector(".download-modal-btn");
  submitButton.disabled = true;
  const form = document.forms.myForm;

  const hostname = new URL(url).hostname;

  let formData = {};
  let formFields = document.getElementsByTagName("input");

  for (let i = 0; i < formFields.length; i++) {
    let fieldName = formFields[i].name;
    let fieldValue = formFields[i].value;

    formData[fieldName] = fieldValue;
  }

  formData["source"] = hostname;
  formData["url"] = url;

  axios
    .post("/api/v1/client", formData)
    .then((response) => {
      console.log("Данные формы успешно отправлены на сервер");
      gratitudePopupShow();
      form.reset();
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных формы:", error.message);
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  return false;
}

function changeLanguage(event, lang) {
  event.preventDefault();
  const hostname = window.location.hostname;
  const port = window.location.port;
  const newUrl = `https://${hostname}:${port}/${lang}`;
  window.location.href = newUrl;
}

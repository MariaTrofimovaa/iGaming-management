import { debounce } from "lodash";

document.addEventListener("DOMContentLoaded", function () {
  const currentSlideNumberDisplay = document.querySelector(
    ".current-slide-number"
  );
  const currentSlideTotalDisplay = document.querySelector(
    ".current-slide-total"
  );
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll(".slide");
  const sliderContainer = document.querySelector(".slider-container");
  const smallLine = document.querySelector(".slider-line-small");
  const defaultIconPrev = document.querySelector(".default-icon-prev");
  const activeIconPrev = document.querySelector(".active-icon-prev");
  const hoverIconPrev = document.querySelector(".hover-icon-prev");
  const defaultIconNext = document.querySelector(".default-icon");
  const hoverIconNext = document.querySelector(".hover-icon");
  const inactiveIconNext = document.querySelector(".inactive-icon");

  const totalSlides = slides.length;
  let currentIndex = 0;

  const screenWidth = window.innerWidth;
  const containerWidth = sliderContainer.offsetWidth;
  const mb = (screenWidth - containerWidth) / 2;
  const slideWidth = slides[0].offsetWidth;

  const marginSliderLeftMob = (containerWidth - slideWidth) / 2;
  const marginSliderLeftDesktop = containerWidth - slideWidth;
  const screenWidthMob = window.innerWidth <= 767;

  let marginBody = mb;
  let marginSliderLeft = screenWidthMob
    ? marginSliderLeftMob
    : marginSliderLeftDesktop;
  let width = slideWidth;
  let margin = 60;

  // let marginBody = 360;
  // let marginSliderLeft = 424;
  // let width = 776;
  // let margin = 60;

  slides[currentIndex].style.left = marginBody + marginSliderLeft + "px";

  for (let i = 1; i < slides.length; i++) {
    slides[i].classList.add("queue");
    slides[i].style.left =
      marginBody + marginSliderLeft + i * (width + margin) + "px";
    slides[i].classList.remove("hidden");
  }

  // Получаем вычисленные стили элемента
  const computedStyles = window.getComputedStyle(smallLine);

  // Получаем ширину контейнера слайдера
  const sliderWidth = slider.clientWidth;
  let smallLineWidth = 0;
  smallLineWidth = sliderWidth / totalSlides;

  smallLine.style.width = smallLineWidth + "px";

  // Функция для обновления текущего слайда
  function updateCurrentSlide() {
    if (currentIndex < totalSlides) {
      const currentSlideNumber = (currentIndex + 1).toString().padStart(2, "0");
      const currentSlideTotal = totalSlides.toString().padStart(2, "0");

      currentSlideNumberDisplay.textContent = currentSlideNumber;
      currentSlideTotalDisplay.textContent = currentSlideTotal;
    }
  }

  //   let animationFrameId = null;

  //   function cancelSlideAnimation() {
  //     if (animationFrameId) {
  //       cancelAnimationFrame(animationFrameId);
  //       animationFrameId = null;
  //     }
  //   }

  async function delayedHideAndMove(i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        slides[currentIndex].classList.add("hidden");
        const left = slides[i].style.left;
        slides[i].style.left = parseInt(left, 10) - width - margin + "px";

        resolve();
      }, 1000);
    });
  }

  async function goToNextSlide() {
    if (currentIndex + 1 < totalSlides) {
      //   for (let i = 0; i < slides.length; i++) {
      //     let left = slides[i].style.left;
      //     if (i === currentIndex) {
      //       slides[currentIndex].style.opacity = 0.5;

      //       // Создаем замыкание, чтобы сохранить значение currentIndex
      //       (function (currentIndex) {
      //         setTimeout(() => {
      //           slides[currentIndex].classList.add("hidden");
      //           slides[i].style.left = parseInt(left, 10) - width - margin + "px";
      //         }, 1000);
      //       })(currentIndex);
      //     } else {
      //       slides[i].style.left = parseInt(left, 10) - width - margin + "px";
      //       slides[i].style.transition = "left 1s ease";
      //     }
      //   }

      // Отменить предыдущую анимацию
      //   cancelSlideAnimation();

      // Скрыть текущий слайд
      slides[currentIndex].style.opacity = 0.5;

      // Получаем текущее значение стиля "left" для маленькой линии
      const leftValue = parseInt(computedStyles.left, 10);
      // Добавляем ширину маленькой линии к текущему значению "left"
      const newLeftValue = Math.ceil(leftValue + smallLineWidth);
      smallLine.style.left = newLeftValue + "px";

      // Анимировать остальные слайды
      for (let i = 0; i < slides.length; i++) {
        if (i !== currentIndex) {
          const left = slides[i].style.left;
          slides[i].style.left = parseInt(left, 10) - width - margin + "px";
          slides[i].style.transition = "left 1s ease";
        }
      }

      // Ожидаем, чтобы слайды переключились одновременно с затуханием текущего слайда
      //   await delayedHideAndMove(currentIndex);

      currentIndex = currentIndex + 1;

      if (currentIndex + 1 === slides.length) {
        // Hide the default icon and show the inactive icon
        defaultIconNext.style.display = "none";
        hoverIconNext.style.display = "none";
        inactiveIconNext.style.display = "block";
      }

      if (currentIndex > 0) {
        // FIX HOVER ICON APPEARANCE
        defaultIconPrev.style.display = "none";
        activeIconPrev.style.display = "block";
        hoverIconPrev.style.display = "block";
      }

      //   // Получаем текущее значение стиля "left" для маленькой линии
      //   const leftValue = parseInt(computedStyles.left, 10);

      //   // Добавляем ширину маленькой линии к текущему значению "left"
      //   const newLeftValue = Math.ceil(leftValue + smallLineWidth);

      //   smallLine.style.left = newLeftValue + "px";

      updateCurrentSlide();
    }
  }

  // Функция для перехода к предыдущему слайду
  function goToPrevSlide() {
    if (currentIndex > 0) {
      for (let i = 0; i < slides.length; i++) {
        // Сдвигаем влево текущий слайд
        let left = slides[i].style.left;
        slides[i].style.left = parseInt(left, 10) + width + margin + "px";
        slides[i].style.transition = "left 1s ease";

        if (i === currentIndex - 1) {
          //   slides[currentIndex].style.opacity = 0.5;
          slides[currentIndex - 1].classList.remove("hidden");
          slides[currentIndex - 1].style.opacity = 1;
        }
      }
      currentIndex = currentIndex - 1;

      if (currentIndex === 0) {
        defaultIconPrev.style.display = "block";
        activeIconPrev.style.display = "none";
        hoverIconPrev.style.display = "none";
      }

      if (currentIndex > 0) {
        defaultIconNext.style.display = "block";
        hoverIconNext.style.display = "block";
        inactiveIconNext.style.display = "none";
      }

      // Получаем текущее значение стиля "left" для маленькой линии
      const leftValue = parseInt(computedStyles.left, 10);

      // Вычитаем ширину маленькой линии от текущего значению "left"
      const newLeftValue = leftValue - smallLineWidth;
      smallLine.style.left = newLeftValue + "px";
      updateCurrentSlide();
    }
  }

  // Обработчики событий для кнопок переключения слайдов
  prevButton.addEventListener("click", () => {
    goToPrevSlide();
  });

  nextButton.addEventListener("click", () => {
    goToNextSlide();
  });
  const debounced = debounce(() => {
    console.log("delayed");
  }, 500);

  debounced();
});

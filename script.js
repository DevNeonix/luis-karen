document.addEventListener("DOMContentLoaded", () => {

  const heartAnimationContainer = document.getElementById("heart-animation");
  if (heartAnimationContainer) {
    const heartAnimation = lottie.loadAnimation({
      container: heartAnimationContainer,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "animations/heart.json",
    });

    let hasAnimatedOnScroll = false;
    let isHeaderAnimated = false;


    const handleScrollAnimation = () => {
      const scrollThreshold = 50;
      if (!hasAnimatedOnScroll && window.scrollY > scrollThreshold) {
        heartAnimation.setDirection(1);
        heartAnimation.play();
        hasAnimatedOnScroll = true;
      }
    };


    window.addEventListener("scroll", handleScrollAnimation, { passive: true });


    const header = document.getElementById("main-header");
    const toggleHeaderAnimation = (scrollPos) => {
      const headerScrollThreshold = 80;
      if (scrollPos > headerScrollThreshold) {
        if (!isHeaderAnimated) {
          header.classList.add("animated");
          heartAnimation.play();
          isHeaderAnimated = true;
        }
      } else {
        if (isHeaderAnimated) {
          header.classList.remove("animated");
          heartAnimation.pause();
          isHeaderAnimated = false;
        }
      }
    };


    let lastKnownScrollPosition = 0;
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            toggleHeaderAnimation(lastKnownScrollPosition);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  } else {
    console.warn("Contenedor para la animación de Lottie no encontrado.");
  }


  const swiperElement = document.querySelector(".mySwiper");
  if (swiperElement) {
    const swiper = new Swiper(".mySwiper", {
        centeredSlides: true,
        slidesPerView: 1,
        grabCursor: true,
        freeMode: false,
        loop: true,
        mousewheel: false,
        keyboard: {
          enabled: true
        },
      
        // Enabled autoplay mode
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
      
        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: false,
          clickable: true
        },
      
        // If we need navigation
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      
        // Responsive breakpoints
        breakpoints: {
          640: {
            slidesPerView: 1.25,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
    });
  } else {
    console.warn("Elemento Swiper no encontrado.");
  }


  const eventDate = new Date("2025-02-16T01:00:00-05:00");

  /**
   * Calcula el tiempo restante hasta una fecha objetivo.
   *
   * @param {Date} fechaObjetivo - La fecha futura hasta la cual calcular el tiempo restante.
   * @returns {Object} Un objeto con meses, días, horas, minutos y segundos restantes.
   */
  function obtenerTiempoRestante(fechaObjetivo) {
    const ahora = new Date();


    if (dateFns.isBefore(fechaObjetivo, ahora)) {
      return {
        meses: 0,
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
      };
    }


    const duracion = dateFns.intervalToDuration({
      start: ahora,
      end: fechaObjetivo,
    });

    return {
      meses: duracion.months,
      dias: duracion.days,
      horas: duracion.hours,
      minutos: duracion.minutes,
      segundos: duracion.seconds,
    };
  }

  /**
   * Actualiza el contador en el DOM con el tiempo restante.
   */
  function actualizarContador() {
    const tiempo = obtenerTiempoRestante(eventDate);


    const elementosContador = [
      { id: "meses", valor: tiempo.meses },
      { id: "dias", valor: tiempo.dias },
      { id: "horas", valor: tiempo.horas },
      { id: "minutos", valor: tiempo.minutos },
      { id: "segundos", valor: tiempo.segundos },
    ];

    elementosContador.forEach(({ id, valor }) => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.textContent = strZero(valor);
      } else {
        console.warn(`Elemento con id '${id}' no encontrado.`);
      }
    });


    if (
      tiempo.meses === 0 &&
      tiempo.dias === 0 &&
      tiempo.horas === 0 &&
      tiempo.minutos === 0 &&
      tiempo.segundos === 0
    ) {
      clearInterval(contadorInterval);
    }
  }


  const idsContador = ["meses", "dias", "horas", "minutos", "segundos"];
  const existeContador = idsContador.every((id) => document.getElementById(id));
  if (existeContador) {

    actualizarContador();
    const contadorInterval = setInterval(actualizarContador, 1000);
  } else {
    console.warn(
      "Algunos elementos del contador no fueron encontrados en el DOM."
    );
  }
});

function strZero(n) {
  return n < 10 ? "0" + n : n;
}

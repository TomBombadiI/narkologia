import "./main.scss";
import { Offcanvas } from "bootstrap";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const offcanvasElementList = document.querySelectorAll('.offcanvas, .offcanvas-lg');
[...offcanvasElementList].map(offcanvasEl => new Offcanvas(offcanvasEl));


// === НАСТРОЙКИ ===
const WAVE_TIME = 1200; // ms — скорость волны по слову (от первой буквы до последней)
const CYCLE_DELAY = 1500;  // ms — пауза между циклами
const LETTER_ANIM_DURATION = 300; // ms — длительность "прыжка" одной буквы

document.querySelectorAll('.wave-text').forEach((el) => {
  const text = el.textContent.trim();
  el.innerHTML = '';

  const chars = [...text];
  const spans = chars.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(span);
    return span;
  });

  // задержка между стартами соседних букв
  const letterDelay = chars.length > 1
    ? WAVE_TIME / (chars.length - 1)
    : 0;

  function runWave() {
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('wave-letter');

        // по окончании анимации — убрать класс, чтобы можно было перезапускать
        span.addEventListener(
          'animationend',
          () => span.classList.remove('wave-letter'),
          { once: true }
        );
      }, index * letterDelay);
    });

    // когда последняя буква допрыгнет + пауза — запускаем новый цикл
    const totalCycleTime = WAVE_TIME + LETTER_ANIM_DURATION + CYCLE_DELAY;
    setTimeout(runWave, totalCycleTime);
  }

  runWave();
});

new Swiper('.reviews__slider', {
  autoplay: {
    delay: 2000,
  },
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  modules: [Navigation, Pagination, Autoplay],
});

const panel = document.getElementById('bottomPanel') as HTMLElement;

function updatePadding() {
  document.body.style.paddingBottom = panel.offsetHeight + 10 + 'px';
}

window.addEventListener('load', updatePadding);
window.addEventListener('resize', updatePadding);

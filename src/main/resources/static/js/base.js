"use strict";

/* Тень у шапки при прокрутке + плавный скролл по якорям + подсветка активной ссылки */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');

  // тень при скролле
  const toggleShadow = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggleShadow();
  window.addEventListener('scroll', toggleShadow);

  // плавный скролл к секциям и активное состояние ссылки
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id && id !== '#' && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav__link').forEach(a => a.classList.remove('nav__link--active'));
        link.classList.add('nav__link--active');
        history.replaceState(null, '', id);
      }
    });
  });

  // просто визуальный актив для твоих табов
  const tabs = document.querySelectorAll('.model-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
});

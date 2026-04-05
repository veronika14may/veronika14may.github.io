// ===========================
// СЛОЙ — JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV SCROLL ───
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ─── REVEAL ON SCROLL ───
  const reveals = document.querySelectorAll('.reveal, .reveal-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // stagger siblings
        const siblings = el.parentElement.querySelectorAll('.reveal, .reveal-card');
        let delay = 0;
        siblings.forEach((s, idx) => { if (s === el) delay = idx * 80; });
        setTimeout(() => el.classList.add('in-view'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));


  // ─── BOX TRANSFORMER ───
  const transformBtn = document.getElementById('transformBtn');
  const boxStage = document.getElementById('boxStage');
  const boxContents = document.getElementById('boxContents');
  let boxOpen = false;

  if (transformBtn) {
    transformBtn.addEventListener('click', () => {
      boxOpen = !boxOpen;
      boxStage.classList.toggle('open', boxOpen);
      boxContents.classList.toggle('visible', boxOpen);
      transformBtn.textContent = boxOpen ? 'Закрыть бокс' : 'Открыть бокс';
    });
  }


  // ─── DAY BUTTONS ───
  const dayBtns = document.querySelectorAll('.day-btn');
  const activeDays = new Set(['чт']);

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      if (activeDays.has(day)) {
        if (activeDays.size === 1) return; // keep at least one
        activeDays.delete(day);
        btn.classList.remove('day-btn--active');
      } else {
        activeDays.add(day);
        btn.classList.add('day-btn--active');
      }
      updateSummary();
    });
  });


  // ─── TIME BUTTONS ───
  const timeBtns = document.querySelectorAll('.time-btn');
  let activeTime = '08:00';

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('time-btn--active'));
      btn.classList.add('time-btn--active');
      activeTime = btn.dataset.t;
      updateSummary();
    });
  });


  // ─── SUMMARY UPDATE ───
  const summaryDetail = document.getElementById('summaryDetail');
  function updateSummary() {
    const dayOrder = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const sorted = dayOrder.filter(d => activeDays.has(d));
    const daysText = sorted.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
    summaryDetail.textContent = `${daysText} в ${activeTime}`;
  }


  // ─── GIFT NOTE COUNTER ───
  const giftNote = document.getElementById('giftNote');
  const giftCounter = document.getElementById('giftCounter');
  if (giftNote) {
    giftNote.addEventListener('input', () => {
      giftCounter.textContent = `${giftNote.value.length} / 80`;
    });
  }


  // ─── FAQ ACCORDION ───
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ─── SET CARD CTA ───
  const setButtons = document.querySelectorAll('.btn--set');
  setButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.set-card');
      const setName = card.querySelector('h3').textContent;
      // Animate the button
      btn.textContent = '✓ Добавлено';
      btn.style.background = 'var(--espresso)';
      btn.style.color = 'var(--cream)';
      btn.style.borderColor = 'var(--espresso)';
      setTimeout(() => {
        const isGift = card.classList.contains('set-card--gift');
        btn.textContent = isGift ? 'Подарить утро →' : 'Выбрать этот →';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        // scroll to calendar
        document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' });
      }, 1200);
    });
  });


  // ─── TRY ONCE BUTTON ───
  const tryOnce = document.getElementById('tryOnce');
  if (tryOnce) {
    tryOnce.addEventListener('click', () => {
      tryOnce.textContent = '✓ Разовый заказ оформлен!';
      tryOnce.style.color = 'var(--gold)';
      tryOnce.style.borderColor = 'var(--gold)';
      setTimeout(() => {
        tryOnce.textContent = 'Попробовать разок — без подписки';
        tryOnce.style.color = '';
        tryOnce.style.borderColor = '';
      }, 2000);
    });
  }


  // ─── PARALLAX HERO CROISSANT ───
  const croissant = document.querySelector('.hero__croissant');
  if (croissant) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      if (scrolled < vh) {
        const pct = scrolled / vh;
        croissant.style.transform = `translateY(calc(-50% + ${pct * 60}px))`;
        croissant.style.opacity = 1 - pct * 1.5;
      }
    }, { passive: true });
  }


  // ─── SMOOTH LINK CLICKS ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initial summary render
  updateSummary();

});

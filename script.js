(function () {
  var root = document.documentElement;

  /* ---------- Theme (dark / light) ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------- Language (English / Arabic) ---------- */
  var langBtn = document.getElementById('langToggle');
  var savedLang = localStorage.getItem('portfolio-lang');
  if (savedLang) applyLang(savedLang);

  langBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-lang') === 'ar' ? 'en' : 'ar';
    applyLang(next);
    localStorage.setItem('portfolio-lang', next);
    startTypewriter();
  });

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  /* ---------- Dashboard image lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.mockup-frame[data-full]').forEach(function (frame) {
    frame.addEventListener('click', function () {
      if (frame.classList.contains('img-missing')) return;
      lightboxImg.src = frame.getAttribute('data-full');
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Typing animation under the name ---------- */
  /*
    EDIT YOUR OWN WORDS HERE — write whatever you want, as many
    words as you like. WORDS_EN shows while the site is in English,
    WORDS_AR shows while it's in Arabic.
  */
  var WORDS_EN = ['DATA ANALYST', 'DECISION MAKER', 'INSIGHTS BUILDER'];
  var WORDS_AR = ['محلل بيانات', 'متخذ القرارات', 'باني الرؤى'];

  var typedEl = document.getElementById('typedRole');
  var typeTimer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startTypewriter() {
    if (typeTimer) clearTimeout(typeTimer);
    if (!typedEl) return;

    var words = root.getAttribute('data-lang') === 'ar' ? WORDS_AR : WORDS_EN;

    if (reduceMotion || !words.length) {
      typedEl.textContent = words[0] || '';
      return;
    }

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = words[wordIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          typeTimer = setTimeout(tick, 1400);
          return;
        }
        typeTimer = setTimeout(tick, 70);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeTimer = setTimeout(tick, 300);
          return;
        }
        typeTimer = setTimeout(tick, 35);
      }
    }

    typeTimer = setTimeout(tick, 400);
  }

  startTypewriter();

  /* ---------- Contact form: opens the visitor's email app, pre-filled ---------- */
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    var subject = 'Portfolio inquiry from ' + name;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;

    var mailto = 'mailto:emooma27@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
  });
})();

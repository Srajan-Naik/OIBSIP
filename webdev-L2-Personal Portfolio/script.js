/* ============================================================
   Portfolio behaviour
   1. Mobile menu (navbar dropdown)
   2. Active section in the nav (scroll spy)
   3. Copy email address
   4. Contact form validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var navlinks = document.getElementById('navlinks');

  menuBtn.addEventListener('click', function () {
    var open = navlinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  navlinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navlinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- 2. Scroll spy ---------- */
  var links = Array.prototype.slice.call(navlinks.querySelectorAll('a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 3. Copy email ---------- */
  var mailBtn = document.getElementById('copyMail');

  mailBtn.addEventListener('click', function () {
    var address = mailBtn.dataset.mail;
    var original = mailBtn.textContent;

    function done(text) {
      mailBtn.textContent = text;
      setTimeout(function () { mailBtn.textContent = original; }, 1600);
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(address)
        .then(function () { done('Copied'); })
        .catch(function () { window.location.href = 'mailto:' + address; });
    } else {
      window.location.href = 'mailto:' + address;
    }
  });

  /* ---------- 4. Contact form ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function showError(field, message) {
    var slot = form.querySelector('.err[data-for="' + field + '"]');
    if (slot) slot.textContent = message;
  }

  function clearErrors() {
    form.querySelectorAll('.err').forEach(function (s) { s.textContent = ''; });
    status.textContent = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    var ok = true;

    if (name.length < 2) {
      showError('name', 'Enter your name so I know who is writing.');
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showError('email', 'Enter an email address I can reply to.');
      ok = false;
    }
    if (message.length < 10) {
      showError('message', 'Add a little more detail — at least 10 characters.');
      ok = false;
    }
    if (!ok) return;

    // No server here: this opens the visitor's mail app with the message filled in.
    // Swap this for a fetch() to Formspree, EmailJS or your own backend when you have one.
    var subject = encodeURIComponent('Portfolio message from ' + name);
    var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:' + mailBtn.dataset.mail + '?subject=' + subject + '&body=' + body;

    status.textContent = 'Opening your mail app with the message ready to send.';
    form.reset();
  });

});

/* ============================================================
   Portfolio behaviour
   1. Mobile menu
   2. Active section in the navigation
   3. Copy email address
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // 1. Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var navlinks = document.getElementById('navlinks');

  if (menuBtn && navlinks) {

    menuBtn.addEventListener('click', function () {
      var open = navlinks.classList.toggle('open');

      menuBtn.setAttribute('aria-expanded', String(open));
    });

    navlinks.addEventListener('click', function (event) {

      if (event.target.tagName === 'A') {
        navlinks.classList.remove('open');

        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // 2. Highlight the current navigation section
    var links = Array.prototype.slice.call(
      navlinks.querySelectorAll('a')
    );

    var sections = links
      .map(function (link) {
        return document.querySelector(
          link.getAttribute('href')
        );
      })
      .filter(Boolean);

    if ('IntersectionObserver' in window) {

      var spy = new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            links.forEach(function (link) {

              link.classList.toggle(
                'active',
                link.getAttribute('href') ===
                '#' + entry.target.id
              );

            });
          });

        },
        {
          rootMargin: '-45% 0px -50% 0px'
        }
      );

      sections.forEach(function (section) {
        spy.observe(section);
      });
    }
  }

  // 3. Copy email address
  var mailBtn = document.getElementById('copyMail');

  if (mailBtn) {

    mailBtn.addEventListener('click', function () {

      var address = mailBtn.dataset.mail;
      var original = mailBtn.textContent;

      function done(message) {

        mailBtn.textContent = message;

        setTimeout(function () {
          mailBtn.textContent = original;
        }, 1600);
      }

      if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(address)
          .then(function () {
            done('Copied');
          })
          .catch(function () {
            window.location.href = 'mailto:' + address;
          });

      } else {

        window.location.href = 'mailto:' + address;
      }
    });
  }

});
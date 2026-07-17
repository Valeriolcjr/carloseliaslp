// ─────────────────────────────────────────────────────────────
// HERO PHOTO
// ─────────────────────────────────────────────────────────────
(function () {
  var image = document.getElementById('heroImg');

  if (!image) return;

  var isMobile =
    window.innerWidth < 768 ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  image.src = isMobile
    ? 'assets/images/image_6_2520acbf46.jpg'
    : 'assets/images/image_7_d17f1147ea.jpg';
})();

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
window.addEventListener(
  'scroll',
  function () {
    var navbar = document.getElementById('navbar');

    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 20);
  },
  { passive: true }
);

// ─────────────────────────────────────────────────────────────
// HERO: ANIMAÇÃO DE ENTRADA
// ─────────────────────────────────────────────────────────────
(function () {
  var content = document.getElementById('heroContent');
  var image = document.getElementById('heroImg');
  var triggered = false;

  if (!content) return;

  function triggerHero() {
    if (triggered) return;

    triggered = true;

    requestAnimationFrame(function () {
      setTimeout(function () {
        content.classList.add('hero-animated');
      }, 80);
    });
  }

  if (image && image.complete) {
    triggerHero();
  } else if (image) {
    image.addEventListener('load', triggerHero, { once: true });
    setTimeout(triggerHero, 400);
  } else {
    triggerHero();
  }
})();

// ─────────────────────────────────────────────────────────────
// MENU MOBILE
// ─────────────────────────────────────────────────────────────
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  var button = document.querySelector('.hamburger');

  if (!menu) return;

  var isOpen = menu.classList.toggle('open');

  menu.setAttribute(
    'aria-hidden',
    isOpen ? 'false' : 'true'
  );

  if (button) {
    button.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false'
    );
  }
}

function closeMenu() {
  var menu = document.getElementById('mobileMenu');
  var button = document.querySelector('.hamburger');

  if (!menu) return;

  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');

  if (button) {
    button.setAttribute('aria-expanded', 'false');
  }
}

// ─────────────────────────────────────────────────────────────
// REVEAL ON SCROLL
// ─────────────────────────────────────────────────────────────
(function () {
  var elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (element) {
      element.classList.add('visible');
    });

    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(function (element) {
    observer.observe(element);
  });
})();

// ─────────────────────────────────────────────────────────────
// LOGO DA SEÇÃO SOBRE
// ─────────────────────────────────────────────────────────────
(function () {
  var logo = document.getElementById('sobreLogo');
  var tagline = document.getElementById('sobreTagline');
  var logoColumn = document.getElementById('sobreLogoCol');
  var tags = document.getElementById('sobreTags');

  if (!logo) return;

  var parts = ['lp1', 'lp2', 'lp3', 'lp4'];
  var delays = [0, 220, 380, 540];

  function animateLogo() {
    parts.forEach(function (id, index) {
      var element = document.getElementById(id);

      if (!element) return;

      setTimeout(function () {
        element.classList.add('drawn');
      }, delays[index]);
    });

    setTimeout(function () {
      logo.classList.add('animated');
    }, 1000);

    if (tagline) {
      setTimeout(function () {
        tagline.classList.add('animated');
      }, 1100);
    }

    if (tags) {
      setTimeout(function () {
        tags.classList.add('animated');
      }, 1400);
    }

    if (logoColumn) {
      setTimeout(function () {
        logoColumn.classList.add('animated');
      }, 400);
    }
  }

  if (!('IntersectionObserver' in window)) {
    animateLogo();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      if (!entries[0].isIntersecting) return;

      observer.disconnect();
      animateLogo();
    },
    {
      threshold: 0.25
    }
  );

  observer.observe(logo);
})();

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
function toggleFaq(button) {
  var item = button.parentElement;
  var wasOpen = item.classList.contains('open');

  document
    .querySelectorAll('.faq-item.open')
    .forEach(function (openItem) {
      openItem.classList.remove('open');

      var question = openItem.querySelector('.faq-q');

      if (question) {
        question.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });

  if (!wasOpen) {
    item.classList.add('open');

    button.setAttribute(
      'aria-expanded',
      'true'
    );
  }
}

// ─────────────────────────────────────────────────────────────
// SELETOR DE PLANOS LEGADO
// ─────────────────────────────────────────────────────────────
function selectPlan(
  planId,
  period,
  amount,
  equivalent,
  element
) {
  var card = element.closest('.plan-card');

  if (!card) return;

  card
    .querySelectorAll('.plan-option')
    .forEach(function (option) {
      option.classList.remove('selected');
    });

  element.classList.add('selected');

  var amountElement =
    document.getElementById(
      planId + '-amount'
    );

  var equivalentElement =
    document.getElementById(
      planId + '-equiv'
    );

  if (amountElement) {
    amountElement.textContent = amount;
  }

  if (equivalentElement) {
    equivalentElement.textContent =
      equivalent;
  }
}

// ─────────────────────────────────────────────────────────────
// FORMULÁRIO → WHATSAPP + BACKUP LOCAL
// ─────────────────────────────────────────────────────────────
(function () {
  var form = document.getElementById('leadForm');

  if (!form) return;

  form.addEventListener(
    'submit',
    function (event) {
      event.preventDefault();

      var nameInput =
        document.getElementById('nome');

      var whatsappInput =
        document.getElementById('whatsapp');

      var objectiveInput =
        document.getElementById('objetivo');

      var messageInput =
        document.getElementById('mensagem');

      var nome = nameInput
        ? nameInput.value.trim()
        : '';

      var whatsapp = whatsappInput
        ? whatsappInput.value.trim()
        : '';

      var objetivo = objectiveInput
        ? objectiveInput.value
        : '';

      var mensagem = messageInput
        ? messageInput.value.trim()
        : '';

      if (
        !nome ||
        !whatsapp ||
        !objetivo
      ) {
        showFeedback(
          'Preencha nome, WhatsApp e objetivo para continuar.',
          'error'
        );

        return;
      }

      var leads = [];

      try {
        leads = JSON.parse(
          localStorage.getItem(
            'ce_leads'
          ) || '[]'
        );

        if (!Array.isArray(leads)) {
          leads = [];
        }
      } catch (error) {
        leads = [];
      }

      leads.unshift({
        id: Date.now(),
        nome: nome,
        whatsapp: whatsapp,
        objetivo: objetivo,
        mensagem: mensagem,
        data: new Date().toISOString(),
        status: 'novo'
      });

      try {
        localStorage.setItem(
          'ce_leads',
          JSON.stringify(leads)
        );
      } catch (error) {
        console.warn(
          'Não foi possível salvar o lead localmente.',
          error
        );
      }

      var text = encodeURIComponent(
        'Olá Elias! Me chamo ' +
          nome +
          '. Meu WhatsApp é ' +
          whatsapp +
          '. Objetivo: ' +
          objetivo +
          '. Entrei em contato pelo site.' +
          (
            mensagem
              ? '\n\n' + mensagem
              : ''
          )
      );

      showFeedback(
        'Mensagem registrada. Abrindo WhatsApp...',
        'success'
      );

      window.open(
        'https://wa.me/5585996639595?text=' +
          text,
        '_blank',
        'noopener'
      );

      form.reset();
    }
  );
})();

function showFeedback(message, type) {
  var element =
    document.getElementById(
      'form-feedback'
    );

  if (!element) return;

  element.textContent = message;
  element.style.display = 'block';

  element.style.background =
    type === 'success'
      ? 'rgba(37,211,102,0.1)'
      : 'rgba(220,50,50,0.1)';

  element.style.border =
    type === 'success'
      ? '1px solid rgba(37,211,102,0.3)'
      : '1px solid rgba(220,50,50,0.3)';

  element.style.color =
    type === 'success'
      ? '#4ade80'
      : '#f87171';

  setTimeout(function () {
    element.style.display = 'none';
  }, 5000);
}

// ─────────────────────────────────────────────────────────────
// LINKS INTERNOS
// ─────────────────────────────────────────────────────────────
document
  .querySelectorAll('a[href^="#"]')
  .forEach(function (anchor) {
    anchor.addEventListener(
      'click',
      function (event) {
        var href =
          anchor.getAttribute('href');

        if (
          !href ||
          href === '#'
        ) {
          return;
        }

        var target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    );
  });

// ─────────────────────────────────────────────────────────────
// CARD 3D TILT
// ─────────────────────────────────────────────────────────────
(function () {
  document
    .querySelectorAll('.card-elite')
    .forEach(function (card) {
      card.addEventListener(
        'mousemove',
        function (event) {
          var rectangle =
            card.getBoundingClientRect();

          var centerX =
            rectangle.left +
            rectangle.width / 2;

          var centerY =
            rectangle.top +
            rectangle.height / 2;

          var distanceX =
            (
              event.clientX -
              centerX
            ) /
            (
              rectangle.width / 2
            );

          var distanceY =
            (
              event.clientY -
              centerY
            ) /
            (
              rectangle.height / 2
            );

          var rotateX =
            distanceY * -4;

          var rotateY =
            distanceX * 5;

          card.style.transform =
            'translateY(-6px) ' +
            'perspective(700px) ' +
            'rotateX(' +
            rotateX +
            'deg) rotateY(' +
            rotateY +
            'deg)';

          card.style.boxShadow =
            distanceX * 8 +
            'px ' +
            (
              distanceY * 8 +
              20
            ) +
            'px 48px rgba(1,4,11,0.65), ' +
            '0 0 0 1px rgba(88,117,133,0.15)';
        }
      );

      card.addEventListener(
        'mouseleave',
        function () {
          card.style.transform = '';
          card.style.boxShadow = '';
        }
      );
    });
})();

// ═════════════════════════════════════════════════════════════
// CARROSSEL DE TRANSFORMAÇÕES
//
// Estrutura visual:
// [ anterior inteiro com blur ]
// [ atual inteiro e nítido ]
// [ próximo inteiro com blur ]
//
// A animação ocorre somente pelas classes dos cards.
// O track nunca recebe redução de opacity.
// ═════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var track = null;
  var viewport = null;
  var dotsWrapper = null;
  var previousButton = null;
  var nextButton = null;

  var cards = [];
  var dots = [];

  var total = 0;
  var currentIndex = 0;

  var isChanging = false;
  var pendingTarget = null;
  var pendingDirection = 0;
  var changeTimer = null;

  var pointerId = null;
  var pointerStartX = 0;
  var pointerLastX = 0;
  var pointerDragging = false;

  var SWIPE_THRESHOLD = 46;
  var CHANGE_DURATION = 280;

  var reducedMotion =
    window.matchMedia &&
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  function normalizeIndex(index) {
    if (!total) {
      return 0;
    }

    return (
      (
        index % total
      ) +
      total
    ) % total;
  }

  function getPreviousIndex() {
    return normalizeIndex(
      currentIndex - 1
    );
  }

  function getNextIndex() {
    return normalizeIndex(
      currentIndex + 1
    );
  }

  function getDirectionTo(targetIndex) {
    if (total <= 1) {
      return 0;
    }

    var target =
      normalizeIndex(
        targetIndex
      );

    var forwardDistance =
      normalizeIndex(
        target - currentIndex
      );

    var backwardDistance =
      normalizeIndex(
        currentIndex - target
      );

    return forwardDistance <=
      backwardDistance
        ? 1
        : -1;
  }

  /*
   * Remove qualquer opacity, transform ou animação
   * inline deixada por implementações anteriores.
   */
  function resetTrackVisualState() {
    if (!track) return;

    if (
      typeof track.getAnimations ===
      'function'
    ) {
      track
        .getAnimations()
        .forEach(function (animation) {
          animation.cancel();
        });
    }

    track.style.opacity = '1';
    track.style.transform =
      'translate3d(0, 0, 0)';

    track.classList.remove(
      'is-changing',
      'is-moving-next',
      'is-moving-prev'
    );
  }

  function updateDots() {
    dots.forEach(
      function (dot, index) {
        var active =
          index === currentIndex;

        dot.classList.toggle(
          'active',
          active
        );

        dot.setAttribute(
          'aria-current',
          active
            ? 'true'
            : 'false'
        );
      }
    );
  }

  function updateCards() {
    if (!cards.length) {
      return;
    }

    var previousIndex =
      getPreviousIndex();

    var nextIndex =
      getNextIndex();

    cards.forEach(
      function (card, index) {
        var active =
          index === currentIndex;

        var previous =
          total > 1 &&
          index === previousIndex;

        var next =
          total > 1 &&
          index === nextIndex;

        var hidden =
          !active &&
          !previous &&
          !next;

        card.classList.remove(
          'active',
          'is-active',
          'is-prev',
          'is-next',
          'is-hidden'
        );

        /*
         * Cards necessários precisam ser exibidos
         * antes da aplicação das classes.
         */
        card.hidden = hidden;

        if (active) {
          card.classList.add(
            'active',
            'is-active'
          );
        } else if (previous) {
          card.classList.add(
            'is-prev'
          );
        } else if (next) {
          card.classList.add(
            'is-next'
          );
        } else {
          card.classList.add(
            'is-hidden'
          );
        }

        card.setAttribute(
          'aria-hidden',
          active
            ? 'false'
            : 'true'
        );

        card.setAttribute(
          'tabindex',
          active
            ? '0'
            : '-1'
        );
      }
    );

    updateDots();

    if (viewport) {
      viewport.setAttribute(
        'aria-label',
        'Transformação ' +
          (
            currentIndex + 1
          ) +
          ' de ' +
          total
      );
    }

    /*
     * Proteção final:
     * o pai nunca pode ficar transparente.
     */
    resetTrackVisualState();
  }

  function processPendingNavigation() {
    if (pendingTarget === null) {
      return;
    }

    var target =
      pendingTarget;

    var direction =
      pendingDirection ||
      getDirectionTo(target);

    pendingTarget = null;
    pendingDirection = 0;

    goTo(
      target,
      direction
    );
  }

  function finishChange() {
    clearTimeout(changeTimer);

    changeTimer = null;
    isChanging = false;

    resetTrackVisualState();
    processPendingNavigation();
  }

  function applyChange(
    targetIndex,
    direction
  ) {
    currentIndex =
      normalizeIndex(
        targetIndex
      );

    resetTrackVisualState();

    if (track) {
      track.classList.add(
        'is-changing'
      );

      track.classList.add(
        direction > 0
          ? 'is-moving-next'
          : 'is-moving-prev'
      );
    }

    /*
     * A troca das classes dos cards gera o efeito
     * de blur e nitidez pelo próprio CSS.
     */
    updateCards();

    if (reducedMotion) {
      finishChange();
      return;
    }

    changeTimer =
      setTimeout(
        finishChange,
        CHANGE_DURATION
      );
  }

  function goTo(
    targetIndex,
    direction
  ) {
    if (total <= 1) {
      return;
    }

    var target =
      normalizeIndex(
        targetIndex
      );

    var resolvedDirection =
      direction ||
      getDirectionTo(target);

    if (
      target === currentIndex &&
      !isChanging
    ) {
      return;
    }

    /*
     * Cliques rápidos não travam o carrossel.
     * O último destino solicitado é executado
     * depois da troca atual.
     */
    if (isChanging) {
      pendingTarget = target;
      pendingDirection =
        resolvedDirection;

      return;
    }

    isChanging = true;

    applyChange(
      target,
      resolvedDirection
    );
  }

  function slide(direction) {
    if (total <= 1) {
      return;
    }

    var normalizedDirection =
      direction < 0
        ? -1
        : 1;

    var baseIndex =
      pendingTarget !== null
        ? pendingTarget
        : currentIndex;

    goTo(
      baseIndex +
        normalizedDirection,
      normalizedDirection
    );
  }

  function buildDots() {
    if (!dotsWrapper) return;

    dotsWrapper.innerHTML = '';

    dots = cards.map(
      function (card, index) {
        var dot =
          document.createElement(
            'button'
          );

        dot.type = 'button';
        dot.className =
          'transf-dot';

        dot.setAttribute(
          'aria-label',
          'Ir para transformação ' +
            (
              index + 1
            )
        );

        dot.setAttribute(
          'aria-current',
          'false'
        );

        dot.addEventListener(
          'click',
          function () {
            goTo(
              index,
              getDirectionTo(index)
            );
          }
        );

        dotsWrapper.appendChild(dot);

        return dot;
      }
    );
  }

  function handlePointerDown(event) {
    if (
      total <= 1 ||
      event.button > 0
    ) {
      return;
    }

    if (
      event.target.closest(
        'button, a'
      )
    ) {
      return;
    }

    pointerId =
      event.pointerId;

    pointerStartX =
      event.clientX;

    pointerLastX =
      pointerStartX;

    pointerDragging = true;

    viewport.classList.add(
      'is-dragging'
    );

    if (
      viewport.setPointerCapture &&
      pointerId !== null
    ) {
      viewport.setPointerCapture(
        pointerId
      );
    }
  }

  function handlePointerMove(event) {
    if (
      !pointerDragging ||
      event.pointerId !== pointerId
    ) {
      return;
    }

    pointerLastX =
      event.clientX;
  }

  function finishPointer(event) {
    if (
      !pointerDragging ||
      event.pointerId !== pointerId
    ) {
      return;
    }

    var delta =
      pointerLastX -
      pointerStartX;

    pointerDragging = false;

    viewport.classList.remove(
      'is-dragging'
    );

    if (
      viewport.hasPointerCapture &&
      viewport.hasPointerCapture(
        pointerId
      )
    ) {
      viewport.releasePointerCapture(
        pointerId
      );
    }

    pointerId = null;

    if (
      Math.abs(delta) <
      SWIPE_THRESHOLD
    ) {
      return;
    }

    slide(
      delta < 0
        ? 1
        : -1
    );
  }

  function bindArrowEvents() {
    /*
     * O HTML atual já possui onclick.
     * Só adiciona listener quando onclick não existir.
     */
    if (
      previousButton &&
      !previousButton.hasAttribute(
        'onclick'
      )
    ) {
      previousButton.addEventListener(
        'click',
        function () {
          slide(-1);
        }
      );
    }

    if (
      nextButton &&
      !nextButton.hasAttribute(
        'onclick'
      )
    ) {
      nextButton.addEventListener(
        'click',
        function () {
          slide(1);
        }
      );
    }
  }

  function bindKeyboardEvents() {
    viewport.addEventListener(
      'keydown',
      function (event) {
        if (
          event.key ===
          'ArrowLeft'
        ) {
          event.preventDefault();
          slide(-1);
        }

        if (
          event.key ===
          'ArrowRight'
        ) {
          event.preventDefault();
          slide(1);
        }

        if (
          event.key === 'Home'
        ) {
          event.preventDefault();

          goTo(
            0,
            -1
          );
        }

        if (
          event.key === 'End'
        ) {
          event.preventDefault();

          goTo(
            total - 1,
            1
          );
        }
      }
    );
  }

  function bindPointerEvents() {
    viewport.addEventListener(
      'pointerdown',
      handlePointerDown
    );

    viewport.addEventListener(
      'pointermove',
      handlePointerMove
    );

    viewport.addEventListener(
      'pointerup',
      finishPointer
    );

    viewport.addEventListener(
      'pointercancel',
      finishPointer
    );
  }

  function bindCardEvents() {
    cards.forEach(
      function (card) {
        card.addEventListener(
          'click',
          function () {
            if (
              card.classList.contains(
                'is-prev'
              )
            ) {
              slide(-1);
            } else if (
              card.classList.contains(
                'is-next'
              )
            ) {
              slide(1);
            }
          }
        );
      }
    );
  }

  function prepareImages() {
    cards.forEach(
      function (card) {
        card
          .querySelectorAll('img')
          .forEach(
            function (image) {
              image.setAttribute(
                'draggable',
                'false'
              );

              image.addEventListener(
                'dragstart',
                function (event) {
                  event.preventDefault();
                }
              );
            }
          );
      }
    );
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      return;
    }

    clearTimeout(changeTimer);

    changeTimer = null;
    isChanging = false;

    pendingTarget = null;
    pendingDirection = 0;

    resetTrackVisualState();
    updateCards();
  }

  function initializeCarousel() {
    track =
      document.getElementById(
        'transfTrack'
      );

    viewport =
      document.getElementById(
        'transfViewport'
      );

    dotsWrapper =
      document.getElementById(
        'transfDots'
      );

    previousButton =
      document.getElementById(
        'transfPrev'
      );

    nextButton =
      document.getElementById(
        'transfNext'
      );

    if (
      !track ||
      !viewport ||
      !dotsWrapper
    ) {
      return;
    }

    /*
     * Remove clones da implementação antiga.
     */
    track
      .querySelectorAll(
        '[data-transf-clone="true"]'
      )
      .forEach(
        function (clone) {
          clone.remove();
        }
      );

    cards =
      Array.from(
        track.querySelectorAll(
          ':scope > .transf-card'
        )
      );

    total = cards.length;

    if (!total) {
      return;
    }

    currentIndex = 0;

    resetTrackVisualState();

    viewport.setAttribute(
      'tabindex',
      '0'
    );

    viewport.setAttribute(
      'role',
      'region'
    );

    viewport.setAttribute(
      'aria-roledescription',
      'carrossel'
    );

    track.setAttribute(
      'role',
      'group'
    );

    cards.forEach(
      function (card, index) {
        card.setAttribute(
          'role',
          'group'
        );

        card.setAttribute(
          'aria-roledescription',
          'slide'
        );

        card.setAttribute(
          'aria-label',
          (
            index + 1
          ) +
            ' de ' +
            total
        );
      }
    );

    prepareImages();
    buildDots();

    bindArrowEvents();
    bindKeyboardEvents();
    bindPointerEvents();
    bindCardEvents();

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    updateCards();

    window.transfSlide =
      function (direction) {
        slide(direction);
      };

    window.transfGoTo =
      function (index) {
        var target =
          Number(index);

        if (
          Number.isNaN(target)
        ) {
          return;
        }

        goTo(
          target,
          getDirectionTo(target)
        );
      };
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      initializeCarousel,
      {
        once: true
      }
    );
  } else {
    initializeCarousel();
  }
})();
// ─────────────────────────────────────────────────────────────
// COUNTUP
// ─────────────────────────────────────────────────────────────
(function () {
  var statistics =
    document.querySelectorAll(
      '.hero-stat-num[data-target]'
    );

  if (!statistics.length) return;

  var fired = false;

  function easeOutExpo(time) {
    return time === 1
      ? 1
      : 1 -
        Math.pow(
          2,
          -10 * time
        );
  }

  function animateCount(
    element,
    delay
  ) {
    var target =
      parseInt(
        element.getAttribute(
          'data-target'
        ),
        10
      );

    var suffix =
      element.getAttribute(
        'data-suffix'
      ) || '';

    var duration =
      target >= 100
        ? 2200
        : target >= 10
          ? 1600
          : 1000;

    var start = null;

    setTimeout(
      function () {
        function step(timestamp) {
          if (!start) {
            start = timestamp;
          }

          var progress =
            Math.min(
              (
                timestamp -
                start
              ) /
                duration,
              1
            );

          var current =
            Math.round(
              easeOutExpo(
                progress
              ) *
                target
            );

          element.textContent =
            current + suffix;

          if (progress < 1) {
            requestAnimationFrame(
              step
            );
          } else {
            element.textContent =
              target + suffix;
          }
        }

        requestAnimationFrame(step);
      },
      delay
    );
  }

  function fireCounters() {
    if (fired) return;

    fired = true;

    statistics.forEach(
      function (element, index) {
        animateCount(
          element,
          index * 280
        );
      }
    );
  }

  var heroContent =
    document.getElementById(
      'heroContent'
    );

  if (heroContent) {
    var observer =
      new MutationObserver(
        function (mutations) {
          mutations.forEach(
            function (mutation) {
              if (
                mutation.type ===
                  'attributes' &&
                mutation.attributeName ===
                  'class' &&
                heroContent.classList.contains(
                  'hero-animated'
                )
              ) {
                observer.disconnect();

                setTimeout(
                  fireCounters,
                  1450
                );
              }
            }
          );
        }
      );

    observer.observe(
      heroContent,
      {
        attributes: true
      }
    );
  }

  if (
    heroContent &&
    heroContent.classList.contains(
      'hero-animated'
    )
  ) {
    setTimeout(
      fireCounters,
      800
    );
  }

  setTimeout(
    function () {
      if (!fired) {
        fireCounters();
      }
    },
    3000
  );
})();

// ═════════════════════════════════════════════════════════════
// SIMULADOR INFINITEPAY
// Fonte de verdade: tabelas-infinitepay-elias.js
// Consulta: 0 = Consulta | 1 = Retorno | 2 = Combo
// ═════════════════════════════════════════════════════════════
(function () {
  'use strict';

  if (
    typeof INFINITEPAY_APPROVED_DATA === 'undefined' ||
    !INFINITEPAY_APPROVED_DATA.plans
  ) {
    console.error(
      'Dados comerciais da InfinitePay não foram carregados. ' +
      'Carregue tabelas-infinitepay-elias.js antes de scripts.js.'
    );

    return;
  }

  var DATA = INFINITEPAY_APPROVED_DATA;

  var FALLBACK_OPTION_KEYS = {
    lite: [
      'mensal',
      'trimestral',
      'semestral',
      'anual'
    ],

    vip: [
      'mensal',
      'trimestral',
      'semestral',
      'anual'
    ],

    consulta: [
      'consulta',
      'retorno',
      'combo'
    ]
  };

  var SIM = {
    lite: {
      option: 'mensal',
      mode: 'pix',
      parc: 1
    },

    vip: {
      option: 'mensal',
      mode: 'pix',
      parc: 1
    },

    consulta: {
      option: 'consulta',
      mode: 'pix',
      parc: 1
    }
  };

  var PERIOD_SUFFIX = {
  lite: {
    mensal: '/mês',
    trimestral: '/3 meses',
    semestral: '/6 meses',
    anual: '/ano'
  },

  vip: {
    mensal: '/mês',
    trimestral: '/3 meses',
    semestral: '/6 meses',
    anual: '/ano'
  },

  consulta: {
    consulta: '/sessão',
    retorno: '/sessão',
    combo: '/sessão'
  }
};

  var currencyFormatter = new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  );

  function formatCurrency(value) {
    return currencyFormatter.format(value);
  }

  function getPlan(id) {
    return DATA.plans[id] || null;
  }

  function getOptionKeys(id) {
    var plan = getPlan(id);

    if (
      plan &&
      Array.isArray(plan.optionOrder)
    ) {
      return plan.optionOrder;
    }

    return FALLBACK_OPTION_KEYS[id] || [];
  }

  function resolveOptionKey(
    id,
    selection
  ) {
    var keys = getOptionKeys(id);

    if (
      typeof selection === 'number'
    ) {
      return keys[selection];
    }

    if (
      typeof selection === 'string' &&
      /^\d+$/.test(selection)
    ) {
      return keys[
        Number(selection)
      ];
    }

    return selection;
  }

  function getOption(id) {
    var plan = getPlan(id);
    var state = SIM[id];

    if (
      !plan ||
      !state ||
      !plan.options
    ) {
      return null;
    }

    return (
      plan.options[state.option] ||
      null
    );
  }

  function getCard(
    id,
    source
  ) {
    if (
      source &&
      typeof source.closest === 'function'
    ) {
      var sourceCard =
        source.closest(
          '.plans-alt-card'
        );

      if (sourceCard) {
        return sourceCard;
      }
    }

    var tabs =
      document.getElementById(
        'sim-mods-' + id
      );

    return tabs
      ? tabs.closest(
          '.plans-alt-card'
        )
      : null;
  }

  function updateCardHeader(
    id,
    card
  ) {
    if (!card) return;

    var option = getOption(id);

    if (!option) return;

    var amountElement =
      card.querySelector(
        '.pac-amount'
      );

    var periodElement =
      card.querySelector(
        '.pac-period'
      );

    var descriptionElement =
      card.querySelector(
        '.pac-equiv'
      );

    var parts =
      option.base
        .toFixed(2)
        .split('.');

    var suffix =
      PERIOD_SUFFIX[id] &&
      PERIOD_SUFFIX[id][SIM[id].option]
        ? PERIOD_SUFFIX[id][SIM[id].option]
        : '';

    if (amountElement) {
      amountElement.textContent =
        Number(parts[0])
          .toLocaleString(
            'pt-BR'
          );
    }

    if (periodElement) {
      periodElement.textContent =
        ',' +
        parts[1] +
        suffix;
    }

    if (
      descriptionElement &&
      option.description
    ) {
      descriptionElement.textContent =
        option.description;
    }
  }

  function syncPeriodRows(
    id,
    card
  ) {
    if (!card) return;

    var selectedIndex =
      getOptionKeys(id)
        .indexOf(
          SIM[id].option
        );

    card
      .querySelectorAll(
        '.pac-period-row'
      )
      .forEach(
        function (
          row,
          index
        ) {
          var active =
            index ===
            selectedIndex;

          row.classList.toggle(
            'active',
            active
          );

          row.setAttribute(
            'aria-pressed',
            active
              ? 'true'
              : 'false'
          );
        }
      );
  }

  function syncSimulatorButtons(id) {
    var tabs =
      document.getElementById(
        'sim-mods-' + id
      );

    if (!tabs) return;

    var selectedIndex =
      getOptionKeys(id)
        .indexOf(
          SIM[id].option
        );

    tabs
      .querySelectorAll(
        '.pac-sim-mod-btn'
      )
      .forEach(
        function (
          button,
          index
        ) {
          var active =
            index ===
            selectedIndex;

          button.classList.toggle(
            'active',
            active
          );

          button.setAttribute(
            'aria-pressed',
            active
              ? 'true'
              : 'false'
          );
        }
      );
  }

  function resetInstallments(id) {
    if (!SIM[id]) return;

    SIM[id].parc = 1;

    document
      .querySelectorAll(
        '#pac-parc-' +
        id +
        ' .pac-parc-btn'
      )
      .forEach(
        function (
          button,
          index
        ) {
          var active =
            index === 0;

          button.classList.toggle(
            'active',
            active
          );

          button.setAttribute(
            'aria-pressed',
            active
              ? 'true'
              : 'false'
          );
        }
      );
  }

  function updateConsultaCTA() {
    var option =
      getOption('consulta');

    var cta =
      document.getElementById(
        'pac-cta-consulta'
      );

    if (
      !option ||
      !cta
    ) {
      return;
    }

    cta.textContent =
      option.ctaLabel ||
      'AGENDAR CONSULTA →';

    cta.href =
      'https://wa.me/5585996639595?text=' +
      encodeURIComponent(
        option.whatsappText ||
        'Olá Elias! Tenho interesse na consulta.'
      );
  }

  function render(id) {
    var state = SIM[id];
    var option = getOption(id);

    var result =
      document.getElementById(
        'pac-result-' + id
      );

    if (
      !state ||
      !option ||
      !result
    ) {
      return;
    }

    if (
      state.mode === 'pix'
    ) {
      result.innerHTML =
        '<div class="pac-result-tag">' +
          'PIX · TAXA 0% · ' +
          option.label +
        '</div>' +

        '<div class="pac-result-val">' +
          formatCurrency(
            option.base
          ) +
        '</div>' +

        '<div class="pac-result-sub">' +
          'Valor cobrado do cliente, sem acréscimo.' +
        '</div>';

      return;
    }

    var credit =
      option.credit &&
      option.credit[
        state.parc
      ];

    if (!credit) {
      result.innerHTML =
        '<div class="pac-result-tag">' +
          'CRÉDITO · ' +
          option.label +
        '</div>' +

        '<div class="pac-result-val">' +
          '—' +
        '</div>' +

        '<div class="pac-result-sub">' +
          'Valor indisponível para esta parcela.' +
        '</div>';

      return;
    }

    result.innerHTML =
      '<div class="pac-result-tag">' +
        'CRÉDITO EM ' +
        state.parc +
        'X · TAXA INCLUÍDA · ' +
        option.label +
      '</div>' +

      '<div class="pac-result-val">' +
        state.parc +
        'x de ' +
        formatCurrency(
          credit.installment
        ) +
      '</div>' +

      '<div class="pac-result-sub">' +

        '<span>' +
          'Total no cartão: ' +
          formatCurrency(
            credit.total
          ) +
        '</span>' +

        '<span>' +
          'Valor-base: ' +
          formatCurrency(
            option.base
          ) +
        '</span>' +

      '</div>';
  }

  function refresh(
    id,
    source
  ) {
    var card =
      getCard(
        id,
        source
      );

    updateCardHeader(
      id,
      card
    );

    syncPeriodRows(
      id,
      card
    );

    syncSimulatorButtons(id);

    render(id);

    if (
      id === 'consulta'
    ) {
      updateConsultaCTA();
    }
  }

  function setOption(
    id,
    selection,
    button,
    errorLabel
  ) {
    var plan = getPlan(id);

    var optionKey =
      resolveOptionKey(
        id,
        selection
      );

    if (
      !SIM[id] ||
      !plan ||
      !plan.options ||
      !plan.options[optionKey]
    ) {
      console.error(
        errorLabel + ':',
        id,
        selection
      );

      return;
    }

    SIM[id].option =
      optionKey;

    resetInstallments(id);

    refresh(
      id,
      button || null
    );
  }

  window.pacSetMod =
    function (
      id,
      selection,
      button
    ) {
      setOption(
        id,
        selection,
        button,
        'Opção inválida'
      );
    };

  window.simSetMod =
    function (
      id,
      selection,
      button
    ) {
      setOption(
        id,
        selection,
        button,
        'Modalidade inválida'
      );
    };

  window.pacSetMode =
    function (
      id,
      mode,
      button
    ) {
      if (
        !SIM[id] ||
        !button
      ) {
        return;
      }

      SIM[id].mode =
        mode === 'credito'
          ? 'credito'
          : 'pix';

      var toggle =
        button.closest(
          '.pac-toggle'
        );

      if (toggle) {
        toggle
          .querySelectorAll(
            '.pac-mode-btn'
          )
          .forEach(
            function (
              modeButton
            ) {
              modeButton
                .classList
                .remove(
                  'active'
                );

              modeButton
                .setAttribute(
                  'aria-pressed',
                  'false'
                );
            }
          );
      }

      button.classList.add(
        'active'
      );

      button.setAttribute(
        'aria-pressed',
        'true'
      );

      var installments =
        document.getElementById(
          'pac-parc-' + id
        );

      if (installments) {
        installments.style.display =
          SIM[id].mode === 'credito'
            ? 'block'
            : 'none';
      }

      if (
        SIM[id].mode === 'credito'
      ) {
        resetInstallments(id);
      }

      render(id);
    };

  window.pacSetParc =
    function (
      id,
      installmentNumber,
      button
    ) {
      if (
        !SIM[id] ||
        !button
      ) {
        return;
      }

      SIM[id].parc =
        Number(
          installmentNumber
        );

      var grid =
        button.closest(
          '.pac-parc-grid'
        );

      if (grid) {
        grid
          .querySelectorAll(
            '.pac-parc-btn'
          )
          .forEach(
            function (item) {
              item
                .classList
                .remove(
                  'active'
                );

              item.setAttribute(
                'aria-pressed',
                'false'
              );
            }
          );
      }

      button.classList.add(
        'active'
      );

      button.setAttribute(
        'aria-pressed',
        'true'
      );

      render(id);
    };

  function initialize() {
    [
      'lite',
      'vip',
      'consulta'
    ].forEach(
      function (id) {
        var plan =
          getPlan(id);

        if (
          !plan ||
          !SIM[id]
        ) {
          return;
        }

        if (
          plan.defaultOption &&
          plan.options &&
          plan.options[
            plan.defaultOption
          ]
        ) {
          SIM[id].option =
            plan.defaultOption;
        }

        SIM[id].mode = 'pix';
        SIM[id].parc = 1;

        refresh(
          id,
          null
        );
      }
    );
  }

  if (
    document.readyState === 'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      initialize,
      {
        once: true
      }
    );
  } else {
    initialize();
  }
})();
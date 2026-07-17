// ── HERO PHOTO: injeção via JS — evita parse lento de base64 inline
(function() {
  var mob =
    window.innerWidth < 768 ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  var img = document.getElementById('heroImg');

  if (!img) return;

  img.src = mob
    ? 'assets/images/image_6_2520acbf46.jpg'
    : 'assets/images/image_7_d17f1147ea.jpg';
})();

/* ════════════════════════════════════════════════════════════ */

// ── NAVBAR SCROLL
window.addEventListener(
  'scroll',
  function() {
    var navbar = document.getElementById('navbar');

    if (!navbar) return;

    navbar.classList.toggle(
      'scrolled',
      window.scrollY > 20
    );
  },
  { passive: true }
);

// ── HERO: animação de entrada
(function() {
  var content = document.getElementById('heroContent');
  var img = document.getElementById('heroImg');

  if (!content) return;

  function triggerHero() {
    requestAnimationFrame(function() {
      setTimeout(function() {
        content.classList.add('hero-animated');
      }, 80);
    });
  }

  if (img && img.complete) {
    triggerHero();
  } else if (img) {
    img.addEventListener('load', triggerHero);
    setTimeout(triggerHero, 400);
  } else {
    triggerHero();
  }
})();

// ── MOBILE MENU
function toggleMenu() {
  var mobileMenu =
    document.getElementById('mobileMenu');

  if (!mobileMenu) return;

  var open =
    mobileMenu.classList.toggle('open');

  mobileMenu.setAttribute(
    'aria-hidden',
    (!open).toString()
  );

  var button =
    document.querySelector('.hamburger');

  if (button) {
    button.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );
  }
}

function closeMenu() {
  var mobileMenu =
    document.getElementById('mobileMenu');

  if (!mobileMenu) return;

  mobileMenu.classList.remove('open');

  mobileMenu.setAttribute(
    'aria-hidden',
    'true'
  );

  var button =
    document.querySelector('.hamburger');

  if (button) {
    button.setAttribute(
      'aria-expanded',
      'false'
    );
  }
}

// ── REVEAL ON SCROLL
var revealElements =
  document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  var revealObserver =
    new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');

          revealObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

  revealElements.forEach(function(element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function(element) {
    element.classList.add('visible');
  });
}

// ── LOGO SOBRE: animação draw + fill + float
(function() {
  var logo =
    document.getElementById('sobreLogo');

  var tagline =
    document.getElementById('sobreTagline');

  var logoColumn =
    document.getElementById('sobreLogoCol');

  if (!logo) return;

  var parts = [
    'lp1',
    'lp2',
    'lp3',
    'lp4'
  ];

  var delays = [
    0,
    220,
    380,
    540
  ];

  if (!('IntersectionObserver' in window)) {
    parts.forEach(function(id) {
      var element =
        document.getElementById(id);

      if (element) {
        element.classList.add('drawn');
      }
    });

    logo.classList.add('animated');

    if (tagline) {
      tagline.classList.add('animated');
    }

    if (logoColumn) {
      logoColumn.classList.add('animated');
    }

    return;
  }

  var logoObserver =
    new IntersectionObserver(
      function(entries) {
        if (!entries[0].isIntersecting) {
          return;
        }

        logoObserver.disconnect();

        parts.forEach(function(id, index) {
          var element =
            document.getElementById(id);

          if (!element) return;

          setTimeout(function() {
            element.classList.add('drawn');
          }, delays[index]);
        });

        setTimeout(function() {
          logo.classList.add('animated');
        }, 1000);

        if (tagline) {
          setTimeout(function() {
            tagline.classList.add('animated');
          }, 1100);
        }

        var tags =
          document.getElementById('sobreTags');

        if (tags) {
          setTimeout(function() {
            tags.classList.add('animated');
          }, 1400);
        }

        if (logoColumn) {
          setTimeout(function() {
            logoColumn.classList.add(
              'animated'
            );
          }, 400);
        }
      },
      {
        threshold: 0.25
      }
    );

  logoObserver.observe(logo);
})();

// ── FAQ ACCORDION
function toggleFaq(button) {
  var item = button.parentElement;

  var isOpen =
    item.classList.contains('open');

  document
    .querySelectorAll('.faq-item.open')
    .forEach(function(openItem) {
      openItem.classList.remove('open');

      var question =
        openItem.querySelector('.faq-q');

      if (question) {
        question.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });

  if (!isOpen) {
    item.classList.add('open');

    button.setAttribute(
      'aria-expanded',
      'true'
    );
  }
}

// ── PLAN SELECTOR LEGADO
function selectPlan(
  planId,
  period,
  amount,
  equivalent,
  element
) {
  var card =
    element.closest('.plan-card');

  if (!card) return;

  card
    .querySelectorAll('.plan-option')
    .forEach(function(option) {
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

// ── FORM SUBMIT → WHATSAPP + BACKUP LOCAL
var leadForm =
  document.getElementById('leadForm');

if (leadForm) {
  leadForm.addEventListener(
    'submit',
    function(event) {
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

      var leads;

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

      var lead = {
        id: Date.now(),
        nome: nome,
        whatsapp: whatsapp,
        objetivo: objetivo,
        mensagem: mensagem,
        data: new Date().toISOString(),
        status: 'novo'
      };

      leads.unshift(lead);

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

      var objectiveText =
        'Objetivo: ' +
        objetivo +
        '. ';

      var messageText =
        mensagem
          ? '\n\n' + mensagem
          : '';

      var text =
        encodeURIComponent(
          'Olá Elias! Me chamo ' +
          nome +
          '. Meu WhatsApp é ' +
          whatsapp +
          '. ' +
          objectiveText +
          'Entrei em contato pelo site.' +
          messageText
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

      leadForm.reset();
    }
  );
}

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

  setTimeout(function() {
    element.style.display = 'none';
  }, 5000);
}

// ── SMOOTH SCROLL PARA LINKS INTERNOS
document
  .querySelectorAll('a[href^="#"]')
  .forEach(function(anchor) {
    anchor.addEventListener(
      'click',
      function(event) {
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

// ── CARD 3D TILT
(function() {
  var cards =
    document.querySelectorAll(
      '.card-elite'
    );

  cards.forEach(function(card) {
    card.addEventListener(
      'mousemove',
      function(event) {
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
          'deg) ' +
          'rotateY(' +
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
      function() {
        card.style.transform = '';
        card.style.boxShadow = '';
      }
    );
  });
})();

// ══════════════════════════════════════════════════════════════
// CARROSSEL DE TRANSFORMAÇÕES
// Atual nítido + anterior e próximo com blur
// ══════════════════════════════════════════════════════════════
(function() {
  var track =
    document.getElementById(
      'transfTrack'
    );

  var viewport =
    document.getElementById(
      'transfViewport'
    );

  var dotsWrapper =
    document.getElementById(
      'transfDots'
    );

  var previousButton =
    document.getElementById(
      'transfPrev'
    );

  var nextButton =
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

  track
    .querySelectorAll(
      '[data-transf-clone="true"]'
    )
    .forEach(function(clone) {
      clone.remove();
    });

  var originalCards =
    Array.from(
      track.querySelectorAll(
        '.transf-card'
      )
    );

  var total =
    originalCards.length;

  if (!total) return;

  var allCards =
    originalCards.slice();

  var currentIndex = 0;
  var isJumping = false;
  var isAnimating = false;
  var resizeFrame = 0;

  if (total > 1) {
    var firstClone =
      originalCards[0]
        .cloneNode(true);

    var lastClone =
      originalCards[
        total - 1
      ].cloneNode(true);

    firstClone.dataset.transfClone =
      'true';

    lastClone.dataset.transfClone =
      'true';

    firstClone.setAttribute(
      'aria-hidden',
      'true'
    );

    lastClone.setAttribute(
      'aria-hidden',
      'true'
    );

    track.appendChild(firstClone);

    track.insertBefore(
      lastClone,
      originalCards[0]
    );

    allCards =
      Array.from(
        track.querySelectorAll(
          '.transf-card'
        )
      );

    currentIndex = 1;
  }

  viewport.setAttribute(
    'tabindex',
    '0'
  );

  viewport.setAttribute(
    'role',
    'region'
  );

  viewport.setAttribute(
    'aria-label',
    'Carrossel de transformações corporais'
  );

  dotsWrapper.innerHTML = '';

  var dots =
    originalCards.map(
      function(card, index) {
        var dot =
          document.createElement(
            'button'
          );

        dot.type = 'button';

        dot.className =
          'transf-dot' +
          (
            index === 0
              ? ' active'
              : ''
          );

        dot.setAttribute(
          'aria-label',
          'Ir para transformação ' +
          (
            index + 1
          )
        );

        dot.setAttribute(
          'aria-current',
          index === 0
            ? 'true'
            : 'false'
        );

        dot.addEventListener(
          'click',
          function() {
            goTo(
              total > 1
                ? index + 1
                : index,
              true
            );
          }
        );

        dotsWrapper.appendChild(dot);

        return dot;
      }
    );

  function getRealIndex() {
    if (total <= 1) {
      return 0;
    }

    var index =
      currentIndex - 1;

    if (index < 0) {
      index = total - 1;
    }

    if (index >= total) {
      index = 0;
    }

    return index;
  }

  function getOffset(index) {
    var card =
      allCards[index];

    if (!card) return 0;

    var cardLeft =
      card.offsetLeft;

    var cardWidth =
      card.offsetWidth;

    var viewportWidth =
      viewport.clientWidth;

    return Math.round(
      cardLeft -
      (
        viewportWidth -
        cardWidth
      ) / 2
    );
  }

  function updateVisual() {
    var previousIndex =
      currentIndex - 1;

    var nextIndex =
      currentIndex + 1;

    allCards.forEach(
      function(card, index) {
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

        card.classList.toggle(
          'active',
          active
        );

        card.classList.toggle(
          'is-prev',
          previous
        );

        card.classList.toggle(
          'is-next',
          next
        );

        card.classList.toggle(
          'is-hidden',
          hidden
        );

        card.setAttribute(
          'aria-hidden',
          active
            ? 'false'
            : 'true'
        );
      }
    );

    var realIndex =
      getRealIndex();

    dots.forEach(
      function(dot, index) {
        var active =
          index === realIndex;

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

    if (previousButton) {
      previousButton.disabled = false;
    }

    if (nextButton) {
      nextButton.disabled = false;
    }
  }

  function setPosition(
    index,
    animated
  ) {
    track.style.transition =
      animated
        ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
        : 'none';

    track.style.transform =
      'translate3d(' +
      -getOffset(index) +
      'px, 0, 0)';
  }

  function goTo(
    index,
    animated
  ) {
    if (animated === undefined) {
      animated = true;
    }

    if (total <= 1) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    setPosition(
      currentIndex,
      animated
    );

    updateVisual();
  }

  function refreshPosition() {
    cancelAnimationFrame(
      resizeFrame
    );

    resizeFrame =
      requestAnimationFrame(
        function() {
          goTo(
            currentIndex,
            false
          );
        }
      );
  }

  track.addEventListener(
    'transitionstart',
    function(event) {
      if (
        event.target === track &&
        event.propertyName ===
          'transform'
      ) {
        isAnimating = true;
      }
    }
  );

  track.addEventListener(
    'transitionend',
    function(event) {
      if (
        event.target !== track ||
        event.propertyName !==
          'transform'
      ) {
        return;
      }

      isAnimating = false;

      if (
        total <= 1 ||
        isJumping
      ) {
        return;
      }

      if (currentIndex === 0) {
        isJumping = true;

        goTo(
          total,
          false
        );

        requestAnimationFrame(
          function() {
            requestAnimationFrame(
              function() {
                isJumping = false;
              }
            );
          }
        );
      } else if (
        currentIndex ===
        allCards.length - 1
      ) {
        isJumping = true;

        goTo(
          1,
          false
        );

        requestAnimationFrame(
          function() {
            requestAnimationFrame(
              function() {
                isJumping = false;
              }
            );
          }
        );
      }
    }
  );

  // ── DRAG / SWIPE
  var startX = 0;
  var lastX = 0;
  var startOffset = 0;
  var dragging = false;
  var pointerId = null;

  function dragStart(event) {
    if (
      total <= 1 ||
      event.button > 0
    ) {
      return;
    }

    pointerId =
      event.pointerId;

    startX =
      event.clientX;

    lastX = startX;

    startOffset =
      getOffset(currentIndex);

    dragging = true;

    track.classList.add(
      'dragging'
    );

    track.style.transition =
      'none';

    if (
      viewport.setPointerCapture &&
      pointerId !== undefined
    ) {
      viewport.setPointerCapture(
        pointerId
      );
    }
  }

  function dragMove(event) {
    if (
      !dragging ||
      event.pointerId !== pointerId
    ) {
      return;
    }

    lastX =
      event.clientX;

    var delta =
      lastX - startX;

    track.style.transform =
      'translate3d(' +
      -(
        startOffset -
        delta
      ) +
      'px, 0, 0)';
  }

  function dragEnd(event) {
    if (
      !dragging ||
      event.pointerId !== pointerId
    ) {
      return;
    }

    dragging = false;

    track.classList.remove(
      'dragging'
    );

    var delta =
      lastX - startX;

    if (
      Math.abs(delta) >= 50
    ) {
      goTo(
        currentIndex +
        (
          delta < 0
            ? 1
            : -1
        ),
        true
      );
    } else {
      goTo(
        currentIndex,
        true
      );
    }

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
  }

  viewport.addEventListener(
    'pointerdown',
    dragStart
  );

  viewport.addEventListener(
    'pointermove',
    dragMove
  );

  viewport.addEventListener(
    'pointerup',
    dragEnd
  );

  viewport.addEventListener(
    'pointercancel',
    dragEnd
  );

  viewport.addEventListener(
    'keydown',
    function(event) {
      if (
        event.key ===
        'ArrowLeft'
      ) {
        event.preventDefault();

        window.transfSlide(-1);
      }

      if (
        event.key ===
        'ArrowRight'
      ) {
        event.preventDefault();

        window.transfSlide(1);
      }
    }
  );

  window.transfSlide =
    function(direction) {
      if (
        total <= 1 ||
        isAnimating ||
        isJumping ||
        dragging
      ) {
        return;
      }

      goTo(
        currentIndex +
        direction,
        true
      );
    };

  window.addEventListener(
    'resize',
    refreshPosition,
    { passive: true }
  );

  window.addEventListener(
    'orientationchange',
    refreshPosition,
    { passive: true }
  );

  if (
    'ResizeObserver' in window
  ) {
    var resizeObserver =
      new ResizeObserver(
        refreshPosition
      );

    resizeObserver.observe(
      viewport
    );
  }

  track
    .querySelectorAll('img')
    .forEach(function(image) {
      image.setAttribute(
        'draggable',
        'false'
      );

      if (!image.complete) {
        image.addEventListener(
          'load',
          refreshPosition,
          { once: true }
        );
      }
    });

  requestAnimationFrame(
    function() {
      requestAnimationFrame(
        function() {
          goTo(
            total > 1
              ? 1
              : 0,
            false
          );
        }
      );
    }
  );
})();

// ── COUNTUP
(function() {
  var statisticElements =
    document.querySelectorAll(
      '.hero-stat-num[data-target]'
    );

  if (!statisticElements.length) {
    return;
  }

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
      function() {
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

          var eased =
            easeOutExpo(
              progress
            );

          var current =
            Math.round(
              eased * target
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

        requestAnimationFrame(
          step
        );
      },
      delay
    );
  }

  function fireCounters() {
    if (fired) return;

    fired = true;

    statisticElements.forEach(
      function(element, index) {
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
    var mutationObserver =
      new MutationObserver(
        function(mutations) {
          mutations.forEach(
            function(mutation) {
              if (
                mutation.type ===
                  'attributes' &&
                mutation.attributeName ===
                  'class' &&
                heroContent.classList
                  .contains(
                    'hero-animated'
                  )
              ) {
                mutationObserver
                  .disconnect();

                setTimeout(
                  fireCounters,
                  1450
                );
              }
            }
          );
        }
      );

    mutationObserver.observe(
      heroContent,
      {
        attributes: true
      }
    );
  }

  if (
    heroContent &&
    heroContent.classList
      .contains(
        'hero-animated'
      )
  ) {
    setTimeout(
      fireCounters,
      800
    );
  }

  setTimeout(
    function() {
      if (!fired) {
        fireCounters();
      }
    },
    3000
  );
})();

// ══════════════════════════════════════════════════════════════
// SIMULADOR INFINITEPAY
// Fonte de verdade: tabelas-infinitepay-elias.js
// Consulta possui apenas:
// 0 = Consulta
// 1 = Presencial
// ══════════════════════════════════════════════════════════════
(function() {
  'use strict';

  if (
    typeof INFINITEPAY_APPROVED_DATA ===
      'undefined' ||
    !INFINITEPAY_APPROVED_DATA.plans
  ) {
    console.error(
      'Dados comerciais da InfinitePay não foram carregados. ' +
      'Carregue tabelas-infinitepay-elias.js antes de scripts.js.'
    );

    return;
  }

  var DATA =
    INFINITEPAY_APPROVED_DATA;

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
      'presencial'
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
      consulta: '',
      presencial: ''
    }
  };

  var currencyFormatter =
    new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    );

  function formatCurrency(value) {
    return currencyFormatter.format(
      value
    );
  }

  function getPlan(id) {
    return (
      DATA.plans[id] ||
      null
    );
  }

  function getOptionKeys(id) {
    var plan =
      getPlan(id);

    if (
      plan &&
      Array.isArray(
        plan.optionOrder
      )
    ) {
      return plan.optionOrder;
    }

    return (
      FALLBACK_OPTION_KEYS[id] ||
      []
    );
  }

  function resolveOptionKey(
    id,
    selection
  ) {
    var keys =
      getOptionKeys(id);

    if (
      typeof selection ===
      'number'
    ) {
      return keys[selection];
    }

    if (
      typeof selection ===
        'string' &&
      /^\d+$/.test(selection)
    ) {
      return keys[
        Number(selection)
      ];
    }

    return selection;
  }

  function getOption(id) {
    var plan =
      getPlan(id);

    var state =
      SIM[id];

    if (
      !plan ||
      !state ||
      !plan.options
    ) {
      return null;
    }

    return (
      plan.options[
        state.option
      ] ||
      null
    );
  }

  function getCard(
    id,
    source
  ) {
    if (
      source &&
      source.closest
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

    var option =
      getOption(id);

    if (!option) return;

    var priceElement =
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

    if (priceElement) {
      priceElement.textContent =
        Number(parts[0])
          .toLocaleString(
            'pt-BR'
          );
    }

    if (periodElement) {
      var suffix =
        PERIOD_SUFFIX[id] &&
        PERIOD_SUFFIX[id][
          SIM[id].option
        ]
          ? PERIOD_SUFFIX[id][
              SIM[id].option
            ]
          : '';

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
        function(row, index) {
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
        function(button, index) {
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
        function(button, index) {
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

    var message =
      option.whatsappText ||
      'Olá Elias! Tenho interesse na consulta.';

    cta.href =
      'https://wa.me/5585996639595?text=' +
      encodeURIComponent(
        message
      );
  }

  function render(id) {
    var state =
      SIM[id];

    var option =
      getOption(id);

    var resultElement =
      document.getElementById(
        'pac-result-' + id
      );

    if (
      !state ||
      !option ||
      !resultElement
    ) {
      return;
    }

    if (
      state.mode === 'pix'
    ) {
      resultElement.innerHTML =
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
      resultElement.innerHTML =
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

    resultElement.innerHTML =
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

      '<div class="pac-result-sub" ' +
        'style="' +
          'display:flex;' +
          'flex-direction:column;' +
          'gap:2px;' +
          'margin-top:6px' +
        '">' +

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

    if (id === 'consulta') {
      updateConsultaCTA();
    }
  }

  window.pacSetMod =
    function(
      id,
      selection,
      button
    ) {
      var plan =
        getPlan(id);

      var optionKey =
        resolveOptionKey(
          id,
          selection
        );

      if (
        !SIM[id] ||
        !plan ||
        !plan.options ||
        !plan.options[
          optionKey
        ]
      ) {
        console.error(
          'Opção inválida:',
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
        button
      );
    };

  window.simSetMod =
    function(
      id,
      selection,
      button
    ) {
      var plan =
        getPlan(id);

      var optionKey =
        resolveOptionKey(
          id,
          selection
        );

      if (
        !SIM[id] ||
        !plan ||
        !plan.options ||
        !plan.options[
          optionKey
        ]
      ) {
        console.error(
          'Modalidade inválida:',
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
        button
      );
    };

  window.pacSetMode =
    function(
      id,
      mode,
      button
    ) {
      if (!SIM[id]) return;

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
            function(modeButton) {
              modeButton
                .classList.remove(
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
          SIM[id].mode ===
            'credito'
            ? 'block'
            : 'none';
      }

      if (
        SIM[id].mode ===
        'credito'
      ) {
        resetInstallments(id);
      }

      render(id);
    };

  window.pacSetParc =
    function(
      id,
      installmentNumber,
      button
    ) {
      if (!SIM[id]) return;

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
            function(item) {
              item.classList.remove(
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
    ].forEach(function(id) {
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
    });
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      initialize
    );
  } else {
    initialize();
  }
})();
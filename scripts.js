// ── HERO PHOTO: injeção via JS — evita parse lento de base64 inline
(function() {
  var mob = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var img = document.getElementById('heroImg');
  if (!img) return;
  img.src = mob
    ? 'assets/images/image_6_2520acbf46.jpg'
    : 'assets/images/image_7_d17f1147ea.jpg';
})();

/* ════════════════════════════════════════════════════════════ */

// ── NAVBAR SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── HERO: animação de entrada (direita → posição) após imagem carregar
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
    // Fallback: animar depois de 400ms mesmo sem imagem
    setTimeout(triggerHero, 400);
  } else {
    triggerHero();
  }
})();

// ── MOBILE MENU
function toggleMenu() {
  var mm = document.getElementById('mobileMenu');
  if (!mm) return;
  var open = mm.classList.toggle('open');
  // Update accessibility attributes
  mm.setAttribute('aria-hidden', (!open).toString());
  var btn = document.querySelector('.hamburger');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeMenu() {
  var mm = document.getElementById('mobileMenu');
  if (!mm) return;
  mm.classList.remove('open');
  mm.setAttribute('aria-hidden', 'true');
  var btn = document.querySelector('.hamburger');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ── REVEAL ON SCROLL
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }});
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ── LOGO SOBRE: animação draw + fill + float
(function() {
  var logo     = document.getElementById('sobreLogo');
  var tagline  = document.getElementById('sobreTagline');
  var logoCol  = document.getElementById('sobreLogoCol');
  if (!logo) return;

  // Sequência: lp1 → lp2 → lp3 → lp4 (delays em ms)
  var parts   = ['lp1','lp2','lp3','lp4'];
  var delays  = [0, 220, 380, 540];

  var logoObs = new IntersectionObserver(function(entries) {
    if (!entries[0].isIntersecting) return;
    logoObs.disconnect();

    // 1. Animar polígonos com efeito draw
    parts.forEach(function(id, i) {
      var el = document.getElementById(id);
      if (!el) return;
      setTimeout(function() {
        el.classList.add('drawn');
      }, delays[i]);
    });

    // 2. Float do logo inteiro
    setTimeout(function() {
      logo.classList.add('animated');
    }, 1000);

    // 4. Tagline com letter-spacing
    if (tagline) setTimeout(function() {
      tagline.classList.add('animated');
    }, 1100);

    // 5. Tags de especialidade
    var tags = document.getElementById('sobreTags');
    if (tags) setTimeout(function() {
      tags.classList.add('animated');
    }, 1400);

    // 5. Linha decorativa cresce
    if (logoCol) setTimeout(function() {
      logoCol.classList.add('animated');
    }, 400);

  }, { threshold: 0.25 });

  logoObs.observe(logo);
})();

// ── FAQ ACCORDION
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    const q = i.querySelector('.faq-q');
    if (q) q.setAttribute('aria-expanded','false');
  });

  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
}

(function() {
  function bindFocusableClickables(selector, callback) {
    document.querySelectorAll(selector).forEach(function(el) {
      el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false');
      el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          callback.call(this, e);
        }
      });
    });
  }

  function initFocusableClickables() {
    // `.faq-q` and `.pac-period-row` are semantic <button> elements now; no extra key bindings required.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFocusableClickables);
  } else {
    initFocusableClickables();
  }
})();

// ── PLAN SELECTOR
function selectPlan(planId, period, amount, equiv, el) {
  const card = el.closest('.plan-card');
  if (!card) return;
  card.querySelectorAll('.plan-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const amEl = document.getElementById(planId + '-amount');
  const eqEl = document.getElementById(planId + '-equiv');
  if (amEl) amEl.textContent = amount;
  if (eqEl) eqEl.textContent = equiv;
}

// ── FORM SUBMIT → WHATSAPP + ADMIN
document.getElementById('leadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const objetivo = document.getElementById('objetivo').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !whatsapp || !objetivo) {
    showFeedback('Preencha nome, WhatsApp e objetivo para continuar.', 'error');
    return;
  }

  // Salvar no localStorage apenas como backup local; não substitui backend/CRM.
  const leads = JSON.parse(localStorage.getItem('ce_leads') || '[]');
  const lead = { id: Date.now(), nome, whatsapp, objetivo, mensagem, data: new Date().toISOString(), status: 'novo' };
  leads.unshift(lead);
  localStorage.setItem('ce_leads', JSON.stringify(leads));

  const obj = `Objetivo: ${objetivo}. `;
  const msg = mensagem ? `/n/n${mensagem}` : '';
  const text = encodeURIComponent(`Olá Elias! Me chamo ${nome}. Meu WhatsApp é ${whatsapp}. ${obj}Entrei em contato pelo site.${msg}`);

  showFeedback('Mensagem registrada. Abrindo WhatsApp...', 'success');
  window.open(`https://wa.me/5585996639595?text=${text}`, '_blank');
  this.reset();
});

function showFeedback(msg, type) {
  const el = document.getElementById('form-feedback');
  el.textContent = msg;
  el.style.display = 'block';
  el.style.background = type === 'success' ? 'rgba(37,211,102,0.1)' : 'rgba(220,50,50,0.1)';
  el.style.border = type === 'success' ? '1px solid rgba(37,211,102,0.3)' : '1px solid rgba(220,50,50,0.3)';
  el.style.color = type === 'success' ? '#4ade80' : '#f87171';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

// ── SMOOTH SCROLL PARA LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CARD 3D TILT: mouse-follow perspective
(function() {
  var cards = document.querySelectorAll('.card-elite');
  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = (e.clientX - cx) / (rect.width  / 2); // -1 a +1
      var dy = (e.clientY - cy) / (rect.height / 2); // -1 a +1
      var rx = dy * -4;   // rotação X (tilt vertical)
      var ry = dx *  5;   // rotação Y (tilt horizontal)
      card.style.transform =
        'translateY(-6px) perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      card.style.boxShadow =
        (dx * 8) + 'px ' + (dy * 8 + 20) + 'px 48px rgba(1,4,11,0.65), 0 0 0 1px rgba(88,117,133,0.15)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
})();

// ══════════════════════════════════════════════════════════════
// CARROSSEL DE TRANSFORMAÇÕES — drag, touch, setas, dots, teclado
// ══════════════════════════════════════════════════════════════
(function() {
  var track    = document.getElementById('transfTrack');
  var viewport = document.getElementById('transfViewport');
  var dotsWrap = document.getElementById('transfDots');
  var btnPrev  = document.getElementById('transfPrev');
  var btnNext  = document.getElementById('transfNext');
  if (!track || !viewport) return;

  // ── 1. Clonar primeiro e último card para criar o loop infinito ───────────
  // Estrutura: [clone-último] [card0] [card1] [card2] [card3] [clone-primeiro]
  // O usuário sempre vê o intervalo [1..N], os clones são o "truque"
  var originals = Array.from(track.querySelectorAll('.transf-card'));
  var total     = originals.length;

  var cloneFirst = originals[0].cloneNode(true);
  var cloneLast  = originals[total - 1].cloneNode(true);
  cloneFirst.setAttribute('aria-hidden', 'true');
  cloneLast.setAttribute('aria-hidden', 'true');

  track.appendChild(cloneFirst);           // clone do 1º no final
  track.insertBefore(cloneLast, originals[0]); // clone do último no início

  // Todos os cards (incluindo clones) — ordem: [cloneLast, 0,1,2,3, cloneFirst]
  var allCards = Array.from(track.querySelectorAll('.transf-card'));
  // current aponta para o índice em allCards — começa em 1 (primeiro original)
  var current  = 1;
  var isJumping = false;

  // ── 2. Criar dots (só para os originais) ─────────────────────────────────
  dotsWrap.innerHTML = '';
  var dots = originals.map(function(_, i) {
    var d = document.createElement('button');
    d.className = 'transf-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.onclick = function() { goTo(i + 1); }; // +1 por causa do clone no início
    dotsWrap.appendChild(d);
    return d;
  });

  // ── 3. Posicionar e aplicar estado visual ─────────────────────────────────
  function getOffset(idx) {
    var card = allCards[idx];
    if (!card) return 0;
    var cardLeft = card.offsetLeft;
    var cardW    = card.offsetWidth;
    var viewW    = viewport.offsetWidth;
    return cardLeft - (viewW - cardW) / 2;
  }

  function updateVisual(withTransition) {
    // Ativar/desativar cards
    allCards.forEach(function(card, i) {
      card.classList.toggle('active', i === current);
    });

    // Dots — índice real = current - 1 (descontar o clone inicial)
    var dotIdx = current - 1;
    if (dotIdx < 0)      dotIdx = total - 1;
    if (dotIdx >= total) dotIdx = 0;
    dots.forEach(function(d, i) { d.classList.toggle('active', i === dotIdx); });

    // Setas nunca desativam (loop infinito)
    if (btnPrev) btnPrev.disabled = false;
    if (btnNext) btnNext.disabled = false;
  }

  function setPos(idx, animated) {
    track.style.transition = animated
      ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
    track.style.transform  = 'translateX(' + (-getOffset(idx)) + 'px)';
  }

  function goTo(idx, animated) {
    if (animated === undefined) animated = true;
    current = idx;
    setPos(current, animated);
    updateVisual();
  }

  // ── 4. Jump silencioso ao atingir clone ──────────────────────────────────
  // Quando a transição termina e estamos num clone, saltar para o original sem animação
  track.addEventListener('transitionend', function(e) {
    if (e.target !== track || e.propertyName !== 'transform') return;
    if (isJumping) return;
    if (current === 0) {
      isJumping = true;
      goTo(total, false);
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { isJumping = false; });
      });
    } else if (current === allCards.length - 1) {
      isJumping = true;
      goTo(1, false);
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { isJumping = false; });
      });
    }
  });

  // ── 5. Drag / swipe ──────────────────────────────────────────────────────
  var startX = 0, isDragging = false, startOffset = 0;
  var isAnimating = false;

  // Trava contra cliques rápidos durante a transição
  track.addEventListener('transitionstart', function(e) {
    if (e.target === track && e.propertyName === 'transform') isAnimating = true;
  });
  track.addEventListener('transitionend', function(e) {
    if (e.target === track && e.propertyName === 'transform') isAnimating = false;
  }, true); // capture para garantir antes do handler do loop

  function dragStart(x) {
    startX      = x;
    isDragging  = true;
    startOffset = getOffset(current);
    track.classList.add('dragging');
    track.style.transition = 'none';
  }
  function dragMove(x) {
    if (!isDragging) return;
    var delta = x - startX;
    track.style.transform = 'translateX(' + (-(startOffset - delta)) + 'px)';
  }
  function dragEnd(x) {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    var delta = x - startX;
    if      (delta < -50) goTo(current + 1);
    else if (delta >  50) goTo(current - 1);
    else                  goTo(current);
  }

  track.addEventListener('mousedown',  function(e) { dragStart(e.clientX); });
  window.addEventListener('mousemove', function(e) { if (isDragging) dragMove(e.clientX); });
  window.addEventListener('mouseup',   function(e) { dragEnd(e.clientX); });
  track.addEventListener('touchstart', function(e) { dragStart(e.touches[0].clientX); }, { passive: true });
  track.addEventListener('touchmove',  function(e) { dragMove(e.touches[0].clientX); },  { passive: true });
  track.addEventListener('touchend',   function(e) { dragEnd(e.changedTouches[0].clientX); });

  // ── 6. Resize ────────────────────────────────────────────────────────────
  window.addEventListener('resize', function() { goTo(current, false); });

  // ── 7. API global ────────────────────────────────────────────────────────
  window.transfSlide = function(dir) {
    if (isAnimating || isJumping) return;
    goTo(current + dir);
  };

  // ── 8. Init ──────────────────────────────────────────────────────────────
  requestAnimationFrame(function() { goTo(1, false); });
})();


// ── COUNTUP: dispara APÓS a animação de entrada dos stats completar
(function() {
  var statsEls = document.querySelectorAll('.hero-stat-num[data-target]');
  if (!statsEls.length) return;

  var fired = false;

  // ── Curva de easing: desacelera ao chegar no final
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // ── Anima um elemento de 0 até o target
  function animateCount(el, delay) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    // Duração proporcional ao valor: números maiores sobem mais devagar
    var duration = target >= 100 ? 2200 : target >= 10 ? 1600 : 1000;
    var start    = null;

    setTimeout(function() {
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased    = easeOutExpo(progress);
        var current  = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix; // garantir valor exato no fim
        }
      }
      requestAnimationFrame(step);
    }, delay);
  }

  // ── Dispara todos os contadores com stagger
  function fireCounters() {
    if (fired) return;
    fired = true;
    statsEls.forEach(function(el, i) {
      animateCount(el, i * 280); // 280ms de stagger entre cada número
    });
  }

  // ── Estratégia de trigger: aguarda a animação do hero terminar
  // A transição CSS dos stats dura 600ms + delay 750ms = ~1350ms após hero-animated
  // Usamos MutationObserver para detectar quando hero-animated é adicionado
  var heroContent = document.getElementById('heroContent');
  if (heroContent) {
    var mutObs = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (heroContent.classList.contains('hero-animated')) {
            mutObs.disconnect();
            // Aguarda a transição dos stats completar: delay(750ms) + transition(600ms) + margem(100ms)
            setTimeout(fireCounters, 1450);
          }
        }
      });
    });
    mutObs.observe(heroContent, { attributes: true });
  }

  // ── Fallback: se hero-animated já foi adicionado antes do script rodar
  if (heroContent && heroContent.classList.contains('hero-animated')) {
    setTimeout(fireCounters, 800);
  }

  // ── Fallback final: dispara de qualquer forma após 3s
  setTimeout(function() {
    if (!fired) fireCounters();
  }, 3000);
})();


// ── SIMULADOR PAC — InfinitePay
(function() {
  // Simulador usando INFINITEPAY_APPROVED_DATA as source of truth
  if (typeof INFINITEPAY_APPROVED_DATA === 'undefined') {
    console.error('Dados comerciais da InfinitePay não foram carregados.');
    return;
  }
  var DATA = INFINITEPAY_APPROVED_DATA;

  var OPTION_KEYS = {
    lite: ['mensal','trimestral','semestral','anual'],
    vip:  ['mensal','trimestral','semestral','anual'],
    consulta: ['retorno','online','presencial']
  };

  var SIM = { lite:{mod:0,mode:'pix',parc:1}, vip:{mod:0,mode:'pix',parc:1}, consulta:{mod:2,mode:'pix',parc:1} };
  var PERIOD = { lite:0, vip:0, consulta:2 };

  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  function formatCurrency(value) { return currencyFormatter.format(value); }

  function getPlanKey(id) { return id === 'consulta' ? 'consultas' : id; }
  function getOptionKey(id, idx) { return OPTION_KEYS[id] && OPTION_KEYS[id][idx]; }

  function render(id) {
    var s = SIM[id];
    var planKey = getPlanKey(id);
    var optionKey = getOptionKey(id, s.mod);
    var el = document.getElementById('pac-result-' + id);
    if (!el) return;

    var plan = DATA.plans && DATA.plans[planKey];
    var option = plan && plan.options && optionKey ? plan.options[optionKey] : null;
    var base = option && typeof option.base === 'number' ? option.base : 0;
    var lbl = option && option.label ? option.label : '';

    if (s.mode === 'pix') {
      el.innerHTML =
        '<div class="pac-result-tag">PIX · TAXA 0% · ' + lbl + '</div>' +
        '<div class="pac-result-val">' + formatCurrency(base) + '</div>' +
        '<div class="pac-result-sub">Valor cobrado do cliente, sem acréscimo.</div>';
      return;
    }

    // Crédito: use dados tabelados diretamente
    var p = s.parc;
    var credit = option && option.credit && option.credit[p] ? option.credit[p] : null;
    if (!credit) {
      el.innerHTML = '<div class="pac-result-tag">Crédito</div><div class="pac-result-val">-</div>';
      return;
    }

    el.innerHTML =
      '<div class="pac-result-tag">CRÉDITO EM ' + p + 'X · TAXA INCLUÍDA</div>' +
      '<div class="pac-result-val">' + p + 'x de ' + formatCurrency(credit.installment) + '</div>' +
      '<div class="pac-result-sub" style="display:flex;flex-direction:column;margin-top:6px">' +
        '<span>Total no cartão: ' + formatCurrency(credit.total) + '</span>' +
        '<span>Valor-base do plano: ' + formatCurrency(base) + '</span>' +
      '</div>';
  }

  function updateCardPrice(id, idx, cardOrElement) {
    var card = cardOrElement && cardOrElement.closest ? (cardOrElement.closest('.plans-alt-card') || cardOrElement) : cardOrElement;
    if (!card) return;
    var priceEl = card.querySelector('.pac-amount');
    var periodEl = card.querySelector('.pac-period');
    if (!priceEl || !periodEl) return;

    var planKey = getPlanKey(id);
    var optionKey = getOptionKey(id, idx);
    var option = DATA.plans && DATA.plans[planKey] && DATA.plans[planKey].options && DATA.plans[planKey].options[optionKey];
    if (!option) return;
    var base = option.base;
    var parts = base.toFixed(2).split('.');
    priceEl.textContent = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    var suffix = '';
    if (id !== 'consulta') {
      if (idx === 0) suffix = '/mês';
      else if (idx === 1) suffix = '/3 meses';
      else if (idx === 2) suffix = '/6 meses';
      else suffix = '/ano';
    }
    periodEl.textContent = ',' + parts[1] + suffix;
  }

  function syncCardPeriodRows(card, idx) {
    if (!card) return;
    card.querySelectorAll('.pac-period-row').forEach(function(row, index) {
      var active = index === idx;
      row.classList.toggle('active', active);
      row.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function syncSimButtons(id, idx) {
    var simSection = document.getElementById('sim-mods-' + id);
    if (!simSection) return;
    simSection.querySelectorAll('.pac-sim-mod-btn').forEach(function(b, index) {
      b.classList.toggle('active', index === idx);
    });
  }

  window.simSetMod = function(id, idx, btn) {
    PERIOD[id] = idx;
    SIM[id].mod = idx;
    syncSimButtons(id, idx);
    var card = btn.closest('.plans-alt-card');
    if (card) {
      syncCardPeriodRows(card, idx);
      updateCardPrice(id, idx, card);
    }
    render(id);
    // table feature removed
  };

  window.pacSetMod = function(id, idx, btn) {
    PERIOD[id] = idx;
    SIM[id].mod = idx;
    var card = btn.closest('.plans-alt-card');
    if (card) {
      syncCardPeriodRows(card, idx);
      updateCardPrice(id, idx, card);
      syncSimButtons(id, idx);
    }
    render(id);
    // table feature removed
    // update consultation CTA messaging if relevant
    if (id === 'consulta') updateConsultaCTA();
  };

  window.pacSetMode = function(id, mode, btn) {
    // only 'pix' or 'credito' supported
    SIM[id].mode = mode === 'credito' ? 'credito' : 'pix';
    btn.closest('.pac-toggle').querySelectorAll('.pac-mode-btn')
      .forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var pg = document.getElementById('pac-parc-' + id);
    if (pg) pg.style.display = SIM[id].mode === 'credito' ? 'block' : 'none';
    if (SIM[id].mode === 'credito') {
      SIM[id].parc = 1;
      document.querySelectorAll('#pac-parc-' + id + ' .pac-parc-btn')
        .forEach(function(b,i){ b.classList.toggle('active', i===0); });
    }
    render(id);
  };

  window.pacSetParc = function(id, parc, btn) {
    SIM[id].parc = parc;
    btn.closest('.pac-parc-grid').querySelectorAll('.pac-parc-btn')
      .forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    render(id);
  };

  // Table feature removed: buildTable/toggleTable removed to keep UI minimal.

  function updateConsultaCTA() {
    // Update consultation CTA text and href according to selected option
    var idx = PERIOD['consulta'];
    var optionKey = getOptionKey('consulta', idx);
    var plan = DATA.plans && DATA.plans['consultas'];
    var option = plan && plan.options && plan.options[optionKey];
    var cta = document.getElementById('pac-cta-consulta');
    if (!cta || !option) return;
    var desc = option.description || option.label || '';
    var text = encodeURIComponent('Olá Elias! Tenho interesse na ' + desc + '.');
    cta.href = 'https://wa.me/5585996639595?text=' + text;
    var label = optionKey === 'retorno' ? 'AGENDAR RETORNO →' : 'AGENDAR CONSULTA ' + (option.label ? option.label.toUpperCase() : '→');
    cta.textContent = label;
  }

  document.addEventListener('DOMContentLoaded', function() {
    ['lite','vip','consulta'].forEach(function(id) {
      var simSection = document.getElementById('sim-mods-' + id);
      if (simSection) {
        var card = simSection.closest('.plans-alt-card');
        if (card) {
          syncCardPeriodRows(card, PERIOD[id]);
          updateCardPrice(id, PERIOD[id], card);
          syncSimButtons(id, PERIOD[id]);
        }
      }
      render(id);
    });
    updateConsultaCTA();
  });
})();

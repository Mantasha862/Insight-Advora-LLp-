/* <ia-emblem> — Insight Advora dimensional IA watermark.
   Uses the supplied monogram (assets/monogram-alpha.png) purely as an alpha mask, so the
   logo shape is never redrawn. Finish: deep forest-green brushed metal, a thin antique-gold
   rim on the light-facing edges (mask-composite: shape offset minus shape), a darker rim on
   the shadow side, soft cast shadow, an occasional slow light sweep, and a reflection that
   follows the cursor. Respects prefers-reduced-motion.
   Attributes: variant = hero | light | dark (default light); src; parallax (px, 0 = off). */
(function () {
  if (customElements.get('ia-emblem')) return;
  const V = {
    hero:  { body: 0.34, lift: 1, sat: 1.05, rim: 0.9, shade: 0.5, cast: 0.2, glow: 0.14, sheen: 0.5 },
    light: { body: 0.17, lift: 1, sat: 1, rim: 0.65, shade: 0.3, cast: 0.1, glow: 0.08, sheen: 0.4 },
    dark:  { body: 0.34, lift: 1.9, sat: 0.95, rim: 0.85, shade: 0.55, cast: 0.3, glow: 0.16, sheen: 0.45 }
  };
  class IAEmblem extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      const name = this.getAttribute('variant') || 'light';
      const v = V[name] || V.light;
      const src = this.getAttribute('src') || 'assets/monogram-alpha.png';
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.setAttribute('aria-hidden', 'true');
      const u = 'url("' + src + '")';
      const root = this.attachShadow({ mode: 'open' });
      const maskOne = '-webkit-mask:' + u + ' center/contain no-repeat;mask:' + u + ' center/contain no-repeat;';
      const rimMask = (dir) =>
        '-webkit-mask-image:' + u + ',' + u + ';mask-image:' + u + ',' + u + ';' +
        '-webkit-mask-size:contain,contain;mask-size:contain,contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;' +
        '-webkit-mask-position:calc(50% ' + dir + ' var(--o)) calc(50% ' + dir + ' var(--o)),center;mask-position:calc(50% ' + dir + ' var(--o)) calc(50% ' + dir + ' var(--o)),center;' +
        '-webkit-mask-composite:source-out;mask-composite:subtract;';
      root.innerHTML = '<style>' +
        ':host{display:block;aspect-ratio:670/568;pointer-events:none;user-select:none;--o:2px;--lx:32%;--ly:20%;--la:146deg}' +
        '.p{position:absolute;inset:0;transition:transform 1400ms cubic-bezier(.2,.7,.2,1);will-change:transform;animation:in 2400ms cubic-bezier(.2,.7,.2,1) both}' +
        '.l{position:absolute;inset:0}' +
        '.cast{' + maskOne + 'background:rgba(8,22,18,1);opacity:' + v.cast + ';transform:translate(0,2.2%);filter:blur(14px)}' +
        '.body{opacity:' + v.body + ';animation:breathe 10s ease-in-out 2.4s infinite}' +
        '.art{background:' + u + ' center/contain no-repeat;filter:brightness(' + v.lift + ') saturate(' + v.sat + ') contrast(1.08)}' +
        '.metal{' + maskOne + 'background:repeating-linear-gradient(94deg, rgba(255,255,255,.05) 0 1px, rgba(0,0,0,0) 1px 3px),linear-gradient(146deg, rgba(255,255,255,.22) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,.18) 52%, rgba(255,255,255,.12) 70%, rgba(0,0,0,.22) 100%);mix-blend-mode:soft-light}' +
        '.refl{' + maskOne + 'background:radial-gradient(70% 55% at var(--lx) var(--ly), rgba(236,222,190,.34), rgba(236,222,190,0) 60%);transition:background-position 600ms ease}' +
        '.sheen{' + maskOne + 'background:linear-gradient(112deg, rgba(255,244,214,0) 42%, rgba(255,244,214,' + v.sheen + ') 49.5%, rgba(212,180,120,' + (v.sheen * 0.6) + ') 51.5%, rgba(212,180,120,0) 57%);background-size:300% 100%;background-repeat:no-repeat;background-position:175% 0;mix-blend-mode:screen;animation:sweep 9s cubic-bezier(.45,.05,.35,1) 3s infinite}' +
        '.rim{' + rimMask('-') + 'background:linear-gradient(var(--la), rgba(232,206,150,1) 0%, rgba(216,184,120,.9) 24%, rgba(184,152,88,.22) 54%, rgba(184,152,88,0) 70%, rgba(168,136,72,.4) 100%);opacity:' + v.rim + '}' +
        '.shade{' + rimMask('+') + 'background:rgba(16,26,18,1);opacity:' + v.shade + '}' +
        '.glow{' + maskOne + 'background:rgba(184,152,88,1);filter:blur(28px);opacity:0;animation:glow 10s ease-in-out 2.4s infinite}' +
        '@keyframes in{from{opacity:0;transform:scale(.965)}to{opacity:1;transform:none}}' +
        '@keyframes breathe{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}' +
        '@keyframes glow{0%,100%{opacity:0}50%{opacity:' + v.glow + '}}' +
        '@keyframes sweep{0%{background-position:175% 0}46%,100%{background-position:-75% 0}}' +
        '@media (prefers-reduced-motion: reduce){.p,.body,.sheen,.glow{animation:none}.sheen,.glow{display:none}.p{transition:none}}' +
        '</style><div class="p">' +
        '<div class="l glow"></div><div class="l cast"></div>' +
        '<div class="l body"><div class="l art"></div><div class="l metal"></div><div class="l refl"></div><div class="l sheen"></div></div>' +
        '<div class="l shade"></div><div class="l rim"></div>' +
        '</div>';
      const setRim = () => { const w = this.getBoundingClientRect().width || 400; this.style.setProperty('--o', Math.max(1.4, Math.min(3.2, w * 0.0036)).toFixed(2) + 'px'); };
      setRim();
      if (window.ResizeObserver) { this._ro = new ResizeObserver(setRim); this._ro.observe(this); }
      const travel = this.hasAttribute('parallax') ? +this.getAttribute('parallax') : (name === 'hero' ? 16 : 8);
      if (reduce || window.innerWidth < 760) return;
      const p = root.querySelector('.p');
      let raf = 0, mx = 0, my = 0;
      this._move = (e) => {
        mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (travel) p.style.transform = 'translate3d(' + (mx * travel).toFixed(1) + 'px,' + (my * travel * 0.7).toFixed(1) + 'px,0)';
          this.style.setProperty('--lx', (32 + mx * 36).toFixed(1) + '%');
          this.style.setProperty('--ly', (20 + my * 30).toFixed(1) + '%');
          this.style.setProperty('--la', (146 + mx * 30).toFixed(0) + 'deg');
        });
      };
      window.addEventListener('mousemove', this._move, { passive: true });
    }
    disconnectedCallback() {
      if (this._move) window.removeEventListener('mousemove', this._move);
      if (this._ro) this._ro.disconnect();
    }
  }
  customElements.define('ia-emblem', IAEmblem);
})();

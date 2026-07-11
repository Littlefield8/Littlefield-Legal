// Shared nav + footer + floating CTA for Littlefield Legal.
// Add <div data-nav></div>, <div data-foot></div>, optional data-floating-cta.
(function () {
  function navHTML() {
    return `
      <nav class="nav">
        <div class="wrap nav-inner">
          <div class="nav-links left">
            <a href="index.html" data-page="index.html">Home</a>
            <a href="about.html" data-page="about.html">About</a>
            <div class="nav-dropdown">
              <a href="practice-areas.html" data-page="practice-areas.html">Criminal Defense</a>
              <div class="nav-dropdown-menu">
                <a href="practice/criminal-defense.html">All Charges We Handle<small>Overview &amp; how cases work</small></a>
                <a href="practice/criminal-defense/dui.html">DUI Defense<small>Utah County &amp; statewide</small></a>
                <a href="practice/criminal-defense/drug-possession.html">Drug Possession<small>Simple possession charges</small></a>
                <a href="practice/criminal-defense/drug-trafficking.html">Drug Distribution &amp; Trafficking<small>Intent to distribute</small></a>
                <a href="practice/criminal-defense/domestic-violence.html">Domestic Violence<small>Cohabitant abuse charges</small></a>
                <a href="practice/criminal-defense/assault.html">Assault<small>Simple &amp; aggravated</small></a>
                <a href="practice/criminal-defense/theft.html">Theft &amp; Shoplifting<small>Petty to felony theft</small></a>
                <a href="practice/criminal-defense/burglary.html">Burglary<small>Dwelling &amp; non-dwelling</small></a>
                <a href="practice/criminal-defense/traffic-offenses.html">Traffic Offenses<small>Reckless driving &amp; more</small></a>
                <a href="practice/criminal-defense/expungement.html">Expungement<small>Clean Slate &amp; record relief</small></a>
              </div>
            </div>
          </div>
          <a class="brand" href="index.html" aria-label="Littlefield Legal home">
            <span class="mark">L</span>
            <span class="firm">Littlefield&nbsp;Legal</span>
          </a>
          <div class="nav-links right">
            <div class="nav-dropdown">
              <a href="resources.html" data-page="resources.html">Resources</a>
              <div class="nav-dropdown-menu">
                <a href="resources.html">All Resources<small>Guides &amp; FAQs</small></a>
                <a href="resources/plea-in-abeyance.html">Plea in Abeyance<small>Utah-specific explainer</small></a>
              </div>
            </div>
            <a href="contact.html" data-page="contact.html">Contact</a>
            <a href="contact.html" class="btn btn-gold" style="padding:10px 20px; font-size:11px; white-space: nowrap;">Book Consultation</a>
          </div>
          <button class="nav-toggle" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
          </button>
        </div>
      </nav>
    `;
  }

  function footHTML() {
    return `
      <footer class="foot">
        <div class="wrap">
          <div class="foot-grid">
            <div>
              <div class="firm-mark">
                <span class="m">L</span>
                <span class="t">Littlefield <em>Legal</em></span>
              </div>
              <p class="blurb">A boutique Utah County criminal defense practice — handled directly by attorney Dallin Littlefield, a former prosecutor.</p>
            </div>
            <div>
              <h5>Practice</h5>
              <ul>
                <li><a href="practice/criminal-defense.html">All Charges</a></li>
                <li><a href="practice/criminal-defense/dui.html">DUI Defense</a></li>
                <li><a href="practice/criminal-defense/drug-possession.html">Drug Possession</a></li>
                <li><a href="practice/criminal-defense/domestic-violence.html">Domestic Violence</a></li>
                <li><a href="practice/criminal-defense/assault.html">Assault</a></li>
                <li><a href="practice/criminal-defense/theft.html">Theft &amp; Property Crimes</a></li>
                <li><a href="practice/criminal-defense/expungement.html">Expungement</a></li>
              </ul>
            </div>
            <div>
              <h5>Firm</h5>
              <ul>
                <li><a href="about.html">About Dallin</a></li>
                <li><a href="practice-areas.html">Areas of Practice</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="tel:14352946806">(435) 294-6806</a></li>
                <li><a href="mailto:assistant@littlefieldlegal.com">Assistant@LittlefieldLegal.com</a></li>
                <li>Pleasant Grove, UT<br/>Serving Utah County &amp; beyond</li>
              </ul>
            </div>
          </div>
          <div class="foot-bottom">
            <div>© <span data-year></span> Littlefield Legal, LLC · All rights reserved</div>
            <div class="links">
              <a href="terms-of-service.html">Terms of Service</a>
              <a href="privacy-policy.html">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function floatingCTAHTML() {
    return `<a class="floating-cta" href="contact.html">Consultation Call<br/>with an Attorney</a>`;
  }

  function adjustForDepth(html, depth) {
    if (!depth) return html;
    const prefix = '../'.repeat(depth);
    return html.replace(/href="(?!https?:|mailto:|tel:|#)([^"]+)"/g, (m, p) => `href="${prefix}${p}"`);
  }

  function depthFromBody() {
    const d = document.body.getAttribute('data-depth');
    return d ? parseInt(d, 10) : 0;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const depth = depthFromBody();
    const navHost = document.querySelector('[data-nav]');
    const footHost = document.querySelector('[data-foot]');
    const ctaHost = document.querySelector('[data-floating-cta]');

    if (navHost) navHost.innerHTML = adjustForDepth(navHTML(), depth);
    if (footHost) footHost.innerHTML = adjustForDepth(footHTML(), depth);
    if (ctaHost) ctaHost.innerHTML = adjustForDepth(floatingCTAHTML(), depth);

    document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());

    // Active link highlight
    let path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[data-page]').forEach((a) => {
      if (a.getAttribute('data-page') === path) a.classList.add('active');
    });
    // Also catch practice/* sub-pages
    if (path.startsWith('criminal') || path === 'dui.html' || path.startsWith('drug-') || path.startsWith('domestic-') || path.startsWith('assault') || path.startsWith('theft') || path.startsWith('burglary') || path.startsWith('traffic-') || path.startsWith('expungement')) {
      const m = document.querySelector('.nav-links a[data-page="practice-areas.html"]');
      if (m) m.classList.add('active');
    }
    if (path.startsWith('plea')) {
      const m = document.querySelector('.nav-links a[data-page="resources.html"]');
      if (m) m.classList.add('active');
    }

    // Mobile toggle
    const nav = document.querySelector('.nav');
    const tg = document.querySelector('.nav-toggle');
    if (tg && nav) tg.addEventListener('click', () => nav.classList.toggle('nav-mobile-open'));
  });
})();

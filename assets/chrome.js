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
              <a href="practice-areas.html" data-page="practice-areas.html">Areas of Practice</a>
              <div class="nav-dropdown-menu">
                <a href="practice-areas.html">All Areas<small>Overview of services</small></a>
                <a href="practice/criminal-defense.html">Criminal Defense<small>DUI, drugs, assault, theft, traffic</small></a>
                <a href="practice/contracts.html">Contracts<small>Drafting, review, interpretation</small></a>
                <a href="practice/wills-trusts-estate.html">Wills, Trusts &amp; Estate<small>Estate planning &amp; trust creation</small></a>
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
              <p class="blurb">A boutique Utah law practice. Criminal defense, contracts, and wills &amp; estate planning — handled directly by attorney Dallin Littlefield.</p>
            </div>
            <div>
              <h5>Practice</h5>
              <ul>
                <li><a href="practice/criminal-defense.html">Criminal Defense</a></li>
                <li><a href="practice/contracts.html">Contracts</a></li>
                <li><a href="practice/wills-trusts-estate.html">Wills, Trusts &amp; Estate</a></li>
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
                <li>Saratoga Springs, UT<br/>Serving all of Utah</li>
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
    // Also catch practice/* and resources/* sub-pages
    if (path.startsWith('criminal') || path.startsWith('contracts') || path.startsWith('wills')) {
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

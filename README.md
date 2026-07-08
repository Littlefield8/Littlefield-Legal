# Littlefield Legal — littlefieldlegal.com

Static website for Littlefield Legal, LLC (attorney Dallin C. Littlefield).
Boutique Utah law practice: criminal defense, contracts, and wills/trusts/estate planning.

Built as plain HTML/CSS/JS (no build step) and hosted on **GitHub Pages** with the
custom domain **littlefieldlegal.com** (registered/DNS at Squarespace).

## Structure

```
index.html               Home
about.html               Attorney bio
practice-areas.html      Areas of Practice overview
practice/
  criminal-defense.html
  contracts.html
  wills-trusts-estate.html
resources.html           Resources hub
resources/
  plea-in-abeyance.html  Utah plea-in-abeyance explainer
contact.html             Contact form
privacy-policy.html
terms-of-service.html
assets/
  styles.css             All styling (CSS variables; "classic" theme is default)
  chrome.js              Injects shared nav, footer, and floating CTA into every page
  site.js                Sets the default visual theme
  dallin.jpg             Attorney headshot
CNAME                    Custom domain for GitHub Pages (littlefieldlegal.com)
.nojekyll                Tells GitHub Pages to serve files as-is (no Jekyll)
```

The shared nav/footer/floating-CTA are injected by `assets/chrome.js` into the
`<div data-nav>`, `<div data-foot>`, and `<div data-floating-cta>` placeholders on
each page. Sub-pages (in `practice/` and `resources/`) set `data-depth="1"` on `<body>`
so chrome.js rewrites relative links correctly.

## Editing content

Just edit the HTML files directly and commit. No build or install step.
Preview locally by opening `index.html` in a browser, or run a local server:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Contact form — needs a backend

The contact form on `contact.html` currently **simulates** success — it does not
deliver messages anywhere, because GitHub Pages is static (no server). To make it
work, wire it to a form backend (e.g. Formspree, free). See the `TODO` comment near
the bottom of `contact.html` for step-by-step instructions.

## Deploying

GitHub Pages is configured to deploy from the `main` branch. Push to `main` and the
site rebuilds automatically. The custom domain is set via the `CNAME` file plus DNS
records at Squarespace (A records to GitHub's IPs + a `www` CNAME).

# Deployment & DNS — littlefieldlegal.com

This site is a static HTML/CSS/JS site hosted on **GitHub Pages** at the custom
domain **littlefieldlegal.com**. The domain is registered at **Squarespace**
(nameservers operated by Squarespace via Google Domains infrastructure).

## How publishing works

- Source lives in this repo: `dal-field/littlefieldlegal.com`, branch `main`.
- GitHub Pages is configured to build from `main` / root (`/`).
- **Any push to `main` automatically rebuilds and redeploys the live site** —
  usually live within a minute. No build step, no CI to configure.
- The `CNAME` file in the repo tells GitHub the custom domain. Don't delete it.
- `.nojekyll` tells Pages to serve files as-is (skip Jekyll processing).

```
# typical update flow
git add -A
git commit -m "Update copy on about page"
git push            # site redeploys automatically
```

## DNS configuration (at Squarespace)

The apex domain points at GitHub Pages' four IPv4 addresses; `www` is a CNAME to
the GitHub Pages host. These were changed FROM the old Tailor Brands/Squarespace
hosting values.

| Host  | Type  | Value                  |
|-------|-------|------------------------|
| `@`   | A     | `185.199.108.153`      |
| `@`   | A     | `185.199.109.153`      |
| `@`   | A     | `185.199.110.153`      |
| `@`   | A     | `185.199.111.153`      |
| `www` | CNAME | `dal-field.github.io`  |

Optional IPv6 (AAAA on `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

> Leave nameservers and any MX/email (mail) records untouched.

## HTTPS

In **repo → Settings → Pages**, the custom domain shows "DNS check successful"
and **Enforce HTTPS** is enabled. GitHub auto-issues and renews a free Let's
Encrypt certificate.

## Verifying the live site

```
curl -sI https://littlefieldlegal.com/        # expect: HTTP 200, server: GitHub.com
```

## Rolling back

Because every deploy is a git commit, you can revert to any previous version:

```
git revert <commit-sha>   # safe: makes a new commit undoing the change
git push
```

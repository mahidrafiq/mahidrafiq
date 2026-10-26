# Mahid Rafiq Portfolio — v10

A static, data-driven portfolio with no build step and no runtime framework dependency.

## Structure

```text
index.html        page shell, SEO metadata, navigation and resilience fallback
css/style.css     themes, responsive layout, motion and accessibility styles
js/data.js        portfolio content and project data
js/app.js         components, router, charts, demos and shell interactions
assets/           portrait + brand assets, favicons and social preview
robots.txt        crawler directives
sitemap.xml       public-site sitemap
```

## Content model

Most portfolio content lives in `js/data.js`.

- **Projects:** add to `projects`
- **Skills / interests:** add to `skills`
- **Education / experience / achievements:** add to `timeline`
- **Certifications / publications:** add timeline entries with the corresponding `kind`
- **Public CV:** set `profile.cv` to a public PDF path
- **Email:** set `profile.email` only if you want it publicly displayed
- **Newsletter:** enable it only after adding a real endpoint

## Routes

Hash routes are used so the site works on GitHub Pages without server-side rewrites:

- `#top` / home
- `#work`
- `#lab`
- `#github`
- `#skills`
- `#about`
- `#journey`
- `#milestones`
- `#focus`
- `#brand`
- `#contact`
- `#project-<id>`

## Hardening included in v10

- Added canonical URL, robots directives and richer Open Graph / Twitter metadata.
- Added JSON-LD `Person` + `WebSite` structured data.
- Added Google Fonts preconnect hints.
- Added a no-JavaScript fallback with direct LinkedIn / GitHub access.
- Skip link now moves focus to `<main>` in JavaScript without changing the URL hash, so it no longer sends About/Brand visitors back to the home page.
- Improved command-palette accessibility state (`aria-controls` / `aria-expanded`).
- Improved mobile menu accessibility by changing its label between Open/Close.
- Added a real clipboard fallback for browsers/contexts where `navigator.clipboard` is unavailable.
- Added forced-colors accessibility safeguards.
- Refreshed this README to document the current v10 structure.

## Publish

For GitHub Pages, deploy the contents of this folder from the repository root.

Recommended repository:

`mahidrafiq/mahidrafiq` (project Pages site)

The canonical public URL used by the SEO metadata is:

`https://mahidrafiq.github.io/mahidrafiq/`
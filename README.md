# Abdullah Baleid — Portfolio

Personal website of Abdullah Baleid, a Software Engineering student at KFUPM working on applied AI: a database-connected AI assistant for a construction-management SaaS platform, research on hallucinations in vision-language models, and product prototypes.

**Live:** [abdullah-baleid-portfolio.vercel.app](https://abdullah-baleid-portfolio.vercel.app/)

## What's on the site

| Section | Content |
|---|---|
| Hero | Introduction, current roles, CV download, socials |
| About | Bio, toolkit, headline numbers |
| Tabby Imagine 2026 | 8th of 275 (finalist): Tabby Jameiyah, Tabby Together and Payday Sync, each linked to its live prototype |
| Selected work | ReqFlow (live and source), *Pixels or Prior?* research, industry RAG systems, Glasgow research code, course projects; filterable |
| Experience | Professional, research, leadership and education |
| Recognition | Awards, fellowships and a certificate gallery (click to view) |
| GitHub | Curated repositories with live metadata from the GitHub API, plus an offline fallback |
| Contact | Email (with copy button), LinkedIn, GitHub, CV |

## Tech

Plain, dependency-free static site:

- **HTML:** semantic markup; all content is in the page, so it reads fine without JavaScript and is crawlable.
- **CSS:** design tokens via custom properties, light and dark themes (follows the OS until the visitor picks), fluid type with `clamp()`, and `prefers-reduced-motion` support.
- **JavaScript:** about 500 lines of vanilla JS covering the theme toggle, mobile menu, scrollspy, reveal-on-scroll, the animation pause control, project filters, GitHub fetch with caching, the certificate `<dialog>` viewer and copy-to-clipboard. Each module boots in isolation, and an inline failsafe un-hides content if the script never runs.
- **Fonts:** Geist, Geist Mono and Instrument Serif (Latin subsets) plus an Arabic display font, all self-hosted as WOFF2.

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Structure

```
index.html            page content
404.html              not-found page
css/styles.css        design system + layout
js/script.js          progressive enhancements
assets/
  cv/                 Abdullah_Baleid_CV.pdf  ← replace this file to update the CV everywhere
  fonts/              self-hosted WOFF2 fonts
  images/             portraits (+ responsive WebP), original certificate scans
  images/certs/       optimized certificate images (thumbs/ for the grid)
  images/logos/       organization logos
  images/projects/    project screenshots (Tabby prototypes, ReqFlow)
  favicon.svg, og.jpg social preview
vercel.json           cache headers + redirect for the old CV URL
.vercelignore         keeps coursework and source originals off the live site
```

## Updating content

- **CV:** overwrite `assets/cv/Abdullah_Baleid_CV.pdf`. Every "CV" link points to it. Copy the exported PDF directly, without opening and re-saving it through a text tool; `.gitattributes` marks PDFs as binary so git won't alter it.
- **Certificates:** put the original scan in `assets/images/`, generate a WebP copy in `assets/images/certs/` and a 640 px thumbnail in `assets/images/certs/thumbs/`, then add a `.cert` button in `index.html`.
- **Projects and experience:** edit the matching block in `index.html`. Each card is self-contained.
- **GitHub section:** edit the `FEATURED` list in `js/script.js` to choose which repositories appear.

## History

Originally built as the final project for SWE363 Web Engineering at KFUPM (Assignment 4). It was redesigned in November 2026 as a professional portfolio. The course documents remain in `docs/`, `presentation/` and the `portfolio assignment-*.md` files.

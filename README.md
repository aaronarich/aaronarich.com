# Aaron A. Rich

Personal website of Aaron A. Rich, a Front-End Developer based in Atlanta, GA.

Hosted on [Cloudflare Pages](https://pages.cloudflare.com/) at [aaronarich.com](https://aaronarich.com).

## Tech Stack

*   **Static Site Generator:** [Jekyll](https://jekyllrb.com/) 4
*   **Language:** Ruby 3.3 (see `.ruby-version`)
*   **CSS:** Sass (`_sass/v1/`) plus a purged subset of [Tachyons](https://tachyons.io)
*   **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) — security and caching headers live in `_headers`

## Local Development

### Prerequisites

*   Ruby (version in `.ruby-version`) and Bundler
*   Node.js — only needed for `scripts/purge-tachyons.sh` and image conversion

### Installation

```bash
bundle install
```

*If you hit permission errors installing gems system-wide:*

```bash
bundle config set path 'vendor/bundle'
bundle install
```

### Usage

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

### Building

```bash
bundle exec jekyll build
```

## Working with assets

### CSS

`_sass/v1/_tachyons.scss` contains only the Tachyons utility classes the site
actually uses (the full framework is ~140 KB; the subset is ~6 KB compiled).
If you start using a Tachyons class that isn't in the subset yet, regenerate it:

```bash
scripts/purge-tachyons.sh
```

### Images

Post/project images are served as WebP with a 600px variant for small
screens, via `{% include image.html %}`. Animated GIFs were replaced with
silent looping `<video>` elements via `{% include video.html %}`.
To add a new image, generate the variants (e.g. with `npx sharp-cli`):

```bash
npx -y sharp-cli -i new.jpg -o assets/dir/new.webp -f webp -q 80
npx -y sharp-cli -i new.jpg -o assets/dir/new-600.webp -f webp -q 75 resize 600
```

then reference it as
`{% include image.html src="/assets/dir/new" alt="..." width=1200 height=900 %}`.

## Deployment

The site is automatically deployed to Cloudflare Pages upon pushing to the
`main` branch. The build configuration is managed via `wrangler.toml`.

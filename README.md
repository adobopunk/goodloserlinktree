# Good Loser — Links

Static linktree page. No build step, no dependencies to install.

## Files
- `index.html` — page content and structure
- `css/style.css` — brand styling (loaded after Pico.css, which is pulled from CDN)
- `assets/logo.png` — provided logo
- `netlify.toml` — tells Netlify to publish the repo root with no build command

## Deploy via GitHub → Netlify

1. Push this folder to a new GitHub repo:
   ```
   git init
   git add .
   git commit -m "Initial linktree"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build settings: leave **build command** blank and **publish directory** as `.` (already set in `netlify.toml`, so Netlify should detect this automatically).
4. Deploy. Netlify will auto-redeploy on every push to `main`.

## Editing links later
Each link is a plain `<a class="link-btn">` in `index.html` — edit the `href` and the visible text directly, no build tooling required.

## Things worth checking before you ship this
- The page depends on two CDNs (jsDelivr for Pico.css, Google Fonts). If either goes down, the page still renders — just with browser-default fonts and unstyled base elements — but it's a dependency worth knowing about. If you want zero external dependencies, I can inline Pico.css and self-host the fonts instead.
- Social icons are simplified generic glyphs, not the platforms' actual logos/wordmarks — intentional, to avoid using trademarked brand marks on a third-party site.
- `https://www.goodloser.me` vs `https://goodloser.me` are used inconsistently across the links you gave me — kept exactly as provided, but if these don't both resolve/redirect to the same place on your host, some links may behave unexpectedly.

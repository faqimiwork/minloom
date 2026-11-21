# minloom.com

Landing page for MinLoom, the minimal screen recorder for Chrome. Built with Vite, React, Tailwind CSS v4 and Framer Motion.

## Run locally
npm install
npm run dev

## Deploy on Netlify (GitHub)
1. Push this folder to a new GitHub repo.
2. In Netlify: Add new site > Import from Git > pick the repo.
3. Netlify reads netlify.toml (build: npm run build, publish: dist). Click Deploy.
4. Domain settings > add minloom.com.

## Deploy without GitHub
Drag the prebuilt dist folder (minloom-site-dist.zip, unzipped) into Netlify Drop.
Note: with drag and drop, /privacy and /terms work as /privacy.html and /terms.html unless you also add a _redirects file.

## When the extension is live
Open src/components/Demo.tsx and set CHROME_STORE_URL to the Chrome Web Store link.
Every "Add to Chrome" button then points to the store, and the footer shows the install button instead of "Launching soon".

## Pages
- / landing page
- /privacy.html and /terms.html (static, in public/)

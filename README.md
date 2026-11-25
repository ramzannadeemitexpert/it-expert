# RN IT Expert – Portfolio Website

Portfolio of Ramzan Nadeem (Excel expert, IT specialist, data analyst).
Plain HTML, CSS and JavaScript. No build step, no installs.

## Folder structure

```
index.html          page structure
css/style.css       all styling (colors are at the top in :root)
js/data.js          YOUR CONTENT: Fiverr link, email, projects, services, skills
js/main.js          page behaviour (menu, filters, animations, contact form)
images/             logo.webp, about.webp
images/projects/    put your project screenshots here
```

## Edit your content (js/data.js)

- **Email for the contact form:** change `CONFIG.email`.
- **Fiverr link:** change `CONFIG.fiverr`. Every Fiverr button updates.
- **Add a project:** copy one line inside `PROJECTS` and change the text.
  - `img`: path to your screenshot, e.g. `"images/projects/dashboard.jpg"` (leave `""` for the placeholder)
  - `link`: page for the View Project button (leave `""` to open your Fiverr profile)
- **Skills:** change the numbers in `SKILLS` (0 to 100).

## Publish free on GitHub Pages

1. Create a new repository on GitHub (for example `rn-it-expert`).
2. Upload all files and folders from this project (keep the folder structure).
3. Go to **Settings → Pages**, choose branch `main` and folder `/ (root)`, then Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/rn-it-expert/`.

## Contact form

The form opens the visitor's email app addressed to `CONFIG.email`.
For delivery without an email app, create a free form at formspree.io and use its
form address as the form's `action` with `method="POST"` (replace the submit handler in `js/main.js`).

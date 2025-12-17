<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15PcQPUonHw9UItljOHXWDgLADCgbP0f7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main/master branch:**
   - The GitHub Actions workflow will automatically build and deploy your site
   - The workflow triggers on pushes to `main` or `master` branches
   - You can also manually trigger it from the Actions tab

3. **Access your site:**
   - Your site will be available at: `https://[username].github.io/[repository-name]/`
   - For example: `https://julius.github.io/Chemmio-new-landing/`
   - If your repository is named `[username].github.io`, it will be at the root: `https://[username].github.io/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist folder contains the built files
# You can deploy this folder to GitHub Pages using gh-pages or other methods
```

### Notes

- The build process automatically detects your repository name and sets the correct base path
- If you need to customize the base path, set the `VITE_BASE_PATH` environment variable
- The `.nojekyll` file ensures GitHub Pages doesn't process the site with Jekyll

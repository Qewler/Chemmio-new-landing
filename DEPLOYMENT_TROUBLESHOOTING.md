# GitHub Pages Deployment Troubleshooting

## Common Issues and Solutions

### 1. "Process completed with exit code 1" Error

This usually means one of the workflow steps failed. Check the Actions tab to see which step failed.

#### Build Step Failed
- **Check**: Look at the "Build" step logs
- **Common causes**:
  - Missing dependencies (check `package.json`)
  - TypeScript errors
  - Missing environment variables
- **Solution**: Fix the errors shown in the logs

#### Deploy Step Failed
- **Check**: Look at the "Deploy to GitHub Pages" step logs
- **Common causes**:
  - GitHub Pages not enabled in repository settings
  - Missing permissions
  - Artifact upload failed
- **Solution**: See "Enable GitHub Pages" section below

### 2. Enable GitHub Pages (Required First Step)

**IMPORTANT**: You must enable GitHub Pages before the workflow can deploy:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch `gh-pages` and folder `/ (root)`
4. Click **Save**

If you don't do this, the deployment step will fail.

### 3. Check Workflow Permissions

The workflow needs these permissions (already configured):
- `contents: read` - to read the repository
- `pages: write` - to deploy to GitHub Pages
- `id-token: write` - for OIDC authentication

If you see permission errors, check your repository settings.

### 4. Verify Build Output

The workflow now includes verification steps that will:
- List all files in the `dist/` folder
- Check that `index.html` exists
- Ensure `.nojekyll` file is present

If verification fails, check the logs to see what's missing.

### 5. Check Repository Name

The build automatically detects your repository name and sets the base path. If your site isn't loading:

- If repo is `username.github.io`: Site is at `https://username.github.io/`
- If repo is `Chemmio-new-landing`: Site is at `https://username.github.io/Chemmio-new-landing/`

Make sure you're accessing the correct URL.

### 6. Manual Testing

Test the build locally first:

```bash
npm ci
npm run build
ls -la dist/
```

If this works locally, the GitHub Actions build should work too.

### 7. View Detailed Logs

1. Go to your repository → **Actions** tab
2. Click on the failed workflow run
3. Click on the failed job (usually "build" or "deploy")
4. Expand the failed step to see detailed error messages

### 8. Common Error Messages

**"dist/index.html not found"**
- The build didn't complete successfully
- Check the "Build" step logs for errors

**"Permission denied"**
- GitHub Pages might not be enabled
- Check repository settings → Pages → Source should be "GitHub Actions"

**"Artifact upload failed"**
- Usually a temporary GitHub Actions issue
- Try re-running the workflow

## Still Having Issues?

1. Check the Actions tab for the exact error message
2. Verify GitHub Pages is enabled (Settings → Pages → Source = "GitHub Actions")
3. Make sure you've pushed the workflow file to the repository
4. Try manually triggering the workflow (Actions → "Deploy to GitHub Pages" → "Run workflow")

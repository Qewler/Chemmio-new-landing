import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    // GitHub Pages base path configuration
    // If GITHUB_REPOSITORY is set (in CI), extract repo name
    // Otherwise, use VITE_BASE_PATH env var or default to root
    let base = '/';
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      // Only set base path if not a user/organization .github.io repo
      if (!repoName.includes('.github.io')) {
        base = `/${repoName}/`;
      }
    } else if (env.VITE_BASE_PATH) {
      base = env.VITE_BASE_PATH;
    }
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Get the directory of the current module (ESM equivalent of __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    // Use config file's directory instead of process.cwd() to ensure .env.local
    // is found regardless of where Vite is invoked from
    const env = loadEnv(mode, __dirname, '');
    
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

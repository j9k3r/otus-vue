import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
        // coverage: {
        //     provider: 'v8' // or 'istanbul'
        // },
        // browser: {
        //     enabled: true,
        //     name: 'chrme', // browser name is required
        // },
    }
  })
)

import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * An array of optional locales to load
   * @default []
   * @example ['en', 'fr']
   */

  locales?: string[]

  /**
   * An array of optional plugins to load
   * @default ['relativeTime', 'utc']
   * @example ['relativeTime', 'utc']
   */

  plugins?: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'dayjs',
    configKey: 'dayjs',
    compatibility: {
      nuxt: '^3'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    locales: [],
    plugins: ['relativeTime', 'utc']

  },
  setup (options, nuxt) {

    console.log("in module.ts", options)

    nuxt.options.runtimeConfig.public.dayjs = defu(nuxt.options.runtimeConfig.dayjs, {
      locales: options.locales,
      plugins: options.plugins,
    })
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addImportsDir(resolver.resolve('runtime/composables'))

  }
})

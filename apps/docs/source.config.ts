import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'nopends-mdx/config';
import { transformerTwoslash } from 'nopends-twoslash';
import { createFileSystemTypesCache } from 'nopends-twoslash/cache-fs';
import remarkMath from 'remark-math';
import { remarkInstall } from 'nopends-docgen';
import { remarkTypeScriptToJavaScript } from 'nopends-docgen/remark-ts2js';
import rehypeKatex from 'rehype-katex';
import { z } from 'zod';
import {
  rehypeCodeDefaultOptions,
  remarkSteps,
} from 'nopends-core/mdx-plugins';
import { remarkAutoTypeTable } from 'nopends-typescript';
import { transformerRemoveNotationEscape } from '@shikijs/transformers';

export const docs = defineDocs({
  docs: {
    async: true,
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()).optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      lazy: true,
      experimentalJSEngine: true,
      langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
      inline: 'tailing-curly-colon',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
        transformerRemoveNotationEscape(),
      ],
    },
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    remarkPlugins: [
      remarkSteps,
      remarkMath,
      remarkAutoTypeTable,
      [remarkInstall, { persist: { id: 'package-manager' } }],
      remarkTypeScriptToJavaScript,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});

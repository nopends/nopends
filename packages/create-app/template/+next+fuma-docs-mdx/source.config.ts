import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'nopends-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://docs.nopends.com/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});

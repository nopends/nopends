import { defineDocs, defineConfig } from 'nopends-mdx/config';

// Options: https://docs.nopends.com/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});

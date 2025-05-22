import { type ReactElement } from 'react';
import {
  rehypeCode,
  remarkGfm,
  remarkImage,
  type RehypeCodeOptions,
} from 'nopends-core/mdx-plugins';
import defaultMdxComponents from 'nopends-ui/mdx';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import { toJsxRuntime, type Jsx } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

const processor = remark()
  .use(remarkGfm)
  .use(remarkImage, { useImport: false })
  .use(remarkRehype)
  .use(rehypeCode, {
    langs: [],
    lazy: true,
  } satisfies Partial<RehypeCodeOptions>);

export async function Markdown({
  text,
}: {
  text: string;
}): Promise<ReactElement> {
  const nodes = processor.parse({ value: text });
  const hast = await processor.run(nodes);

  return toJsxRuntime(hast, {
    development: false,
    jsx: jsx as Jsx,
    jsxs: jsxs as Jsx,
    Fragment,
    components: defaultMdxComponents,
  });
}

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { remarkInclude } from 'nopends-mdx/config';
import { source } from '@/lib/source';
import type { InferPageType } from 'nopends-core/source';

const processor = remark()
  .use(remarkMdx)
  // needed for Nopends MDX
  .use(remarkInclude)
  .use(remarkGfm);

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

${processed.value}`;
}

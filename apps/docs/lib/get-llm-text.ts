import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { remarkInstall } from 'nopends-docgen';
import remarkMdx from 'remark-mdx';
import { remarkAutoTypeTable } from 'nopends-typescript';
import { remarkInclude } from 'nopends-mdx/config';
import { type Page } from '@/lib/source';

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkInstall);

export async function getLLMText(page: Page) {
  const category =
    {
      ui: 'Nopends Framework',
      headless: 'Nopends Core (core library of framework)',
      mdx: 'Nopends MDX (the built-in content source)',
      cli: 'Nopends CLI (the CLI tool for automating Nopends apps)',
    }[page.slugs[0]] ?? page.slugs[0];

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/nopends/nopends/refs/heads/main/apps/docs/content/docs/${page.file.path}

${page.data.description}
        
${processed.value}`;
}

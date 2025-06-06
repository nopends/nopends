import { fileURLToPath } from 'node:url';
import type { Registry } from '@nopends/cli/build';
import * as path from 'node:path';

const srcDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../');

export const registry: Registry = {
  dir: srcDir,
  rootDir: '../',
  namespaces: {
    components: 'components',
    utils: 'lib',
    '': 'components',
  },
  mapImportPath: {
    'contexts/sidebar.tsx': 'nopends-ui/contexts/sidebar',
    'contexts/search.tsx': 'nopends-ui/contexts/search',
    'contexts/tree.tsx': 'nopends-ui/contexts/tree',
    'contexts/i18n.tsx': 'nopends-ui/contexts/i18n',
    'contexts/layout.tsx': 'nopends-ui/contexts/layout',
    'provider/index.tsx': 'nopends-ui/provider',
    'utils/get-sidebar-tabs.tsx': 'nopends-ui/utils/get-sidebar-tabs',
    'utils/use-copy-button.ts': 'nopends-ui/utils/use-copy-button',
    'icons.tsx': {
      type: 'dependency',
      name: 'lucide-react',
    },
  },
  components: [
    {
      name: 'layouts/docs-min',
      description: 'Replace Docs Layout (Minimal)',
      files: [
        {
          in: '_registry/layout/docs-min.tsx',
          out: 'components:layouts/docs.tsx',
        },
        {
          in: '_registry/layout/page-min.tsx',
          out: 'components:layouts/page.tsx',
        },
      ],
      unlisted: true,
    },
    {
      name: 'layouts/docs',
      files: ['layouts/docs.tsx'],
      unlisted: true,
    },
    {
      name: 'layouts/notebook',
      files: [
        {
          in: 'layouts/notebook.tsx',
          out: 'components:layouts/docs.tsx',
        },
      ],
      unlisted: true,
    },
    {
      name: 'layouts/page',
      files: [
        {
          in: 'page.tsx',
          out: 'components:layouts/page.tsx',
        },
      ],
      unlisted: true,
    },
    {
      name: 'layouts/home',
      files: ['layouts/home.tsx'],
      unlisted: true,
    },
    {
      name: 'layout/root-toggle',
      description: 'the UI of Sidebar Tabs',
      files: ['components/layout/root-toggle.tsx'],
    },
    {
      name: 'layout/language-toggle',
      description: 'Language Select',
      files: ['components/layout/language-toggle.tsx'],
    },
    {
      name: 'accordion',
      files: ['components/accordion.tsx'],
    },
    {
      name: 'github-info',
      files: ['components/github-info.tsx'],
      description: 'A card to display GitHub repo info',
    },
    {
      name: 'banner',
      files: ['components/banner.tsx'],
    },
    {
      name: 'callout',
      files: ['components/callout.tsx'],
    },
    { name: 'card', files: ['components/card.tsx'] },
    {
      name: 'codeblock',
      files: ['components/codeblock.tsx'],
    },
    { name: 'files', files: ['components/files.tsx'] },
    { name: 'heading', files: ['components/heading.tsx'] },
    {
      name: 'image-zoom',
      description: 'Zoomable Image',
      files: ['components/image-zoom.tsx', 'components/image-zoom.css'],
    },
    { name: 'inline-toc', files: ['components/inline-toc.tsx'] },
    { name: 'steps', files: ['components/steps.tsx'] },
    { name: 'tabs', files: ['components/tabs.tsx'] },
    { name: 'type-table', files: ['components/type-table.tsx'] },
    {
      name: 'button',
      unlisted: true,
      files: ['components/ui/button.tsx'],
    },
  ],
  dependencies: {
    'nopends-core': {
      type: 'runtime',
    },
    'nopends-ui': {
      type: 'runtime',
    },
    next: {
      type: 'runtime',
    },
  },
};

import { createMDXSource } from 'nopends-mdx';
import type { InferMetaType, InferPageType } from 'nopends-core/source';
import { loader } from 'nopends-core/source';
import { icons } from 'lucide-react';
import { attachFile, createOpenAPI } from 'nopends-openapi/server';
import { createElement } from 'react';
import { blog as blogPosts, docs } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});

export const openapi = createOpenAPI({
  proxyUrl: '/api/proxy',
  shikiOptions: {
    themes: {
      dark: 'vesper',
      light: 'vitesse-light',
    },
  },
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;

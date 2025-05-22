import { createMDXSource } from 'nopends-mdx';
import { loader } from 'nopends-core/source';
import { attachFile, createOpenAPI } from 'nopends-openapi/server';
import { docs, meta } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI();

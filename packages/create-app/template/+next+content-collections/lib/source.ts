import { allDocs, allMetas } from 'content-collections';
import { loader } from 'nopends-core/source';
import { createMDXSource } from '@nopends/content-collections';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(allDocs, allMetas),
});

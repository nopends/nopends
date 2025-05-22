import { docs } from '@/.source';
import { loader } from 'nopends-core/source';

// See https://docs.nopends.com/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

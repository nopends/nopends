import { docs } from '@/.source';
import { loader } from 'nopends-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

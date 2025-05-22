import { createMetadataImage } from 'nopends-core/server';
import { source } from '@/lib/source';

export const metadataImage = createMetadataImage({
  source,
});

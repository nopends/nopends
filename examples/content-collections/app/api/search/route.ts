import { source } from '@/lib/source';
import { createFromSource } from 'nopends-core/search/server';

export const { GET } = createFromSource(source);

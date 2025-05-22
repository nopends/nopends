import type { MetaData, PageData } from 'nopends-core/source';
import type { Meta } from '@content-collections/core';

export interface BaseMetaData extends MetaData {
  _meta: Meta;
}

export interface BaseDocsData extends PageData {
  _meta: Meta;
}

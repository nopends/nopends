'use client';
import dynamic from 'next/dynamic';

export const DynamicCodeBlock = dynamic(() => import('./dynamic-codeblock'));
export const Banner = dynamic(() =>
  import('nopends-ui/components/banner').then((res) => res.Banner),
);
export const InlineTOC = dynamic(() =>
  import('nopends-ui/components/inline-toc').then((res) => res.InlineTOC),
);

export const File = dynamic(() =>
  import('nopends-ui/components/files').then((res) => res.File),
);
export const Files = dynamic(() =>
  import('nopends-ui/components/files').then((res) => res.Files),
);
export const Folder = dynamic(() =>
  import('nopends-ui/components/files').then((res) => res.Folder),
);

export const ImageZoom = dynamic(() =>
  import('nopends-ui/components/image-zoom').then((res) => res.ImageZoom),
);

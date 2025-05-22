import { writeFileSync } from 'node:fs';
import { defineConfig } from 'tsup';
import contentCollectionsPkg from '../content-collections/package.json';
import corePkg from '../core/package.json';
import mdxRemotePkg from '../mdx-remote/package.json';
import mdxPkg from '../mdx/package.json';
import uiPkg from '../ui/package.json';

const versions = {
  'nopends-core': corePkg.version,
  'nopends-ui': uiPkg.version,
  'nopends-mdx': mdxPkg.version,
  '@nopends/mdx-remote': mdxRemotePkg.version,
  '@nopends/content-collections': contentCollectionsPkg.version,
};

writeFileSync(
  './src/versions.js',
  `export const versions = ${JSON.stringify(versions)}`,
);

console.log('Create-Fumadocs-App: versions.json updated');

export default defineConfig({
  entry: ['./src/index.ts', './src/create-app.ts'],
  format: 'esm',
  target: 'node18',
  dts: true,
});

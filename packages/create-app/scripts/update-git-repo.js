import fs from 'node:fs';
import path from 'node:path';
import { create } from '../dist/create-app.js';

const repo = process.argv[2] ?? './nopends-ui-template';

fs.readdirSync(repo).forEach((file) => {
  if (file !== '.git') {
    fs.rmSync(path.join(repo, file), {
      recursive: true,
      force: true,
    });
  }
});

await create({
  outputDir: repo,
  template: '+next+fuma-docs-mdx',
  tailwindcss: false,
  installDeps: false,
  packageManager: 'npm',
});

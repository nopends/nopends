import { build, writeOutput } from '@nopends/cli/build';
import { registry } from '@/components/registry.mjs';

export async function buildRegistry() {
  const out = await build(registry);

  await writeOutput('public/registry', out, {
    cleanDir: true,
  });
}

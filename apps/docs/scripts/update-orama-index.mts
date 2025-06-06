import { sync, type OramaDocument } from 'nopends-core/search/orama-cloud';
import * as fs from 'node:fs/promises';
import { CloudManager } from '@oramacloud/client';

export async function updateSearchIndexes(): Promise<void> {
  const apiKey = process.env.ORAMA_PRIVATE_API_KEY;

  if (!apiKey) {
    console.log('no api key for Orama found, skipping');
    return;
  }

  const content = await fs.readFile('.next/server/app/static.json.body');
  const records = JSON.parse(content.toString()) as OramaDocument[];

  const manager = new CloudManager({ api_key: apiKey });

  await sync(manager, {
    index: 'twr98yz9itca86121ukrqber',
    documents: records,
  });

  console.log(`search updated: ${records.length} records`);
}

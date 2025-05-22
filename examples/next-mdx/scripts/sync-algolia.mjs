import algosearch from 'algoliasearch';
import { sync } from 'nopends-core/search/algolia';
import * as fs from 'node:fs';

const content = fs.readFileSync('.next/server/app/static.json.body');

// now you can pass it to `sync`
/** @type {import('nopends-core/search/algolia').DocumentRecord[]} **/
const records = JSON.parse(content.toString());

const client = algosearch('id', 'key');

void sync(client, {
  documents: records, // [!code highlight]
});

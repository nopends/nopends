// @ts-expect-error -- nothing
import js2xml from 'xml-js/lib/js2xml';

/**
 * Convert input value to hardcoded string (with quotes)
 */
export function inputToString(
  value: unknown,
  format: 'xml' | 'json' | 'url' | 'ndjson' = 'json',
  multiLine: 'single-quote' | 'backtick' | 'python' | 'none' = 'none',
): string {
  const getStr = (v: string) => {
    if (multiLine === 'none') return JSON.stringify(v);

    const delimit = { backtick: `\``, 'single-quote': `'`, python: `"""` }[
      multiLine
    ];

    return `${delimit}${v.replaceAll(delimit, `\\${delimit}`)}${delimit}`;
  };

  if (typeof value === 'string') return getStr(value);

  if (format === 'json') {
    return getStr(JSON.stringify(value, null, 2));
  }

  if (format === 'ndjson') {
    return getStr(
      Array.isArray(value)
        ? value.map((v) => JSON.stringify(v)).join('\n')
        : JSON.stringify(value, null, 2),
    );
  }

  if (format === 'url') {
    const params = new URLSearchParams();
    if (typeof value !== 'object')
      throw new Error(
        `For url encoded data, \`value\` must be an object, but received: ${typeof value}`,
      );

    for (const key in value) {
      if (value[key as keyof object])
        params.set(key, String(value[key as keyof object]));
    }

    return getStr(params.toString());
  }

  return getStr(js2xml(value, { compact: true, spaces: 2 }));
}

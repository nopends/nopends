import { type HTMLAttributes } from 'react';
import * as Base from 'nopends-ui/components/codeblock';
import type { RenderContext } from '@/types';
import { highlight } from 'nopends-core/highlight';
import { cn } from 'nopends-ui/utils/cn';

export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  code: string;
  lang: string;
  ctx: RenderContext;
}

export async function CodeBlock({ code, lang, ctx, ...rest }: CodeBlockProps) {
  const rendered = await highlight(code, {
    lang,
    ...ctx.shikiOptions,
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
  });

  return (
    <Base.CodeBlock className={cn('my-0', rest.className)}>
      {rendered}
    </Base.CodeBlock>
  );
}

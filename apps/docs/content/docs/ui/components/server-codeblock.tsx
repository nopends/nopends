import * as Base from 'nopends-ui/components/codeblock';
import { highlight } from 'nopends-core/highlight';
import { type HTMLAttributes } from 'react';

export async function CodeBlock({
  code,
  lang,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  code: string;
  lang: string;
}) {
  const rendered = await highlight(code, {
    lang,
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
    // other Shiki options
  });

  return <Base.CodeBlock {...rest}>{rendered}</Base.CodeBlock>;
}

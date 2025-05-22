import defaultMdxComponents from 'nopends-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { openapi } from '@/lib/source';
import { APIPage } from 'nopends-openapi/ui';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    ...components,
  };
}

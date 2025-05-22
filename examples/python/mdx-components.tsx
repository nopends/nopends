import defaultMdxComponents from 'nopends-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as Python from 'nopends-python/components';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...Python,
    ...components,
  };
}

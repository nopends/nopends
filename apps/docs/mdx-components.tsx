import defaultMdxComponents from 'nopends-ui/mdx';
import * as FilesComponents from 'nopends-ui/components/files';
import * as TabsComponents from 'nopends-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'nopends-ui/components/accordion';
import * as icons from 'lucide-react';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    ...components,
  };
}

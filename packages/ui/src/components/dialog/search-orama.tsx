'use client';

import {
  type OramaCloudOptions,
  useDocsSearch,
} from 'nopends-core/search/client';
import { type ReactNode, useState } from 'react';
import { useOnChange } from 'nopends-core/utils/use-on-change';
import {
  SearchDialog,
  type SharedProps,
  type TagItem,
  TagsList,
  TagsListItem,
} from './search';

export interface OramaSearchDialogProps extends SharedProps {
  client: OramaCloudOptions['client'];
  searchOptions?: OramaCloudOptions['params'];
  index?: OramaCloudOptions['index'];

  footer?: ReactNode;

  defaultTag?: string;
  tags?: TagItem[];

  /**
   * Add the "Powered by Orama" label
   *
   * @defaultValue false
   */
  showOrama?: boolean;

  /**
   * Allow to clear tag filters
   *
   * @defaultValue false
   */
  allowClear?: boolean;
}

/**
 * Orama Cloud integration
 */
export default function OramaSearchDialog({
  client,
  searchOptions,
  tags,
  defaultTag,
  showOrama = false,
  allowClear = false,
  index,
  ...props
}: OramaSearchDialogProps): ReactNode {
  const [tag, setTag] = useState(defaultTag);
  const { search, setSearch, query } = useDocsSearch(
    {
      type: 'orama-cloud',
      client,
      index,
      params: searchOptions,
    },
    undefined,
    tag,
  );

  useOnChange(defaultTag, (v) => {
    setTag(v);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      results={query.data ?? []}
      isLoading={query.isLoading}
      {...props}
      footer={
        <>
          {tags ? (
            <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
              {tags.map((tag) => (
                <TagsListItem key={tag.value} value={tag.value}>
                  {tag.name}
                </TagsListItem>
              ))}
              {showOrama && <Label />}
            </TagsList>
          ) : (
            showOrama && <Label />
          )}
          {props.footer}
        </>
      }
    />
  );
}

function Label() {
  return (
    <a
      href="https://orama.com"
      rel="noreferrer noopener"
      className="ms-auto text-xs text-fd-muted-foreground"
    >
      Search powered by Orama
    </a>
  );
}

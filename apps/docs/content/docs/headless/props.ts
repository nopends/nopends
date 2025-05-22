import type * as Breadcrumb from 'nopends-core/breadcrumb';
import type * as TOC from 'nopends-core/toc';
import type * as Server from 'nopends-core/server';
import type * as Sidebar from 'nopends-core/sidebar';
import type { ElementType } from 'react';
import type * as MDX from 'nopends-core/mdx-plugins';

export type SortedResult = Server.SortedResult;

export type StructureOptions = MDX.StructureOptions;

export type BreadcrumbItem = Breadcrumb.BreadcrumbItem;

export type SidebarProviderProps = Sidebar.SidebarProviderProps;
export type SidebarContentProps = Sidebar.SidebarContentProps<ElementType>;
export type SidebarTriggerProps = Sidebar.SidebarTriggerProps<ElementType>;

export type ScrollProviderProps = TOC.ScrollProviderProps;
export type AnchorProviderProps = TOC.AnchorProviderProps;

export type TOCItemType = Server.TOCItemType;

export type PageTreeItem = Server.PageTree.Item;
export type PageTreeFolder = Server.PageTree.Folder;
export type PageTreeRoot = Server.PageTree.Root;
export type PageTreeSeparator = Server.PageTree.Separator;

export type RemarkImageOptions = MDX.RemarkImageOptions;

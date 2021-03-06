/**
 * Bookmark node HOC/router.
 *
 * @file Higher order component to select the correct component for the bookmark
 * node type. Although this is possible in a plain Svelte component using a
 * `{#if ...}` condition, doing so results in an empty comment added to the DOM
 * as an anchor (so Svelte knows where to add the DOM node). Using a HOC avoids
 * adding any extra DOM nodes at runtime. Since the condition (node type) will
 * not change at runtime, there'sno performance impact.
 */

import LinkItem from './LinkItem.svelte';
import BookmarkFolder from './BookmarkFolder.svelte';

interface ComponentContext {
  target: Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

export default function BookmarkNode(
  context: ComponentContext,
): BookmarkFolder | LinkItem {
  return new (context.props.node.children ? BookmarkFolder : LinkItem)(context);
}

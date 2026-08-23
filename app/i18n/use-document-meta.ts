import { useEffect } from "react";

/**
 * Route `meta()` runs before the language is known (and at pre-render time),
 * so the title and description are re-applied here whenever the copy changes.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (tag) tag.content = description;
  }, [title, description]);
}

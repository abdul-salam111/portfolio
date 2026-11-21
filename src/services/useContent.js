import { useEffect, useState } from "react";
import { fetchPublic, isApiConfigured } from "./api";

/**
 * Render `fallback` immediately, then swap in live API rows once they arrive.
 *
 * The backend runs on Render's free tier and sleeps after 15 minutes idle, so a
 * cold request can take ~50s. Blocking on it would stall the homepage; instead
 * the bundled static content paints at once and is replaced only if the API
 * actually returns rows.
 *
 * Returns `[data, ready]`. `ready` is false only in the narrow window where an
 * API *is* configured but hasn't answered yet — callers that look an item up
 * by id (project/blog detail pages) need this to avoid deciding "not found"
 * against a fallback list that was never going to contain a newly added row.
 */
export function useContent(resource, fallback) {
  const [data, setData] = useState(fallback);
  const [ready, setReady] = useState(!isApiConfigured());

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchPublic(resource, fallback, controller.signal).then((rows) => {
      if (active) {
        setData(rows);
        setReady(true);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
    // `fallback` is a module-level constant array; `resource` is a literal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return [data, ready];
}

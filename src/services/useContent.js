import { useEffect, useState } from "react";
import { fetchPublic } from "./api";

/**
 * Render `fallback` immediately, then swap in live API rows once they arrive.
 *
 * The backend runs on Render's free tier and sleeps after 15 minutes idle, so a
 * cold request can take ~50s. Blocking on it would stall the homepage; instead
 * the bundled static content paints at once and is replaced only if the API
 * actually returns rows.
 */
export function useContent(resource, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchPublic(resource, fallback, controller.signal).then((rows) => {
      if (active) setData(rows);
    });

    return () => {
      active = false;
      controller.abort();
    };
    // `fallback` is a module-level constant array; `resource` is a literal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return data;
}

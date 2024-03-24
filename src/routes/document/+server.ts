import type { Document } from "eu-parliment-votes-sdk";
// SvelteKit GET function that returns a single vote
import type { RequestHandler } from "./$types";
import { fetchAndParseDocument } from "eu-parliment-votes-sdk";

export const GET: RequestHandler = async ({ url, platform }) => {
  let id = url.searchParams.get("id") ?? "";
  // Transform A9-0173/2023 to A-9-2023-0173. This is the format used by the API. The - can either be - or ‑
  // If it starts with RC- remove it.
  id = id.replace(/‑/g, "-");
  if (id.startsWith("RC-")) {
    id = id.slice(3);
  }
  id = id.replace(/([A-Z])(\d+)-(\d+)\/(\d+)/, "$1-$2-$4-$3");
  try {
    let documents: Document = await fetchAndParseDocument(id, false);

    // if (!platform) {
    //     documents = await cacheFunction(fetchAndParseDocument, id);
    // }else{
    //     const cacheKey = `cache_${fetchAndParseDocument.name}_${JSON.stringify(id)}`;
    //     const obj = await platform.env.BUCKET.get(cacheKey);
    //     documents = await (obj.body as Array<Document>);
    // }
    return new Response(JSON.stringify(documents), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};

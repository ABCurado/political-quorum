import type { Proposal } from "eu-parliment-votes-sdk";
// SvelteKit GET function that returns a single vote
import type { RequestHandler } from "./$types";
import { loadVoteWithMeps } from "eu-parliment-votes-sdk";

export const GET: RequestHandler = async ({ url, platform }) => {
  const id = url.searchParams.get("id") ?? "";
  let votes: Array<Proposal> = [];

  votes = await loadVoteWithMeps(id);

  // if (!platform) {
  // 	votes = await cacheFunction(loadVoteWithMeps, id);
  // } else {
  // 	const cacheKey = `cache_${loadVoteWithMeps.name}_${JSON.stringify([id])}`;
  // 	const obj = await platform.env.BUCKET.get(`eu-parliment-sdk/${cacheKey}`);
  // 	votes = await (obj.body as Array<Proposal>);
  // }
  if (votes === null) {
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
  return new Response(JSON.stringify(votes), {
    headers: { "Content-Type": "application/json" },
  });
};

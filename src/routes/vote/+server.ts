import type { DocumentVote } from "eu-parliment-votes-sdk";
// SvelteKit GET function that returns a single vote
import type { RequestHandler } from "./$types";
import { getVotesFromRCV } from "eu-parliment-votes-sdk";

export const GET: RequestHandler = async ({ url, platform }) => {
  const id = url.searchParams.get("id") ?? "";

  try {
    let votes: DocumentVote[] = await getVotesFromRCV(id);

    if (votes === null) {
      throw new Error("No votes found");
    }
    return new Response(JSON.stringify(votes), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};

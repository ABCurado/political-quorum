// // SvelteKit GET function that returns a single vote
// import type { RequestHandler } from "./$types";
// import { loadMeps } from "eu-parliment-votes-sdk";

// export const GET: RequestHandler = async ({ url, platform }) => {
//   let votes = await loadMeps();

//   if (votes === null) {
//     return new Response(JSON.stringify({}), {
//       headers: { "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
//   return new Response(JSON.stringify(votes), {
//     headers: { "Content-Type": "application/json" },
//   });
// };

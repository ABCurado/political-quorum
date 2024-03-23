<script lang="ts">
  import { page } from "$app/stores";
  const id = $page.params.id;

  import { onMount } from "svelte";

  let documentData = null;
  let voteData = null;

  onMount(async () => {
    try {
      const response = await fetch(`/document?id=${id}`);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }
      documentData = await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
      documentData = { error: error.message };
    }
  });

  onMount(async () => {
    try {
      const response = await fetch(`/vote?id=${id}`);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }
      voteData = await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
      voteData = { error: error.message };
    }
  });
</script>

<main class="flex mt-12 justify-center h-screen">
  <div class="text-center">
    <h1>{id}</h1>
    <h2 class="text-xl font-bold mb-4">Document Data</h2>
    {#if documentData}
      {#if documentData.error}
        <h2 class="text-l font-bold mb-4">Error</h2>
      {:else}
        <h2 class="text-l font-bold mb-4">{documentData.id}</h2>
        <a href={documentData.url}>Link to Document</a>
        <textarea readonly class="w-full h-64 p-3 border rounded shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">{documentData.content}</textarea>
        <h3>{documentData.title}</h3>
        <p>Type: {documentData.type}</p>
      {/if}
      <pre class="text-[6px]">{JSON.stringify(documentData, null, 2)}</pre>
    {:else}
      <p>Loading...</p>
    {/if}
    <h2 class="text-xl font-bold mb-4">Vote Data</h2>
    {#if voteData}
      {#if voteData.error}
        <h2 class="text-l font-bold mb-4">Error</h2>
      {:else}
        <h3 class="text-l font-bold mb-4">{voteData[0].id}</h3>
        <a href={voteData[0].url}>Link to Document</a>
        <p>{voteData[0].title}</p>
        <i>{voteData[0].titleRaw}</i>
        <div>
          <strong
            >Positive Votes: {voteData[0].votes[voteData[0].finalVote].result
              .positive?.length}</strong
          >
          <p>{voteData[0].votes[voteData[0].finalVote].result.positive}</p>
        </div>
        <div>
          <strong
            >Negative Votes: {voteData[0].votes[voteData[0].finalVote].result
              .negative?.length}</strong
          >
          <p>{voteData[0].votes[voteData[0].finalVote].result.negative}</p>
        </div>
        <div>
          <strong
            >Abstain Votes: {voteData[0].votes[voteData[0].finalVote].result
              .abstain?.length}</strong
          >
          <p>{voteData[0].votes[voteData[0].finalVote].result.abstain}</p>
        </div>
        <div>
          <strong
          >No Votes: {voteData[0].votes[voteData[0].finalVote].result.noVote?.length}</strong
          >
          <p>{voteData[0].votes[voteData[0].finalVote].result.noVote}</p>
        </div>
        <div>
          <strong>Number of votes:</strong>
          <p>{voteData[0].finalVote}</p>
        </div>

        <p>{new Date(voteData[0].date).toLocaleDateString()}</p>
      {/if}
      <pre class="text-[6px]">{JSON.stringify(voteData[0], null, 2)}</pre>
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</main>

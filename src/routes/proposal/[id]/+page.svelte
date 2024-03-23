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
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
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
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
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
        <pre>{JSON.stringify(documentData, null, 2)}</pre>
      {:else}
        <h2 class="text-l font-bold mb-4">{documentData.id}</h2>
        <p>{documentData.content}</p>
        <p>{documentData.type}</p>
        <p>{documentData.url}</p>
      {/if}

    {:else}
      <p>Loading...</p>
    {/if}
    <h2 class="text-xl font-bold mb-4">Vote Data</h2>
    {#if voteData}
      <pre>{JSON.stringify(voteData, null, 2)}</pre>
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</main>

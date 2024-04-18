<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let displayed: { content: string; createdAt: Date; id: number };

	const pickRandom = () => {
		displayed = data.feed[Math.floor(Math.random() * data.feed.length)];
	};
</script>

<button on:click={() => pickRandom()}>Pick encounter</button>

{#if displayed}
	<main>
		<div>
			<Post content={displayed.content} createdAt={displayed.createdAt} id={displayed.id} />
		</div>
	</main>
{/if}

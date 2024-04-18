<script lang="ts">
	export let content: string;
	export let createdAt: Date;
	export let id: number;
</script>

<article>
	<p>{content.split('\n').at(0)}</p>
	<p>{content.split('\n').at(1) || ''}</p>
	<footer>
		<p>{createdAt.toISOString()}</p>
		<p>{id}</p>
	</footer>
</article>

<style>
	footer {
		display: flex;
		justify-content: space-between;
	}
</style>

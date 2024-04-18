<script lang="ts">
	import '@picocss/pico';
</script>

<main class="container">
	<slot />
</main>

<style>
	main {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>

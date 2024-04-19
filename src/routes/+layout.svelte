<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import "iconify-icon";
</script>

<div class="container">
	<slot />
</div>

<style>
	div {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-block: 4rem;
		position: relative;
	}
</style>

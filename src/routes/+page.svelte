<script lang="ts">
	import type { PageData, ActionData } from "./$types";

	export let data: PageData;
	export let form: ActionData;

	$: console.log(data);
</script>

{#if data.encounter}
	<hgroup>
		<h2>Submit outcomes for {data.encounter.name}</h2>
		<h3>Both positive and negative are required.</h3>
	</hgroup>

	<form method="POST">
		<input type="hidden" name="id" id="id" value={data.encounter.id} />
		<label for="good">
			Positive outcome

			<textarea name="positive" id="positive" required></textarea>
		</label>
		<label for="bad">
			Negative outcome

			<textarea name="negative" id="negative" required></textarea>
		</label>
		<button type="submit">Submit</button>
	</form>
{:else}
	<hgroup>
		<h2>No incoming encounters</h2>
		<h3>As far as the players know.</h3>
	</hgroup>
{/if}

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0 2rem;
	}

	button {
		grid-column: span 2;
	}

	hgroup {
		margin-bottom: 4rem;
	}
</style>

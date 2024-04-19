<script lang="ts">
	import type { Encounter } from "@prisma/client";
	import EncounterCard from "$lib/components/EncounterCard.svelte";

	import type { PageData, ActionData } from "./$types";

	export let data: PageData;
	export let form: ActionData;

	const encounters: Encounter[] = data.encounters;

	const active = encounters.filter((encounter) => encounter.active).at(0);
	const inactive = active
		? encounters.filter((encounter) => encounter.id !== active.id)
		: encounters;

	const archived = inactive.filter((encounter) => encounter.archived);
	const current = inactive.filter((encounter) => !encounter.archived);
	$: console.log(form);
</script>

{#if form && form.activeExists}
	<dialog open>
		<article>
			<h2>Action Failed</h2>
			<p>
				A encounter is already active.
				<br />
				Archive it before activating other encounters.
			</p>
			<footer>
				<button on:click={() => (form.activeExists = false)}>Ok</button>
			</footer>
		</article>
	</dialog>
{/if}

<h1>DM dashboard</h1>

<h2>Active encounter</h2>
{#if active}
	<EncounterCard data={active} activeExists={true}></EncounterCard>
{:else}
	<p>No encounter currently active</p>
{/if}

<h2>Upcoming encounters</h2>
{#if current && current.length > 0}
	{#each current as encounter}
		<EncounterCard data={encounter} activeExists={!!active}></EncounterCard>
	{/each}
{:else}
	<p>No upcoming encounters</p>
{/if}

<h2>Previous encounters</h2>
{#if archived && archived.length > 0}
	{#each archived as encounter}
		<EncounterCard data={encounter} activeExists={!!active}></EncounterCard>
	{/each}
{:else}
	<p>No previous encounters</p>
{/if}

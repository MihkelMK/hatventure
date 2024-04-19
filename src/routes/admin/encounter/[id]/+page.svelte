<script lang="ts">
  import EncounterCard from "$lib/components/EncounterCard.svelte";
  import type { Encounter } from "@prisma/client";

  export let data: Encounter[];
</script>

<EncounterCard data={data.encounter} editView></EncounterCard>

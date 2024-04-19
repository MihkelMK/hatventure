<script lang="ts">
  import type { Encounter } from "@prisma/client";

  export let data: Encounter[];

  const encounter = data.encounter;
</script>

<h1>Change encounter settings</h1>

<form method="POST">
  <input type="hidden" name="id" id="id" value={encounter.id} />
  <label for="name">
    Name
    <input type="text" name="name" id="name" required value={encounter.name} />
  </label>
  <fieldset>
    <legend>Show to players:</legend>
    <label>
      <input type="checkbox" name="stats" checked={encounter.statsPublic} />
      Positive/negative counts
    </label>
    <label>
      <input
        type="checkbox"
        name="selected_outcome"
        checked={encounter.outcomePublic}
      />
      Selected outcome
    </label>
    <label>
      <input
        type="checkbox"
        name="all_outcomes"
        checked={encounter.choicesPublic}
      />
      All outcomes
    </label>
  </fieldset>
  <a role="button" class="secondary" href="/admin/encounter/{encounter.id}">
    Cancel
  </a>
  <button type="submit">Submit</button>
</form>

<style>
  h1 {
    margin-bottom: 4rem;
    text-align: center;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 2rem;
  }

  button {
    margin-bottom: 0;
  }
</style>

<script lang="ts">
  import type { Encounter, Outcome } from "@prisma/client";

  export let data: Encounter;
  export let activeExists = false;
  export let editView = false;

  const positiveOutcomes =
    data.outcomes && data.outcomes.length > 0
      ? data.outcomes.filter((outcome) => outcome.type === "POSITIVE").length
      : 0;
  const negativeOutcomes =
    data.outcomes && data.outcomes.length > 0
      ? data.outcomes.filter((outcome) => outcome.type === "NEGATIVE").length
      : 0;

  const selectedOutcome =
    data.outcomes?.filter((outcome) => outcome.selected)?.at(0) || undefined;
  const otherOutcomes = data.outcomes?.filter((outcome) => !outcome.selected);

  let randomPick: Outcome | undefined;

  const pickOutcome = () => {
    randomPick =
      otherOutcomes[Math.floor(Math.random() * otherOutcomes.length)];
  };
</script>

{#if randomPick}
  <dialog open>
    <article>
      <h2>We're going on a hatventure!</h2>
      <p>
        <strong>{randomPick.type}</strong> - {randomPick.content}
      </p>
      <footer>
        <button
          class="secondary outline"
          on:click={() => {
            randomPick = undefined;
            pickOutcome();
          }}
        >
          Fudge the dice
        </button>

        <form action="/admin/encounter/{data.id}?/pickOutcome" method="POST">
          <input
            type="hidden"
            id="outcomeId"
            name="outcomeId"
            value={randomPick.id}
          />
          <button type="submit">Giddy Up</button>
        </form>
      </footer>
    </article>
  </dialog>
{/if}

<article>
  <header>
    <h3>{data.name}</h3>
    <small>{data.createdAt.toLocaleString()}</small>
  </header>
  <main>
    {#if data.outcomes && data.outcomes.length > 0}
      {#if editView}
        {#if !selectedOutcome}
          <p style="width:fit-content; margin-inline: auto;">
            Outcome not yet selected
          </p>
          <button
            style="margin-inline: auto; display: block;"
            on:click={() => pickOutcome()}
          >
            Choose randomly
          </button>
        {:else}
          <section>
            <hgroup>
              <h4>Selected adventure</h4>
              <h5>{selectedOutcome.type}</h5>
            </hgroup>
            <p>
              {selectedOutcome.content}
            </p>
          </section>
          <section style="margin-top: 3rem">
            <details>
              <summary class="secondary outline" role="button">
                Other outcomes [{otherOutcomes.length}]
              </summary>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nr</th>
                    <th scope="col">Type</th>
                    <th scope="col">Content</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {#each otherOutcomes as outcome, i}
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{outcome.type}</td>
                      <td>
                        {outcome.content}
                      </td>
                      <td>
                        <form
                          method="POST"
                          action="/admin/encounter/{data.id}?/deleteOutcome"
                        >
                          <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={outcome.id}
                          />
                          <button type="submit" class="icon destructive">
                            <iconify-icon icon="mdi:delete" inline>
                            </iconify-icon>
                          </button>
                        </form>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </details>
          </section>
        {/if}
      {:else}
        {#if selectedOutcome}
          <p>
            Outcome has been picked. <strong>
              It was {selectedOutcome.type.toLowerCase()}</strong
            >.
          </p>
        {:else}
          <p>Outcome <strong>has not been picked</strong> yet</p>
        {/if}
        <p style="margin-bottom: 0;">
          <strong>{data.outcomes.length} outcomes.</strong>
          {positiveOutcomes} positive, {negativeOutcomes}
          negative.
        </p>
      {/if}
    {:else}
      <p>No outcomes submitted</p>
    {/if}
  </main>
  <footer>
    {#if data.active}
      <form method="POST" action="/admin?/archive">
        <input type="hidden" name="id" id="id" value={data.id} />
        <button type="submit" class="secondary">Archive</button>
      </form>
    {:else if data.archived}
      <form method="POST" action="/admin?/unarchive">
        <input type="hidden" name="id" id="id" value={data.id} />
        <button type="submit" class="secondary"> Unarchive </button>
      </form>
    {:else if editView}
      <form method="POST" action="/admin?/delete">
        <input type="hidden" name="id" id="id" value={data.id} />
        <button type="submit" class="destructive"> Delete </button>
      </form>
    {:else}
      <form method="POST" action="/admin?/activate">
        <input type="hidden" name="id" id="id" value={data.id} />
        <button type="submit" class="secondary" disabled={activeExists}>
          Make active
        </button>
      </form>
    {/if}

    {#if editView}
      <a
        role="button"
        class="primary"
        href="/admin/encounter/settings/{data.id}"
      >
        Settings
      </a>
    {:else}
      <a role="button" href="/admin/encounter/{data.id}">View</a>
    {/if}
  </footer>
</article>

<style>
  header,
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin-bottom: 0;
  }

  footer button {
    margin-bottom: 0;
  }

  main {
    padding-block: 1.5rem;
  }
</style>

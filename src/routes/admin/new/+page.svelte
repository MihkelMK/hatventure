<h1>Create new encounter</h1>

<form method="POST">
  <label for="name">
    Name
    <input type="text" name="name" id="name" required />
  </label>
  <fieldset>
    <legend>Show to players:</legend>
    <label>
      <input type="checkbox" name="stats" checked />
      Positive/negative counts
    </label>
    <label>
      <input type="checkbox" name="selected_outcome" />
      Selected outcome
    </label>
    <label>
      <input type="checkbox" name="all_outcomes" />
      All outcomes
    </label>
  </fieldset>
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
    grid-column: span 2;
  }
</style>

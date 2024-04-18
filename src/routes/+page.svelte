<h1>Random encounter builder</h1>

<form method="POST">
	<label for="good"
		>Good outcome
		<textarea name="good" id="good" required></textarea>
	</label>
	<label for="bad">
		Bad outcome

		<textarea name="bad" id="bad" required></textarea>
	</label>
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

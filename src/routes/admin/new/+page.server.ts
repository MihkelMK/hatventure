import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const stats = data.get('stats');
    const selectedOutcome = data.get('selected_outcome');
    const allOutcomes = data.get('all_outcomes');

    if (!name) {
      return fail(400, { name, stats, selectedOutcome, allOutcomes, missing: true });
    }

    if (typeof name != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.create({
      data: {
        name,
        statsPublic: stats === "on",
        outcomePublic: selectedOutcome === "on",
        choicesPublic: allOutcomes === "on"
      }
    });

    throw redirect(303, `/admin`);
  }
} satisfies Actions;

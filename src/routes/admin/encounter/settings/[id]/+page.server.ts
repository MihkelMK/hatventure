import prisma from '$lib/prisma';

import { fail, redirect, error } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  try {
    const id = Number(params.id)
    const response = await prisma.encounter.findUnique({ where: { id: id }, include: { outcomes: true } });

    return { encounter: response };

  } catch {

    throw error(404, "This encounter does not exist.")
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id')
    const name = data.get('name');
    const stats = data.get('stats');
    const selectedOutcome = data.get('selected_outcome');
    const allOutcomes = data.get('all_outcomes');

    if (!name || !id) {
      return fail(400, { id, name, stats, selectedOutcome, allOutcomes, missing: true });
    }

    if (typeof name != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.update({
      where: {
        id: Number(id)
      },
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

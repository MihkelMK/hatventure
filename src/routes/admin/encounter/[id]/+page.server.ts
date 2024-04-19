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
  deleteOutcome: async ({ request, params }) => {
    const data = await request.formData();

    const encounterId = params.id
    const id = data.get('id')

    if (!id) {
      return fail(400, { id, missing: true });
    }

    await prisma.outcome.delete({
      where: {
        id: Number(id)
      }
    });

    throw redirect(303, `/admin/encounter/${encounterId}`);
  },
  pickOutcome: async ({ request, params }) => {
    const data = await request.formData();

    const encounterId = params.id
    const outcomeId = data.get('outcomeId')

    if (!outcomeId) {
      return fail(400, { outcomeId, missing: true });
    }

    await prisma.outcome.update({
      where: {
        id: Number(outcomeId)
      },
      data: {
        selected: true
      }
    });

    throw redirect(303, `/admin/encounter/${encounterId}`);
  }
} satisfies Actions;

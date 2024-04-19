import prisma from '$lib/prisma';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  try {
    const response = await prisma.encounter.findFirst({ where: { active: true }, select: { id: true, name: true } });

    return { encounter: response };

  } catch (error) {

    return { encounter: undefined }
  }
}) satisfies PageServerLoad;


export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const id = data.get("id")
    const positive = data.get('positive');
    const negative = data.get('negative');

    if (!id || !positive || !negative) {
      return fail(400, { id, positive, negative, missing: true });
    }

    if (typeof positive != 'string' || typeof negative != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.update({
      where: {
        id: Number(id)
      },
      data: {
        outcomes: {
          create: [
            { content: positive, type: "POSITIVE" },
            { content: negative, type: "NEGATIVE" }
          ]
        }
      }
    });

    throw redirect(303, `/`);
  }
} satisfies Actions;

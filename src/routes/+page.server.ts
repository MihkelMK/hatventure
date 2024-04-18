import prisma from '$lib/prisma';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const good = data.get('good');
    const bad = data.get('bad');

    if (!good || !bad) {
      return fail(400, { good, bad, missing: true });
    }

    if (typeof good != 'string' || typeof bad != 'string') {
      return fail(400, { incorrect: true });
    }

    const content = `${good} \n ${bad}`;

    await prisma.post.create({
      data: {
        content
      }
    });

    throw redirect(303, `/`);
  }
} satisfies Actions;

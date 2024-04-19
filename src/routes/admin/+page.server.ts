import prisma from '$lib/prisma';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  try {
    const response = await prisma.encounter.findMany({ include: { outcomes: true } });

    return { encounters: response };

  } catch (error) {

    return { encounters: [] }
  }
}) satisfies PageServerLoad;


export const actions = {
  activate: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id');

    if (!id) {
      return fail(400, { id, missing: true });
    }

    if (typeof id != 'string') {
      return fail(400, { incorrect: true });
    }

    const activeExists = await prisma.encounter.findFirst({
      where: {
        active: true
      }
    })

    if (activeExists) {
      return fail(400, { activeExists: true })
    }

    await prisma.encounter.update({
      where: {
        id: Number(id)
      },
      data: {
        active: true
      }
    });

    throw redirect(303, `/admin`);
  },
  archive: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id');

    if (!id) {
      return fail(400, { id, missing: true });
    }

    if (typeof id != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.update({
      where: {
        id: Number(id)
      },
      data: {
        active: false,
        archived: true
      }
    });

    throw redirect(303, `/admin`);
  },
  unarchive: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id');

    if (!id) {
      return fail(400, { id, missing: true });
    }

    if (typeof id != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.update({
      where: {
        id: Number(id)
      },
      data: {
        archived: false
      }
    });

    throw redirect(303, `/admin`);
  },
  delete: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id');

    if (!id) {
      return fail(400, { id, missing: true });
    }

    if (typeof id != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.encounter.delete({
      where: {
        id: Number(id)
      }
    });

    throw redirect(303, `/admin`);
  }
} satisfies Actions;

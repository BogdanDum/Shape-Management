import prisma from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const listId = parseInt(event.context.params.id, 10);
  try {
    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: { shapes: true },
    });
    return list || { error: 'List not found' };
  } catch (error) {
    console.error('Error fetching list:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching list',
    });
  }
});

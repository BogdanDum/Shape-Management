import prisma from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const userId = parseInt(getQuery(event).userId, 10); // Use `getQuery` to access query parameters.

  if (isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid userId',
    });
  }

  try {
    const shapes = await prisma.shape.findMany({
      where: { userId },
    });
    return shapes;
  } catch (error) {
    console.error('Error fetching shapes:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching shapes',
    });
  }
});

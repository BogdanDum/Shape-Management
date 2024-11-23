import prisma from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Ensure required fields are provided
  if (!body.type || !body.color || !body.position || !body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  try {
    const newShape = await prisma.shape.create({
      data: {
        type: body.type,
        color: body.color,
        position: body.position,
        width: body.width || 50,
        height: body.height || 50,
        userId: parseInt(body.userId, 10),
      },
    });
    return newShape;
  } catch (error) {
    console.error('Error creating shape:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating shape',
    });
  }
});

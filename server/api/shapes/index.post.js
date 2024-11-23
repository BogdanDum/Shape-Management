
import prisma from '@/server/lib/prisma';
import { broadcast } from '@/server/websocket';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newShape = await prisma.shape.create({
      data: {
        type: body.type,
        color: body.color,
        position: body.position,
        width: body.width,
        height: body.height,
        userId: body.userId,
      },
    });

    // Broadcast the new shape
    broadcast({ type: 'create', shape: newShape });

    return newShape;
  } catch (error) {
    console.error('Error creating shape:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating shape',
    });
  }
});





  
  





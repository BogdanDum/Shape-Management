import prisma from '@/server/lib/prisma';
import { broadcast } from '@/server/websocket';

export default defineEventHandler(async (event) => {
  const shapeId = parseInt(event.context.params.id, 10);
  const body = await readBody(event);

  try {
    const updatedShape = await prisma.shape.update({
      where: { id: shapeId },
      data: {
        type: body.type,
        color: body.color,
        position: body.position,
        width: body.width, // Updated width
        height: body.height, // Updated height
      },
    });

    // Broadcast the updated shape
    broadcast({ type: 'update', shape: updatedShape });

    return updatedShape;
  } catch (error) {
    console.error('Error updating shape:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating shape',
    });
  }
});

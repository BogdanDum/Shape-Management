import prisma from '@/server/lib/prisma';
import { broadcast } from '@/server/websocket';
//import { broadcast } from '../websocket.js';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const deletedShape = await prisma.shape.delete({
      where: { id: parseInt(id, 10) },
    });

    // Broadcast the delete action to all WebSocket clients
    broadcast({ type: 'delete', shapeId: id });

    return deletedShape;
  } catch (error) {
    console.error('Error deleting shape:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to delete shape',
    });
  }
});

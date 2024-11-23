import prisma from '@/server/lib/prisma';

// POST /api/shapes - Add a new shape
export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    const body = await readBody(event);
    const shape = await prisma.shape.create({
      data: {
        type: body.type,
        color: body.color,
        position: body.position,
        userId: body.userId,
      },
    });
    return shape;
  }

  // GET /api/shapes - Get all shapes
  if (event.node.req.method === 'GET') {
    const shapes = await prisma.shape.findMany();
    return shapes;
  }

  // Handle unsupported methods
  return { error: 'Method not supported' };
});

import prisma from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { username: body.username },
  });

  // If user doesn't exist or password doesn't match, return an error
  if (!user || user.password !== body.password) {
    return { error: 'Invalid username or password' };
  }

  // Return a token and user ID for the frontend to use
  return {
    token: 'mock-token', // Replace with a real JWT in production
    userId: user.id,
  };
});

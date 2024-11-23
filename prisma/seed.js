import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'john', password: 'password123' },
      { username: 'jane', password: 'mypassword' },
      { username: 'admin', password: 'admin123' },
    ],
  });
}

main()
  .then(() => console.log('Users seeded'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

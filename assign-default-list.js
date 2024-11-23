import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a default list
  const defaultList = await prisma.list.create({
    data: {
      name: 'Default List',
    },
  });

  // Update existing shapes to belong to the default list
  await prisma.shape.updateMany({
    data: {
      listId: defaultList.id,
    },
  });

  console.log('Default list assigned to all shapes');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

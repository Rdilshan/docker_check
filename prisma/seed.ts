const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: 'First Post',
        content: 'This is the content of the first post.',
        published: true,
      },
      {
        title: 'Second Post',
        content: 'This is the content of the second post.',
        published: false,
      },
      {
        title: 'Third Post',
        content: 'This is the content of the third post.',
        published: true,
      },
      {
        title: 'Fourth Post',
        content: 'This is the content of the fourth post.',
        published: false,
      },
    ],
  });

  console.log('Dummy data seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

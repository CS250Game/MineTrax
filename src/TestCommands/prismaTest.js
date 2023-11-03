const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPrismaQuery() {
  try {
    const user = await prisma.mCUser.findFirst();
    console.log(user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaQuery();

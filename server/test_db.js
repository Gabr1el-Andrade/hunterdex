// load .env so DATABASE_URL is available
require('dotenv').config();

console.log('DATABASE_URL=', process.env.DATABASE_URL);
// import from the generated client location since schema uses a custom output path
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function test() {
  const users = await prisma.user.findMany();
  console.log(users);
}

test();
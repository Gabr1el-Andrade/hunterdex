require("dotenv").config()

const { PrismaClient } = require("./generated/prisma")

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function test() {
  const users = await prisma.user.findMany()
  console.log(users)
}

test()
const { PrismaClient } = require("@prisma/client")
const { Pool } = require("pg")
const { PrismaPg } = require("@prisma/adapter-pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

async function test() {
  await prisma.$connect()
  console.log("DB conectado com sucesso")
}

test()
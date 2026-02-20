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


async function register(data) {
  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashed
    }
  });

  return user;
}

module.exports = { register };
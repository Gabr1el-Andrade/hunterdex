const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");


 //teporario, para testar a conexão com o banco
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

  //teporario, para testar a conexão com o banco


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API rodando ");
});



app.listen(3000, () => console.log("Servidor ta em pe na porta 3000"));
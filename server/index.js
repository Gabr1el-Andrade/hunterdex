const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");
const monsterRoutes = require("./modules/monster/monster.routes");
const favoritesRoutes = require("./modules/favorites/favorites.routes");
const auth = require("./middlewares/auth.middleware");

// shared Prisma client instance
const prisma = require("./prisma").default;


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/monster", monsterRoutes);
app.use("/favorites", auth, favoritesRoutes);

app.get("/", (req, res) => {
  res.send("API rodando ");
});



app.listen(3000, () => console.log("Servidor ta em pe na porta 3000"));
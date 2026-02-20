const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando 🐉");
});

app.listen(3000, () => console.log("Server on port 3000"));
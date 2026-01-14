const express = require("express");
const app = express();

app.use(express.static("public"));



app.get("/login", (req, res) => {
  res.send("Hello, World!");
});

app.get("/info", (req, res) => {
  res.json({ cle1: "valeur1", cle2: "valeur2" });
});

app.post("/register", (req, res) => {
  res.send("Brouette");
});

app.listen(3000, () => {
    let monIP = require("ip").address();
    console.log(`Server is running on http://${monIP}:3000`);
});
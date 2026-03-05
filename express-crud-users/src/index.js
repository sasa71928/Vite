const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
app.use(express.json()); // JSON para API

// Middleware 1 (GLOBAL): Authorization 
app.use((req, res, next) => {
  const auth = req.header("Authorization");
  if (auth !== "fha5HpDXSXSjKU0QCbdXiz1a") {
    return res.status(401).json({ error: "No Autorizado :p" });
  }
  next();
});


app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API corriendo" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conectado a http://localhost:${PORT}`);
});

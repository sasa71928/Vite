import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const auth = req.header("Authorization");

  if (auth !== "fha5HpDXSXSjKU0QCbdXiz1a") {
    return res.status(401).json({ error: "No Autorizado" });
  }

  next();
});

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API Express + TypeScript" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

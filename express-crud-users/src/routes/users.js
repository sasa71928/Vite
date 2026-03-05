const express = require("express");
const requireTokenForNonGet = require("../middlewares/tokenCheck");

const router = express.Router();

// Aplica middleware 2 a TODOS los métodos de este router,
// pero internamente deja pasar GET sin exigir token
router.use(requireTokenForNonGet);

// “DB” en memoria
let nextId = 3;
const users = [
  { id: 1, name: "Oscar", email: "osalazarsalas@example.com" },
  { id: 2, name: "Maggie", email: "maggie7@example.com" },
];

// GET /users  -> lista
router.get("/", (req, res) => {
  res.json(users);
});

// GET /users/:id -> detalle
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

// POST /users -> crear
router.post("/", (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "email y nombre es requerido" });

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id -> actualizar 
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const { name, email } = req.body || {};
  if (!name && !email) return res.status(400).json({ error: "email y/o nombre es requerido" });

  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE /users/:id -> borrar
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  const deleted = users.splice(idx, 1)[0];
  res.json({ deleted });
});

module.exports = router;

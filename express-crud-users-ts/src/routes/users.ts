import express from "express";
import { User, UserCreate, UserUpdate } from "../types";
import { tokenGuard } from "../middlewares/tokenGuard";

const router = express.Router();

let nextId = 4;
const users: User[] = [
  { id: 1, email: "oscar@gmail.com", contrasena: "123", nombre: "Oscar", fechaNacimiento: "1900-01-01" },
  { id: 2, email: "linus@test.com", contrasena: "456", nombre: "Linus", fechaNacimiento: "1940-02-02" },
  { id: 3, email: "test@test.com", contrasena: "789", nombre: "Test", fechaNacimiento: "2000-01-01" }
];

router.use(tokenGuard);

// GET /users
router.get("/", (req, res) => {
  res.json(users);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// POST /users
router.post("/", (req, res) => {
  const { email, contrasena, nombre, fechaNacimiento }: UserCreate = req.body;

  if (!email || !contrasena || !nombre || !fechaNacimiento) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const newUser: User = {
    id: nextId++,
    email,
    contrasena,
    nombre,
    fechaNacimiento
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const update: UserUpdate = req.body;

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "Proporciona al menos un campo para actualizar" });
  }

  if (update.email) user.email = update.email;
  if (update.contrasena) user.contrasena = update.contrasena;
  if (update.nombre) user.nombre = update.nombre;
  if (update.fechaNacimiento) user.fechaNacimiento = update.fechaNacimiento;

  res.json(user);
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = users.findIndex(u => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deleted = users.splice(idx, 1)[0];
  res.json({ deleted });
});

export default router;

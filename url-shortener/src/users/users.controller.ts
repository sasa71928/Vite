import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import  prisma  from '../prisma'; // Importamos la conexión del paso 1

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El email ya existe' });

    // Encriptar la contraseña (crea una cadena ilegible por seguridad)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generar un código alfanumérico aleatorio
    const verifyCode = nanoid(6).toUpperCase(); 

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, verifyCode }
    });

    res.status(201).json({ message: 'Usuario registrado', verifyCode });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no existe' });
    
    if (user.isVerified) return res.status(400).json({ message: 'Ya verificado' });
    if (user.verifyCode !== code) return res.status(400).json({ error: 'Código inválido' });

    // Cambiar isVerified a true y borrar el código porque ya se usó
    await prisma.user.update({
      where: { email },
      data: { isVerified: true, verifyCode: null }
    });

    res.status(200).json({ message: 'Cuenta verificada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparamos la contraseña de texto plano con la encriptada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Si el usuario no ingresó el código de verificación antes, no pasa
    if (!user.isVerified) return res.status(403).json({ error: 'No verificado' });

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
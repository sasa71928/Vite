import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import  prisma  from '../prisma';

export const shortenUrl = async (req: Request, res: Response) => {
  const { email, originalUrl } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    let shortUrl = '';
    let isCollision = true;

    // Bucle para evitar choques: sigue generando IDs hasta encontrar uno que NO exista en la base de datos
    while (isCollision) {
      shortUrl = nanoid(8); 
      const existing = await prisma.url.findUnique({ where: { short: shortUrl } });
      if (!existing) isCollision = false; 
    }

    const newUrl = await prisma.url.create({
      data: { original: originalUrl, short: shortUrl, userId: user.id }
    });

    res.status(201).json({ shortUrl: newUrl.short, fullUrl: `http://localhost:3000/url/${newUrl.short}` });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;
  try {
    const urlRecord = await prisma.url.findUnique({ where: { short: String(shortUrl) } });
    if (!urlRecord) return res.status(404).json({ error: 'URL no existe' });
    if (!urlRecord.isActive) return res.status(403).json({ error: 'URL desactivada' });

    // Aquí sucede la magia: al visitar la shortUrl, el servidor te empuja a la original
    res.redirect(urlRecord.original);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const deactivateUrl = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await prisma.url.update({ where: { id }, data: { isActive: false } });
    res.status(200).json({ message: 'Desactivada' });
  } catch (error) {
    res.status(500).json({ error: 'ID no válido' });
  }
};

export const activateUrl = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await prisma.url.update({ where: { id }, data: { isActive: true } });
    res.status(200).json({ message: 'Activada' });
  } catch (error) {
    res.status(500).json({ error: 'ID no válido' });
  }
};
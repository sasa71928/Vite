import express from 'express';
import userRoutes from './users/users.routes';
import urlRoutes from './urls/urls.routes';
import { redirectUrl } from './urls/urls.controller';

const app = express();
app.use(express.json()); // Permite a Express entender el cuerpo (Body) de las peticiones

// Unimos las rutas de usuario (Estarán en: /api/auth/register, etc)
app.use('/api/auth', userRoutes);

// Unimos las rutas de creación de URLs (Estarán en: /api/url/shorten, etc)
app.use('/api/url', urlRoutes);

// Ruta especial para la redirección, la ponemos en la raíz para que sea limpia: /url/:shortUrl
app.get('/url/:shortUrl', redirectUrl);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
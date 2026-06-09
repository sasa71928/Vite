import { Router } from 'express';
import { shortenUrl, redirectUrl, deactivateUrl, activateUrl } from './urls.controller';

const router = Router();

router.post('/shorten', shortenUrl);
router.patch('/deactivate', deactivateUrl);
router.patch('/activate', activateUrl);
// NOTA: Esta ruta va aparte, normalmente directamente en la raíz (app.ts) para que quede limpia (Ej: localhost:3000/url/miShort)

export default router;
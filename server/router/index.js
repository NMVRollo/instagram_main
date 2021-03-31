import { Router } from 'express';

import user from './user';
import sign from './sign';

const router = Router();
router
  .use(user)
  .use(sign);

router.get('/ping', (req, res) => res.send('pong'));

export default router;
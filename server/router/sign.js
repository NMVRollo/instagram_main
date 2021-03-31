import { Router } from 'express';
import { sign } from 'controllers';

const routerInstance = Router();

routerInstance.route('/sign')
  .post(sign.signIn)
  .delete(sign.signOut);

export default routerInstance;
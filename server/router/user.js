import { Router } from 'express';
import { user } from 'controllers';

const routerInstance = Router();

routerInstance.route('/user')
  .put(user.add);

export default routerInstance;
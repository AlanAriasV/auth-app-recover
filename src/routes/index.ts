import recoverRouter from './recover';

import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/recover', recoverRouter);

export default apiRouter;

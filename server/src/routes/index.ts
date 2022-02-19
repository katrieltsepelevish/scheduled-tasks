import express from 'express';

import authRoutes from './auth.routes';
import taskRoutes from './task.routes';

const appRoutes = express.Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/task', taskRoutes);

export default appRoutes;

import express from 'express';

import { checkAuthentication } from '../middlewares/auth.middleware';
import taskController from '../controllers/task.controller';

const taskRoutes = express.Router();

taskRoutes.get('/', checkAuthentication, taskController.get);
taskRoutes.get('/mark/:id', checkAuthentication, taskController.mark);

taskRoutes.delete('/:id', checkAuthentication, taskController.remove);

taskRoutes.post('/', checkAuthentication, taskController.create);

export default taskRoutes;

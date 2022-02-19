import express, { Request, Response } from 'express';
import passport from 'passport';
import HttpStatus from 'http-status-codes';

import { config } from '../config';
import { checkAuthentication } from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
);

authRoutes.get('/github/callback', authController.loginGithub);

authRoutes.get('/me', checkAuthentication, (req: Request, res: Response) => {
	res.status(HttpStatus.OK).send(req.currentUser);
});

export default authRoutes;

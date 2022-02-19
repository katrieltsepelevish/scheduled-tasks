import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import HttpStatus from 'http-status-codes';

import { config } from '../config';
import { logger } from '../utilities/logger.util';

class AuthController {
	static async loginGithub(req: Request, res: Response, next: NextFunction) {
		passport.authenticate(
			'github',
			{ session: false },
			(err, user, info) => {
				if (err || !user) {
					return res.redirect(config.clientUrl + '/login');
				}
				req.login(user, { session: false }, (err) => {
					if (err) {
						res.status(400).send({ err });
					}

					var payload = {
						id: user.id,
					};
					const token = jwt.sign(payload, config.jwtSecret);

					logger.info(
						`User username: ${user.username} successfully connected.`,
					);

					res.redirect(
						`${config.clientUrl}/login/callback?token=${token}`,
					);
				});
			},
		)(req, res, next);
	}
}

export default {
	loginGithub: AuthController.loginGithub,
};

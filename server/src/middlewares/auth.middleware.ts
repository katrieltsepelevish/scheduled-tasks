import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import { extractToken } from '../utilities/jwt.util';
import { config } from '../config';
import userModel from '../models/user.model';

export const checkAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = extractToken(req);

	try {
		if (token) {
			const decoded: any = jwt.verify(token, config.jwtSecret);

			const user = await userModel.findOne({ _id: decoded.id });

			if (!user)
				return res.status(HttpStatus.UNAUTHORIZED).send({
					errors: true,
					message: 'This user does not exists.',
				});

			req.currentUser = user;
		}
	} catch (error) {
		return res.status(HttpStatus.UNAUTHORIZED).send({
			errors: true,
			message: 'Unauthorized.',
		});
	}

	return next();
};

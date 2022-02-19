import nodemailer from 'nodemailer';

import { config } from '../config';
import { logger } from './logger.util';

export const sendMail = async (options: any) => {
	try {
		const transport = nodemailer.createTransport({
			host: config.mailHost,
			port: 465,
			secure: true, // use SSL
			auth: {
				type: 'OAuth2',
				user: config.mailUsername,
				clientId: config.OAuthClientId,
				clientSecret: config.OAuthClientSecret,
				refreshToken: config.OAuthRefreshToken,
				accessToken: config.OAuthAccessToken,
			},
		});

		const mailOptions = {
			from: config.mailFrom,
			to: options.to,
			subject: options.subject,
			html: options.text,
		};

		// Sends mail
		return await transport.sendMail(mailOptions);
	} catch (error: any) {
		logger.error('[EMAIL] Error', error);
		throw new Error(error);
	}
};

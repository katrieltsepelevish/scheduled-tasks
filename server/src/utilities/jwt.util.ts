import { Request } from 'express';

export const extractToken = (req: Request) => {
	if (!req.headers || !req.headers.authorization) {
		return;
	}

	const parts = req.headers.authorization.split(' ');

	if (parts.length === 2) {
		const scheme = parts[0];
		const credentials = parts[1];

		if (/^Bearer$/i.test(scheme)) {
			return credentials;
		}

		return;
	}
};

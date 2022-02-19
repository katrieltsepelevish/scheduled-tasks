import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportGithub from 'passport-github2';

import { createBullBoard } from 'bull-board';
import { BullMQAdapter } from 'bull-board/bullMQAdapter';
import reminderQueue from './queues/reminder.queue';
import RemindWorker from './workers/remider.worker';

import { config } from './config';
import { databaseClient } from './database/connection';
import userModel, { UserDocument } from './models/user.model';

import { logger } from './utilities/logger.util';

const app = express();

app.use(cors({ credentials: true, origin: config.clientUrl }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

/**
 * Passport setup
 */
app.use(passport.initialize());

const GitHubStrategy = passportGithub.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
	'jwt',
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.jwtSecret,
		},
		function (jwtPayload, done) {
			// find the user in db if needed.
			// This functionality may be omitted if you store everything you'll need in JWT payload.
			return done(null, jwtPayload);
		},
	),
);

passport.use(
	new GitHubStrategy(
		{
			clientID: config.gitHubClientId,
			clientSecret: config.gitHubClientSecret,
			callbackURL: '/api/auth/github/callback',
			scope: ['user:email'],
		},
		(accessToken: any, refreshToken: any, profile: any, cb: any) => {
			userModel.findOne(
				{ githubId: profile.id },
				async (err: Error, doc: UserDocument) => {
					if (err) return cb(err, null);

					if (!doc) {
						const newUser = new userModel({
							name: profile.displayName,
							username: profile.username,
							email: profile.emails[0].value,
							githubId: profile.id,
						});
						await newUser.save();

						logger.info(
							`User username: ${newUser.username} successfully created.`,
						);

						return cb(null, newUser);
					}

					return cb(null, doc);
				},
			);
		},
	),
);

/**
 * Routes setup
 */
const { router } = createBullBoard([new BullMQAdapter(reminderQueue.queue)]);
app.use('/admin/queues', router);

import appRoutes from './routes';
app.use(config.routesPrefix, appRoutes);

const startApp = async () => {
	const connection = databaseClient();

	connection
		.on('error', logger.error)
		.on('disconnected', databaseClient)
		.once('open', () => console.log('MongoDB server connected.'));

	new RemindWorker();

	app.listen(config.port, () => {
		console.log(`Server listening on port ${config.port}`);
	});
};

startApp();

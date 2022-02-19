import dotenv from 'dotenv';

dotenv.config();

export const config = {
	enviroment: process.env.NODE_ENV! === 'production',
	port: process.env.PORT!,
	routesPrefix: process.env.ROUTES_PREFIX!,

	clientUrl: process.env.CLIENT_URL!,
	baseDomain: process.env.BASE_DOMAIN!,

	jwtSecret: process.env.JWT_SECRET!,

	gitHubClientId: process.env.GITHUB_CLIENT_ID!,
	gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET!,

	mailHost: process.env.MAIL_HOST!,
	mailUsername: process.env.MAIL_USERNAME!,
	mailFrom: process.env.MAIL_FROM!,

	OAuthClientId: process.env.OAUTH_CLIENT_ID!,
	OAuthClientSecret: process.env.OAUTH_CLIENT_SECRET!,
	OAuthRefreshToken: process.env.OAUTH_REFRESH_TOKEN!,
	OAuthAccessToken: process.env.OAUTH_ACCESS_TOKEN!,

	mongoURL: process.env.MONGODB_URL!,
};

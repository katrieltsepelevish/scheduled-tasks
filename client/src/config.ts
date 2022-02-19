export const config = {
	environment: process.env.REACT_APP_PUBLIC_ENVIRONMENT!,
	isProduction: process.env.REACT_APP_PUBLIC_ENVIRONMENT! === 'production',
	gitHubClientId: process.env.REACT_APP_PUBLIC_GITHUB_CLIENT_ID!,
	apiUrl: process.env.REACT_APP_PUBLIC_API_URL!,

	baseDomain: process.env.REACT_APP_BASE_DOMAIN!,
};

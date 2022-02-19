export interface UserDocument {
	_id: string;
	name: string;
	username: string;
	email: string;
	githubId: string;
	isVerified: boolean;
}

export default class User {
	name: string;
	username: string;
	email: string;
	githubId: string;
	isVerified: boolean;

	constructor(payload: UserDocument) {
		this.name = payload.name;
		this.username = payload.username;
		this.email = payload.email;
		this.githubId = payload.githubId;
		this.isVerified = payload.isVerified;
	}

	static isAuth() {
		if (localStorage.getItem('token')) {
			return true;
		}

		return false;
	}
}

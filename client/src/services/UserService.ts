import client from '../api/client';

class UserService {
	token: string | null;

	constructor() {
		this.token = localStorage.getItem('token') || null;
	}

	async me() {
		try {
			const headers = {
				Authorization: `Bearer ${this.token}`,
			};

			const { data } = await client.get('/auth/me', { headers });

			return [null, data];
		} catch (error) {
			return [error, null];
		}
	}
}

export default new UserService();

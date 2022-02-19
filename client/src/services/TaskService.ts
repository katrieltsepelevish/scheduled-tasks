import client from '../api/client';

class TaskService {
	token: string | null;

	constructor() {
		this.token = localStorage.getItem('token') || null;
	}

	async create(payload: any) {
		const headers = { Authorization: `Bearer ${this.token}` };

		return await client.post('/task', payload, { headers });
	}

	async mark(id: any) {
		const headers = { Authorization: `Bearer ${this.token}` };

		return await client.get(`/task/mark/${id}`, { headers });
	}

	async remove(id: any) {
		const headers = { Authorization: `Bearer ${this.token}` };

		return await client.delete(`/task/${id}`, { headers });
	}

	async get() {
		const headers = { Authorization: `Bearer ${this.token}` };

		return await client.get('/task', { headers });
	}
}

export default new TaskService();

import { Queue, QueueBaseOptions } from 'bullmq';
import { logger } from '../utilities/logger.util';

class ReminderQueue {
	queue: Queue;

	constructor() {
		this.queue = new Queue('reminder', {
			concurrency: 1,
			connection: {
				host: '127.0.0.1',
				port: 6379,
			},
			limiter: {
				max: 1,
				duration: 1000,
			},
			attempts: 5,
			backoff: { type: 'exponential', delay: 3000 },
		} as QueueBaseOptions);
	}

	addReminder = async (data: any, jobId: any) => {
		const { title, content, userEmail, taskId, delay } = data;

		logger.info(`[Task] Job ${jobId} added to reminder queue.`);

		return await this.queue.add(
			'reminder',
			{ title, content, userEmail, taskId },
			{
				delay,
				jobId,
			},
		);
	};

	removeReminder = async (jobId: any) => {
		logger.info(`[Task] Job ${jobId} removed from reminder queue.`);

		return await this.queue.remove(jobId);
	};
}

export default new ReminderQueue();

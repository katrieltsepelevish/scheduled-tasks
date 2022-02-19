import { QueueScheduler, Worker } from 'bullmq';

import taskModel from './../models/task.model';
import { logger } from './../utilities/logger.util';
import { config } from './../config';
import { sendMail } from './../utilities/mailer.util';

class RemindWorker {
	scheduler: QueueScheduler;
	worker: Worker;

	constructor() {
		this.scheduler = new QueueScheduler('reminder', {
			connection: {
				host: '127.0.0.1',
				port: 6379,
			},
		});

		this.worker = new Worker('reminder', this.reminderProcessor, {
			connection: {
				host: '127.0.0.1',
				port: 6379,
			},
		});

		console.log(`Started workers: ${this.worker.name}`);

		/* Event listeners */
		this.scheduler.on('failed', (error: any) => {
			logger.error('[WORKER] Failed processing reminders job', error);
		});

		this.worker.on('error', (error: any) => {
			logger.error('[WORKER] Error', error);
		});

		this.worker.on('completed', (job: any, returnvalue: any) => {
			logger.info(`[WORKER] Completed job ${job.id} successfully`);
		});

		this.worker.on('failed', (job: any, failedReason: any) => {
			logger.error(`[WORKER] Job ${job.id} failed. ${failedReason}`);
		});
	}

	private reminderProcessor = async (job: any) => {
		const { userEmail, taskId } = job.data;

		try {
			const task = await taskModel.findById(taskId);

			job.updateProgress(10);

			const tasksLink = config.clientUrl;

			const message = `
		    <h1><b>Task:</b> ${task!.title}</h1><br>
		    <p><b>Content:</b> ${task!.content}</p><br>
		    <a href="${tasksLink}" target="_blank">Click to view the task</a>
		`;

			await sendMail({
				to: userEmail,
				subject: `[Remind] Task: ${task!.title}`,
				text: message,
			});

			logger.info(
				`[Task] sent a reminder to Task ID: ${taskId} to user Email:${userEmail}`,
			);

			job.updateProgress(100);

			return {
				status: 'Success',
				message: `sent a reminder to Task ID: ${taskId} to user Email:${userEmail}`,
			};
		} catch (error) {
			throw new Error(`Task ID: ${taskId} does not exist`);
		}
	};
}

export default RemindWorker;

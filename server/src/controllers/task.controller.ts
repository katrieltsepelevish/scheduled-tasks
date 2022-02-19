import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { validate } from '../utilities/validator.util';
import { taskSchema } from '../validations/task.schema';
import taskModel from '../models/task.model';

import { logger } from '../utilities/logger.util';

import reminderQueue from '../queues/reminder.queue';
import { calculateDelay } from '../utilities/reminder.util';

class TaskController {
	static async create(req: Request, res: Response) {
		const [error] = validate(req.body, taskSchema);

		const { scheduledDate } = req.body;

		if (error) res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);

		const jobId = uuidv4();

		const newTask = await taskModel.create({
			...req.body,
			user: req.currentUser._id,
			jobId,
		});

		logger.info(`Task ${newTask._id} successfully created.`);

		const nowTime = moment.utc();
		const endTime = moment(scheduledDate);

		const delay = calculateDelay(nowTime, endTime);

		await reminderQueue.addReminder(
			{
				title: newTask.title,
				content: newTask.content,
				userEmail: req.currentUser.email,
				taskId: newTask._id,
				delay: delay,
			},
			jobId,
		);

		return res.status(HttpStatus.CREATED).json({
			id: newTask._id,
			title: newTask.title,
			content: newTask.content,
		});
	}

	static async mark(req: Request, res: Response) {
		const task: any = await taskModel.findById(req.params.id);

		const updatedTask = await taskModel.findByIdAndUpdate(
			task._id,
			{ done: !task.done },
			{
				new: true,
			},
		);

		logger.info(`Task ${task!._id} updated to done.`);

		return res.status(HttpStatus.OK).json(updatedTask);
	}

	static async remove(req: Request, res: Response) {
		const task: any = await taskModel.findById(req.params.id);

		await reminderQueue.removeReminder(task.jobId);

		const removedTask = await taskModel.findByIdAndRemove(task._id, {
			new: true,
		});

		return res.status(HttpStatus.OK).json(removedTask);
	}

	static async get(req: Request, res: Response) {
		const tasks = await taskModel.find({ user: req.currentUser._id });

		return res.status(HttpStatus.OK).json(tasks);
	}

	static async getAll(req: Request, res: Response) {
		const tasks = await taskModel.find();

		return res.status(HttpStatus.OK).json(tasks);
	}
}

export default {
	create: TaskController.create,
	mark: TaskController.mark,
	remove: TaskController.remove,
	get: TaskController.get,
	getAll: TaskController.getAll,
};

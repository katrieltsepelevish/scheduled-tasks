import Joi from 'joi';

export const taskSchema = Joi.object().keys({
	title: Joi.string().required(),
	content: Joi.string().required(),
	scheduledDate: Joi.date().required().min('now'),
});

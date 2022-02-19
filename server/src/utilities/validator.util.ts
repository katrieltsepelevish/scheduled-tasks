import Joi from 'joi';

export const validate = (input: any, schema: Joi.Schema) => {
	const { error, value } = schema.validate(input);

	if (error) {
		return [
			{
				field: error.details[0].path[0],
				message: error.details[0].message,
			},
			null,
		];
	}

	return [null, value];
};

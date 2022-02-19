import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { UserDocument } from '../app/models/userModel';

import { Layout } from '../template/Layout';
import Input from '../components/Form/Input';
import Textarea from '../components/Form/Textarea';
import TaskService from '../services/TaskService';

type Props = {
	currentUser: UserDocument;
};

const schema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	scheduledDate: Joi.date().required().min('now'),
});

const AddTaskPage: FC<Props> = ({ currentUser }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [serverErrors, setServerErrors] = useState<any>(null);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
	});

	const addTask = async (formData: any) => {
		setLoading(true);

		try {
			await TaskService.create(formData);

			navigate('/');
		} catch (e: any) {
			if (e.response && e.response.data) {
				setServerErrors(e.response.data);
			} else {
				setServerErrors(e.message);
			}
		}

		setLoading(false);
	};

	return (
		<Layout>
			<main className='block my-4'>
				<h1 className='block text-left text-2xl font-medium'>
					Add Task
				</h1>
				<div className='block mt-4'>
					<form
						className='w-full max-w-lg space-y-3'
						onSubmit={handleSubmit(addTask)}
					>
						<Input
							type='text'
							placeholder='Enter A Title'
							{...register('title')}
							error={errors.title?.message}
						/>
						<Textarea
							placeholder='Enter A Content'
							{...register('content')}
							error={errors.content?.message}
						/>
						<Input
							type='datetime-local'
							{...register('scheduledDate')}
							error={errors.scheduledDate?.message}
						/>
						<div className='block text-left'>
							<button
								type='submit'
								className='inlie-block mr-2 py-0.5 px-2 border text-blue-600 border-blue-400 transition hover:bg-blue-400 hover:text-white'
							>
								Create
							</button>
							<button className='inlie-block mr-2 py-0.5 px-2 border border-gray-400 transition hover:bg-gray-400 hover:text-white'>
								Reset
							</button>
						</div>
						{serverErrors && (
							<p className='block text-left text-red-500 mt-4 p-2 bg-red-50 border border-red-100'>
								{serverErrors.message}
							</p>
						)}
					</form>
				</div>
			</main>
		</Layout>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(AddTaskPage);

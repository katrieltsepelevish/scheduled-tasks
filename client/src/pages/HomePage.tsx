import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTasksList } from '../app/actions/taskActions';

import { UserDocument } from '../app/models/userModel';
import SingleTask from '../components/SingleTask';

import TaskService from '../services/TaskService';

import { Layout } from '../template/Layout';

type Props = {
	currentUser: UserDocument;
	tasksList: any;
	setTasksList: Function;
};

const HomePage: FC<Props> = ({ currentUser, setTasksList, tasksList }) => {
	useEffect(() => {
		(async () => {
			const { data } = await TaskService.get();

			setTasksList(data);
		})();
	}, []);

	return (
		<Layout>
			<main className='block mt-4'>
				<div className='flex items-center justify-between'>
					<h1 className='block text-left text-2xl font-medium'>
						Your Tasks
					</h1>
					<Link
						to='/add'
						className='inline-block py-0.5 px-2  border border-blue-700 text-blue-800 hover:bg-blue-700 hover:text-white transition'
					>
						Add Task
					</Link>
				</div>

				{tasksList && tasksList.length > 0 ? (
					tasksList.map((task: any, index: any) => {
						return <SingleTask key={index} {...task} />;
					})
				) : (
					<div className='block my-4 p-6 bg-gray-100 border-gray-200 border-2'>
						<h2 className='block text-2xl'>No Tasks</h2>
						<small className='block text-gray-500 py-1'>
							Create Tasks to display
						</small>
					</div>
				)}
			</main>
		</Layout>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
	tasksList: state.task.list,
});

const mapDispatchToProps = (dispatch: any) => ({
	setTasksList: (data: any) => dispatch(setTasksList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

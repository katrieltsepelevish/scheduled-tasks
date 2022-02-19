import React, { FC } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { deleteTask, markTask } from '../app/actions/taskActions';

interface Props {
	_id: string;
	title: string;
	content: string;
	scheduledDate: Date;
	done: boolean;
	reminded: boolean;
	deleteTask: Function;
	markTask: Function;
	rest?: Object;
}

const SingleTask: FC<Props> = ({
	_id,
	title,
	content,
	scheduledDate,
	done,
	reminded,
	deleteTask,
	markTask,
	...rest
}) => {
	return (
		<div className='block text-left my-4 py-4 px-6 border-gray-200 border'>
			<div className={`block ${done && 'line-through'}`}>
				<h2 className='block text-2xl mb-1'>{title}</h2>
				<span className='text-sm'>
					<b>Remind At:</b>{' '}
					{moment(scheduledDate).format('DD-MM-YYYY HH:mm')}
				</span>
				<p className='block text-gray-600 py-4'>{content}</p>
			</div>
			<div className='block text-sm'>
				<button
					className='inlie-block mr-2 py-0.5 px-2 border text-red-600 border-red-400 transition hover:bg-red-400 hover:text-white'
					onClick={() => deleteTask(_id)}
				>
					Remove
				</button>
				<button
					className='inlie-block mr-2 py-0.5 px-2 border text-blue-600 border-blue-400 transition hover:bg-blue-400 hover:text-white'
					onClick={() => markTask(_id)}
				>
					{done ? 'Unmark' : 'Mark as done'}
				</button>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	deleteTask: (id: string) => dispatch(deleteTask(id)),
	markTask: (id: any) => dispatch(markTask(id)),
});

export default connect(null, mapDispatchToProps)(SingleTask);

import { Dispatch } from 'redux';
import TaskService from '../../services/TaskService';
import {
	TASKS_DELETE_TASK,
	TASKS_ERROR,
	TASKS_MARK_TASK,
	TASKS_SET_LIST,
} from '../constants/taskConstants';

export const setTasksList = (data: any) => async (dispatch: Dispatch) => {
	return dispatch({
		type: TASKS_SET_LIST,
		payload: data,
	});
};

export const markTask = (id: any) => async (dispatch: Dispatch) => {
	try {
		const { data } = await TaskService.mark(id);

		return dispatch({
			type: TASKS_MARK_TASK,
			payload: data,
		});
	} catch (error) {
		return dispatch({
			type: TASKS_ERROR,
			payload: 'Something went wrong.',
		});
	}
};

export const deleteTask = (id: any) => async (dispatch: Dispatch) => {
	try {
		const { data } = await TaskService.remove(id);

		return dispatch({
			type: TASKS_DELETE_TASK,
			payload: data,
		});
	} catch (error) {
		return dispatch({
			type: TASKS_ERROR,
			payload: 'Something went wrong.',
		});
	}
};

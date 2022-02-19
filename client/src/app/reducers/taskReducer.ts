import {
	TASKS_DELETE_TASK,
	TASKS_ERROR,
	TASKS_MARK_TASK,
	TASKS_SET_LIST,
} from '../constants/taskConstants';

const INITIAL_STATE = {
	list: [],
	error: null,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case TASKS_SET_LIST: {
			return {
				...state,
				list: [...action.payload],
			};
		}
		case TASKS_MARK_TASK: {
			return {
				...state,
				list: state.list.map((item: any) => {
					return item._id === action.payload._id
						? { ...item, done: action.payload.done }
						: item;
				}),
			};
		}
		case TASKS_DELETE_TASK: {
			return {
				...state,
				list: state.list.filter(
					(item: any) => item._id !== action.payload._id,
				),
			};
		}
		case TASKS_ERROR: {
			return {
				...state,
				error: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};

export default userReducer;

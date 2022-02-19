import {
	USER_ERROR,
	USER_LOGOUT_CURRENT,
	USER_SET_CURRENT,
} from '../constants/userConstants';

const INITIAL_STATE = {
	currentUser: null,
	error: null,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case USER_SET_CURRENT: {
			return {
				...state,
				currentUser: action.payload,
			};
		}
		case USER_LOGOUT_CURRENT: {
			localStorage.removeItem('token');

			return {
				...state,
				currentUser: null,
			};
		}
		case USER_ERROR: {
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

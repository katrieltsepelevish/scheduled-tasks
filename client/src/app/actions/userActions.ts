import { Dispatch } from 'redux';
import {
	USER_LOGOUT_CURRENT,
	USER_SET_CURRENT,
} from '../constants/userConstants';

export const setCurrentUser = (user: any) => async (dispatch: Dispatch) => {
	return dispatch({
		type: USER_SET_CURRENT,
		payload: user,
	});
};

export const logout = () => async (dispatch: Dispatch) => {
	return dispatch({
		type: USER_LOGOUT_CURRENT,
		payload: null,
	});
};

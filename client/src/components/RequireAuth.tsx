import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { setCurrentUser } from '../app/actions/userActions';
import User, { UserDocument } from '../app/models/userModel';
import UserService from '../services/UserService';
import { Loader } from './Loader';

type Props = {
	children: JSX.Element;
	currentUser: UserDocument;
	setCurrentUser: Function;
};

const RequireAuth: FC<Props> = ({ children, currentUser, setCurrentUser }) => {
	const [isInitiallyMounted, setIsInitiallyMounted] = useState(false);

	useEffect(() => {
		const getMe = async () => {
			const [error, user] = await UserService.me();

			if (!error && user) {
				setCurrentUser(new User(user));
			}

			if (error && error.message === 'Network Error') {
				console.error(error);
				alert('There was a network error.');
			}

			setIsInitiallyMounted(true);
		};

		if (User.isAuth()) getMe();
	}, [setCurrentUser]);

	/**
	 * Render nothing until the application fully initiated.
	 * The initalization process is fired once when the user loads the page.
	 */
	if (!isInitiallyMounted && User.isAuth()) {
		return <Loader />;
	}

	// Show the component only when the user is logged in
	// Otherwise, redirect the user to /signin page

	return User.isAuth() ? children : <Navigate to='/login' />;
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
	setCurrentUser: (user: UserDocument) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);

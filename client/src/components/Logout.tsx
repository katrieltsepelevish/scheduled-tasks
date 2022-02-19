import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../app/actions/userActions';

import UserService from '../services/UserService';

type Props = {
	logout: Function;
};

const Logout: FC<Props> = ({ logout }) => {
	const handleLogout = async () => {
		logout();

		return <Navigate to='/login' />;
	};

	return <button onClick={handleLogout}>Logout</button>;
};

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);

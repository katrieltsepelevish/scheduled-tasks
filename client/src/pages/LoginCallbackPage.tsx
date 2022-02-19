import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LoginCallbackPage = () => {
	const search = useLocation().search;

	const token = new URLSearchParams(search).get('token');

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);

			// localStorage updates (in React) after page refresh
			window.location.href = '/';
		}

		window.location.href = '/login';
	}, [token]);

	return <></>;
};

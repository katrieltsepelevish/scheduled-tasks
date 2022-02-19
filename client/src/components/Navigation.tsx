import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { UserDocument } from '../app/models/userModel';
import Logout from './Logout';

type Props = {
	currentUser: UserDocument;
};

export const Navigation: FC<Props> = ({ currentUser }) => {
	const { pathname } = useLocation();

	return (
		<div className='block text-right space-x-4 text-sm'>
			{currentUser ? (
				<div className='block space-x-3'>
					<Link
						className={pathname === '/' ? 'font-bold' : ''}
						to='/'
					>
						Home
					</Link>
					<Logout />
				</div>
			) : (
				<Link
					className={pathname === '/login' ? 'font-bold' : ''}
					to='/login'
				>
					Login
				</Link>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Navigation);

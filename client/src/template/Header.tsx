import React, { FC } from 'react';

import Navigation from '../components/Navigation';

export const Header: FC = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='block text-left text-lg font-medium'>
				ScheduledTasks
			</div>
			<Navigation />
		</div>
	);
};

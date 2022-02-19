import React, { FC } from 'react';

export const Loader: FC = () => {
	return (
		<div className='flex z-100 justify-center items-center w-screen h-screen'>
			<div className='w-40 h-40'>Loading...</div>
		</div>
	);
};

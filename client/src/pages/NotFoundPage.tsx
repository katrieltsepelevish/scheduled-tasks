import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../template/Layout';

export const NotFoundPage: FC = () => {
	return (
		<Layout>
			<div className='block py-8'>
				<h1 className='text-[64px] font-extrabold'>404</h1>
				<span className='block my-2 text-xl text-gray-700'>
					Page not found...
				</span>
				<Link
					to='/'
					className='inline-block bg-gray-900 text-white py-2 px-6 mt-4 rounded-sm hover:bg-gray-700 transition'
				>
					GO HOME
				</Link>
			</div>
		</Layout>
	);
};

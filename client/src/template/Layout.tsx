import React, { FC } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: FC = ({ children }) => {
	return (
		<main className='block h-full max-w-[500px] w-full mx-auto p-2'>
			<Header />
			<div className='space-y-4 text-center'>{children}</div>
			<Footer />
		</main>
	);
};

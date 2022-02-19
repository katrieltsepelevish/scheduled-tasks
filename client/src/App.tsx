import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import { LoginPage } from './pages/LoginPage';
import { LoginCallbackPage } from './pages/LoginCallbackPage';
import { NotFoundPage } from './pages/NotFoundPage';

import RequireAuth from './components/RequireAuth';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<RequireAuth>
							<HomePage />
						</RequireAuth>
					}
				/>
				<Route
					path='/add'
					element={
						<RequireAuth>
							<AddTaskPage />
						</RequireAuth>
					}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/login/callback' element={<LoginCallbackPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

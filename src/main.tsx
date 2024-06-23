import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Layout/Header/Header.tsx';
import Home from './pages/home/Home.tsx';
import Error from './pages/Error/Error.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Header />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка</>}>
						<Home />
					</Suspense>
				),
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

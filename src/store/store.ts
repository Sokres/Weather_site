import { configureStore } from '@reduxjs/toolkit';
import { wetherReducer } from './weather.slice';

export const store = configureStore({
	reducer: {
		weather: wetherReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

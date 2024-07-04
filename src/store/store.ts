import { configureStore } from '@reduxjs/toolkit';
import { wetherReducer } from './weather.slice';
import { selectWeatherTen } from './weatherTen.slice';

export const store = configureStore({
	reducer: {
		weather: wetherReducer,
		weatherTen: selectWeatherTen,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

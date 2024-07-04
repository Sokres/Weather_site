import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherTen } from '../interface/wetherTen.interface';

export interface CurrentWeatherTen {
	weather: WeatherTen | null;
	isLoading: boolean;
	response: Response;
}
export interface Response {
	status: number;
	message: string;
}
const url = import.meta.env.VITE_URL_WEATHER;
const key = import.meta.env.VITE_KEY_WEATHER;

const initialState: CurrentWeatherTen = {
	weather: null,
	isLoading: false,
	response: {
		status: 0,
		message: '',
	},
};
export const getCurrentWeatherTen = createAsyncThunk<WeatherTen, string>(
	'weatherTen/get',
	async (city: string) => {
		console.log(1);
		const { data } = await axios.get<WeatherTen>(
			`${url}/forecast?q=${city},ru&appid=${key}&cnt=4&units=metric&lang=ru`
		);

		console.log(data);
		return data;
	}
);
export const weatherTenSlice = createSlice({
	name: 'weathersTen',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeatherTen.fulfilled, (state, action) => {
			state.weather = action.payload;
		});
	},
});
export const selectWeatherTen = weatherTenSlice.reducer;
export const weatherTenAction = weatherTenSlice.actions;

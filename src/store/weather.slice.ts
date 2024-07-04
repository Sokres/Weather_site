import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherObj } from '../interface/wether.interface';

export interface CurrentWeather {
	weather: WeatherObj | null;
	isLoading: boolean;
	response: Response;
}
export interface Response {
	status: number;
	message: string;
}
const url = import.meta.env.VITE_URL_WEATHER;
const key = import.meta.env.VITE_KEY_WEATHER;

const initialState: CurrentWeather = {
	weather: null,
	isLoading: false,
	response: {
		status: 0,
		message: '',
	},
};
export const getCurrentWeather = createAsyncThunk<WeatherObj, string>(
	'weather/get',
	async (city: string) => {
		const { data } = await axios.get<WeatherObj>(
			`${url}weather?q=${city},ru&appid=${key}&units=metric&lang=ru`
		);
		return data;
	}
);
export const weatherSlice = createSlice({
	name: 'weathers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
			state.weather = action.payload;
		});
	},
});
export const wetherReducer = weatherSlice.reducer;
export const weatherAction = weatherSlice.actions;

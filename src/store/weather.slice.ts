import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Weather } from '../interface/wether.interface';

export interface CurrentWeather {
	weather: Weather | null;
	isLoading: boolean;
	response: Response;
}
export interface Response {
	status: number;
	message: string;
}
const initialState: CurrentWeather = {
	weather: null,
	isLoading: false,
	response: {
		status: 0,
		message: '',
	},
};
export const getCurrentWeather = createAsyncThunk<Weather, string>(
	'weather/get',
	async (city: string) => {
		const { data } = await axios.get<Weather>(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e921c467ccdff971e7699317651dbd0b`
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
			console.log(state.weather);
		});
	},
});
export const wetherReducer = weatherSlice.reducer;
export const weatherAction = weatherSlice.actions;

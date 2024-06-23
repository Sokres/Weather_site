import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../../store/weather.slice';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';

const BoardInfo = () => {
	const dispach = useDispatch<AppDispatch>();
	const dataWether = useSelector((s: RootState) => s.weather.weather);
	const getData = async () => {
		await send('London');
	};
	useEffect(() => {
		dispach(getCurrentWeather('London'));
	}, []);
	const send = async (city: string) => {
		dispach(getCurrentWeather(city));
	};
	return (
		<div>
			<button onClick={getData}>Получить данные</button>
		</div>
	);
};

export default BoardInfo;

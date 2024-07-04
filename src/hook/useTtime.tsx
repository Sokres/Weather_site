import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export interface timeArrow {
	time: string;
	hour: number;
	monthNum: number;
	hourSun: string;
	dayAndMount: string;
	dayTxt: string;
}

export interface Seasons {
	link: string;
	data: string;
	day?: boolean;
}
export const nowtime = (
	timestamp: number | undefined
): timeArrow | undefined => {
	if (timestamp === undefined) return undefined;

	const date = new Date(timestamp * 1000);
	const months = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря',
	];
	const days = ['Вск.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
	const year = date.getFullYear();
	const month = months[date.getMonth()];
	const monthNum = date.getMonth();
	const day = date.getDate();
	const dayTxt = days[date.getDay()];
	const hour = date.getHours();
	const minut = date.getMinutes();
	const time = `${day} ${month} ${year} - ${hour}:${
		minut !== 0 ? minut : '0' + minut
	}`;
	const hourSun = `${hour}: ${minut}`;
	const dayAndMount = `${day}: ${monthNum}`;
	return { time, hour, monthNum, hourSun, dayAndMount, dayTxt };
};
const useTtime = (): [Seasons, string | undefined] => {
	const season: Seasons = {
		link: '',
		data: '',
		day: true,
	};

	const computeSeason = (data: timeArrow | undefined): Seasons => {
		if (data) {
			if (
				data.monthNum >= 5 &&
				data.monthNum <= 7 &&
				data.hour >= 7 &&
				data.hour <= 21
			) {
				season.day = true;
				season.link = './img/summer_day.jpg';
				season.data = '#ADE0EE';
			} else if (
				data.monthNum >= 5 &&
				data.monthNum <= 7 &&
				(data.hour < 7 || data.hour > 21)
			) {
				season.link = './img/summer_night.jpg';
				season.data = '#4262D9';
				season.day = false;
			} else if (
				data.monthNum >= 2 &&
				data.monthNum <= 4 &&
				data.hour >= 7 &&
				data.hour <= 21
			) {
				season.link = './img/spring_day.jpg';
				season.data = '#b7e5d2';
				season.day = true;
			} else if (
				data.monthNum >= 2 &&
				data.monthNum <= 4 &&
				(data.hour < 7 || data.hour > 21)
			) {
				season.link = './img/spring_night.jpg';
				season.data = '#b7e5d2';
				season.day = false;
			} else if (
				data.monthNum >= 8 &&
				data.monthNum <= 10 &&
				data.hour >= 7 &&
				data.hour <= 21
			) {
				season.link = './img/autumn_day.jpg';
				season.data = '#FEF1E0';
				season.day = true;
			} else if (
				data.monthNum >= 8 &&
				data.monthNum <= 10 &&
				(data.hour < 7 || data.hour > 21)
			) {
				season.link = './img/autumn_night.jpg';
				season.data = '#3884E1';
				season.day = false;
			} else if (
				(data.monthNum >= 0 && data.monthNum <= 1) ||
				(data.monthNum == 11 && data.hour >= 7 && data.hour <= 21)
			) {
				season.link = './img/winter_day.jpg';
				season.data = '#B1DEFD';
				season.day = true;
			} else {
				season.link = './img/winter_night.jpg';
				season.data = '#0156B3';
				season.day = false;
			}
		} else {
			season.link = 'упс';
		}

		return season;
	};

	const dataWeather = useSelector((s: RootState) => s.weather);
	const timeLocal = Math.floor(new Date().getTime() / 1000);

	const times = () => {
		if (dataWeather.weather?.dt) {
			return nowtime(dataWeather.weather.dt);
		} else {
			return nowtime(timeLocal);
		}
	};

	const timesCity = times();
	const time = timesCity?.time;
	const currentSeason = computeSeason(timesCity);

	return [currentSeason, time];
};

export default useTtime;

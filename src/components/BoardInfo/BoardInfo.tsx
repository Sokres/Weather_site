import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather } from '../../store/weather.slice';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import useTtime, { nowtime } from '../../hook/useTtime';

export interface timeArrow {
	time: string;
	hour: number;
	monthNum: number;
}

const BoardInfo = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [season, time] = useTtime();
	const dataWeather = useSelector((s: RootState) => s.weather);
	const sunrise = nowtime(dataWeather.weather?.sys.sunrise);
	const sunset = nowtime(dataWeather.weather?.sys.sunset);
	useEffect(() => {
		dispatch(getCurrentWeather('Москва'));
	}, [dispatch]);

	return (
		<main
			style={{
				backgroundImage: `url(${season.link})`,
				color: `${season.day ? '#272727' : '#F7F7F7'}`,
			}}
			className="board_weather"
		>
			<div className="board_weather__info">
				<div className="board_weather__wraper">
					<h1 className="board_weather__title">{dataWeather.weather?.name}</h1>
					<ul className="board_weather__day_length ">
						<li className="box-img-text sunrise_a_sunset__box ">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/sunrise.svg`}
								alt="Иконка захода"
								className="box-img-text__img "
							/>
							<div className="box-img-text__wrap">
								<span className="box-img-text__info">Восход солнца</span>
								<span className="box-img-text__info">{sunrise?.hourSun}</span>
							</div>
						</li>
						<li className="box-img-text ">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/sunset.svg`}
								alt="Иконка захода"
								className="box-img-text__img "
							/>
							<div className="box-img-text__wrap ">
								<span className="box-img-text__info ">Заход солнца</span>
								<span className="box-img-text__info ">{sunset?.hourSun}</span>
							</div>
						</li>
					</ul>
				</div>
				<div className="board-wether__wraper-temp">
					<p className="board_weather__time">Сейчас: {time}</p>
					<ul className="board_weather__temp_data">
						<li className="board_weather__temp temp">
							<div className="temp__info">
								{Math.round(dataWeather.weather?.main.temp ?? 0)}°
							</div>
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/${
									dataWeather.weather?.weather[0].icon
								}.svg`}
								alt="Погода сейчас"
								className="temp__img"
							/>
						</li>
						<li className="board_weather__info_now info_weather">
							<span className="info_weather__clouds">
								{dataWeather.weather?.weather[0].description}
							</span>
							<span className="info_weather__felt">
								Ощущается как{' '}
								{Math.round(dataWeather.weather?.main.feels_like ?? 0)}°
							</span>
						</li>
					</ul>
					<ul className="board_weather__info-alt side-info">
						<li className="box-img-text">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/pressure.svg`}
								alt="значок давления"
								className="box-img-text__img "
							/>
							<div className="box-img-text__wrap">
								<span className="box-img-text__info ">Давление</span>
								<span className="box-img-text__info ">
									{dataWeather.weather?.main.grnd_level} мм рт. ст.
								</span>
							</div>
						</li>
						<li className="box-img-text">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/humidity.svg`}
								alt="значок скорости ветра"
								className="box-img-text__img "
							/>
							<div className="box-img-text__wrap">
								<span className="box-img-text__info">Влажность</span>
								<span className="box-img-text__info">
									{dataWeather.weather?.main.humidity}%
								</span>
							</div>
						</li>
						<li className="box-img-text">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/ifrain.svg`}
								alt="значок влажности"
								className="box-img-text__img"
							/>
							<div className="box-img-text__wrap">
								<span className="box-img-text__info">Вероятность дождя</span>
								<span className="box-img-text__info">
									{0 ?? dataWeather.weather?.rain['1h']}
								</span>
							</div>
						</li>
						<li className="box-img-text">
							<img
								src={`./img/icon/${season.day ? 'day' : 'night'}/wind.svg`}
								alt="значок влажности"
								className="box-img-text__img"
							/>
							<div className="box-img-text__wrap">
								<span className="box-img-text__info">Скорость ветра</span>
								<span className="box-img-text__info">
									{dataWeather.weather?.wind.speed} м/c
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
};

export default BoardInfo;

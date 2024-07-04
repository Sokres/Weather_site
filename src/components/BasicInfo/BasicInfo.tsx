import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import useTtime, { nowtime } from '../../hook/useTtime';
import { useEffect } from 'react';
import { getCurrentWeatherTen } from '../../store/weatherTen.slice';

const BasicInfo = () => {
	const [season] = useTtime();

	const dataWeather = useSelector((s: RootState) => s.weatherTen);
	console.log(dataWeather.weather?.list);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getCurrentWeatherTen('Москва'));
	}, [dispatch]);

	return (
		<section className="weather_10_day">
			<h2 className="weather_10_day__title">Прогноз на 10 дней</h2>
			<ul className="weather_10_day__container">
				{dataWeather.weather?.list.map((i) => {
					const date = nowtime(i.dt);
					return (
						<li key={i.dt} className="weather_10_day__container day_weather">
							<h3 className="day_weather__title">
								<span className='"day_weather__title--info'>
									{date?.dayTxt}
								</span>
								<span className='"day_weather__title--info'>{date?.time}</span>
							</h3>
							<img src="./img/icon/night/01d.svg" alt="Значок погоды" />
							<ul className="day_weather__temp">
								<li className="day_weather__temp--day">
									{Math.round(i.main.temp ?? 0)}°
								</li>
								<li className="day_weather__temp--night">
									{Math.round(i.main.temp_min ?? 0)}
								</li>
							</ul>
							<p className="day_weather__felt">
								ощущается как {Math.round(i.main.feels_like ?? 0)}°
							</p>

							<ul className="board_weather__info-alt side-info">
								<li className="box-img-text">
									<img
										src={`./img/icon/${
											season.day ? 'day' : 'night'
										}/pressure.svg`}
										alt="значок давления"
										className="box-img-text__img "
									/>
									<div className="box-img-text__wrap">
										<span className="box-img-text__info ">Давление</span>
										<span className="box-img-text__info ">
											{i.main.grnd_level} мм рт. ст.
										</span>
									</div>
								</li>
								<li className="box-img-text">
									<img
										src={`./img/icon/${
											season.day ? 'day' : 'night'
										}/humidity.svg`}
										alt="значок скорости ветра"
										className="box-img-text__img "
									/>
									<div className="box-img-text__wrap">
										<span className="box-img-text__info">Влажность</span>
										<span className="box-img-text__info">
											{i.main.humidity}%
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
											{i.wind.speed} м/c
										</span>
									</div>
								</li>
							</ul>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default BasicInfo;

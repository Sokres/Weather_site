import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import useTtime, { nowtime } from '../../hook/useTtime';
import { useEffect } from 'react';
import { getCurrentWeatherTen } from '../../store/weatherTen.slice';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const BasicInfo = () => {
	const [season] = useTtime();

	const dataWeather = useSelector((s: RootState) => s.weatherTen);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getCurrentWeatherTen('Москва'));
	}, [dispatch]);

	return (
		<section
			style={{
				backgroundColor: season.data,
				color: `${season.day ? '#272727' : '#F7F7F7'}`,
			}}
			className="weather_10_day"
		>
			<h2 className="weather_10_day__title">Прогноз на 36 часов</h2>
			<Swiper
				breakpoints={{
					// when window width is >= 320px
					320: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					// when window width is >= 480px
					480: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					// when window width is >= 640px
					640: {
						slidesPerView: 4,
						spaceBetween: 40,
					},
				}}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination, Navigation]}
				className="weather_10_day__container"
			>
				{dataWeather.weather?.list.map((i) => {
					const date = nowtime(i.dt);
					return (
						<SwiperSlide
							key={i.dt}
							className="weather_10_day__item day_weather"
						>
							<h3 className="day_weather__title">
								<span className='"day_weather__title--info'>
									{date?.dayTxt}
								</span>
								<span className='"day_weather__title--info'>{date?.time}</span>
							</h3>

							<div className="day_weather__temp">
								<span className="day_weather__temp--num">
									{Math.round(i.main.temp_min ?? 0)}
								</span>
								<img
									className="day_weather__img"
									src="./img/icon/night/01d.svg"
									alt="Значок погоды"
								/>
							</div>
							<p className="day_weather__felt">
								ощущается как {Math.round(i.main.feels_like ?? 0)}°
							</p>

							<ul className=" side-info">
								<li className="box-img-text">
									<img
										src={`./img/icon/${
											season.day ? 'day' : 'night'
										}/pressure.svg`}
										alt="значок давления"
										className="box-img-text__img"
									/>
									<div className="box-img-text__wrap">
										<span className="box-img-text__info">Давление</span>
										<span className="box-img-text__info">
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
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
};

export default BasicInfo;

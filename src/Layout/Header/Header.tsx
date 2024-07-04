import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getCurrentWeather } from '../../store/weather.slice';
import { StateOption } from '../../interface/Select.intrrface';
import { city } from '../../lib/City';
import useTtime from '../../hook/useTtime';
import { getCurrentWeatherTen } from '../../store/weatherTen.slice';

const Header = () => {
	const options = city;
	const dispatch = useDispatch<AppDispatch>();
	const [value, setValue] = useState<StateOption | null>(null);
	const [season] = useTtime();

	useEffect(() => {
		if (value?.value) {
			dispatch(getCurrentWeather(value.value));
			dispatch(getCurrentWeatherTen(value.value));
		}
	}, [value, dispatch]);

	const styles: StylesConfig<StateOption> = {
		control: (styles) => ({
			...styles,
			backgroundColor: 'rgba(255, 255, 255, 0.56)',
			borderRadius: '20px',
		}),
		dropdownIndicator: (styles) => ({
			...styles,
		}),
		option: (styles, { isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: isDisabled
				? undefined
				: isSelected
				? '#43FF83'
				: isFocused
				? '#D4FFE3'
				: undefined,
			cursor: isDisabled ? 'not-allowed' : 'default',
		}),
		menu: (styles) => ({
			...styles,
			borderBottomRightRadius: '10px',
			borderBottomLeftRadius: '10px',
		}),
	};

	return (
		<>
			<header style={{ backgroundColor: season.data }} className={'header'}>
				<img
					src={`./img/Logo/logo_${season.day ? 'day' : 'night'}.svg`}
					alt="Логотип"
					className="header_logo"
					width="100"
				/>
				<Select
					defaultValue={options[0]}
					onChange={(newValue) =>
						setValue(newValue as SingleValue<StateOption>)
					}
					noOptionsMessage={() => 'Город не найден'}
					className="header_select"
					options={options}
					styles={styles}
					placeholder={'Выберите город'}
				/>
			</header>
			<Outlet />
		</>
	);
};

export default Header;

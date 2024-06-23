import React from 'react';
import { Outlet } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import { StateOption } from '../../interface/Select.intrrface';

const Header = () => {
	const options: StateOption[] = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	const styles: StylesConfig<StateOption> = {
		control: (styles) => ({
			...styles,
			// position: 'relative',
			backgroundColor: 'rgba(255, 255, 255, 0.56)',
			borderRadius: '20px',
			// paddingLeft: '30px',
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
			<header className="header">
				<img
					src="./img/Logo/Logo.svg"
					alt="Логотип"
					className="header_logo"
					width="100"
				/>
				<Select
					noOptionsMessage={() => 'Город не наеден'}
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

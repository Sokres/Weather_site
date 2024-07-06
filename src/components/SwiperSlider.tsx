// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const SwiperSlider = () => {
	return (
		<>
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
				className="mySwiper"
			>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
				<SwiperSlide>Slide 6</SwiperSlide>
				<SwiperSlide>Slide 7</SwiperSlide>
				<SwiperSlide>Slide 8</SwiperSlide>
				<SwiperSlide>Slide 9</SwiperSlide>
			</Swiper>
		</>
	);
};

export default SwiperSlider;

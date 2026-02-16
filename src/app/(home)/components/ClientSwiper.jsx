"use client";

import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo1 from '@/assets/images/logo/1.png';
import logo2 from '@/assets/images/logo/2.png';
import logo3 from '@/assets/images/logo/3.png';
import logo4 from '@/assets/images/logo/4.png';
import logo5 from '@/assets/images/logo/5.png';
import 'swiper/css';
const ClientSwiper = () => {
  const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo1, logo2, logo3, logo4, logo5];
  return <section className="py-14">
      <div className="container" data-aos="zoom-in" data-aos-easing="ease" data-aos-duration={1000}>
        <div className="mt-5">
          {/* Swiper */}
          <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} spaceBetween={30} centeredSlides loop navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }} autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }} breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }} className="logo-swiper">
            {clientLogos.map((logo, idx) => <SwiperSlide key={idx}>
                <Image src={logo} alt='logo' />
              </SwiperSlide>)}
            <div className="swiper-pagination" />
          </Swiper>
        </div>
      </div>
    </section>;
};
export default ClientSwiper;
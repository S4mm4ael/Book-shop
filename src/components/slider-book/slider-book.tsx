import React, { useEffect, useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import noCover from '../../assets/img/book-cover-none.jpg';
import { SliderProps } from '../../shared/types.interface';

import styles from './slider-book.module.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export function SliderBook({ isDesktopSize, images }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  function renderCoversSlider(className: string, height: number, thumb: boolean) {
    if (images && images.length === 0) {
      return (
        <SwiperSlide data-test-id={thumb && 'slide-mini'} className={className}>
          <img src={noCover} alt='cover' height={`${height}px`} />
        </SwiperSlide>
      );
    }
    if (!images) {
      return (
        <SwiperSlide data-test-id={thumb && 'slide-mini'} className={className}>
          <img src={noCover} alt='cover' height={`${height}px`} />
        </SwiperSlide>
      );
    }

    return images.map((el) => (
      <SwiperSlide key={Math.random()} data-test-id={thumb && 'slide-mini'} className={className}>
        {el && <img src={`https://strapi.cleverland.by${el.url}`} alt='cover' height={`${height}px`} />}
      </SwiperSlide>
    ));
  }

  return (
    <React.Fragment>
      {' '}
      {isDesktopSize ? (
        <React.Fragment>
          <Swiper
            data-test-id='slide-big'
            height={300}
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.SliderBook__slider}
          >
            {renderCoversSlider(styles.SliderBook__sliderItem, 593, false)}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            height={5}
            spaceBetween={20}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.SliderBook__thumbSlider}
          >
            {renderCoversSlider(styles.SliderBook__thumbItem, 86, true)}
          </Swiper>
        </React.Fragment>
      ) : (
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className={styles.SliderBook__slider_mobile}
          data-test-id='slide-big'
        >
          {renderCoversSlider(styles.SliderBook__sliderItem, 198, false)}
        </Swiper>
      )}
    </React.Fragment>
  );
}

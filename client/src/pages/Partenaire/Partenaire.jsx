import React, { useState } from 'react';
import "./css.css";
import Titleanimated from '../../components/Title/Titleanimated';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import AnimatedCursor from 'react-animated-cursor';

export default function Partenaire() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleMouseEnter = () => {
    if (swiperInstance) swiperInstance.autoplay.stop();
  };

  const handleMouseLeave = () => {
    if (swiperInstance) swiperInstance.autoplay.start();
  };

  return (
    <div className='bg-gray-100 py-8 h-[70vh] m-auto'>
      <div className="mb-8">
        <h6 className="bg-slate-950 text-white md:w-[320px] mx-auto p-2">
          <Titleanimated text="Nos Partenaires" />
        </h6>
      </div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {[
          'newbridge.png',
          'coperpharma.png',
          'pharma5.png',
          'sunpharma.png',
          'bottu.png',
          'axispharma.png',
          'hikma.png',
          'afriqaphar.png',
          'spimago.png',
          'tradipharmaroc.jpeg',
        ].map((logo, index) => (
          <SwiperSlide key={index} className=" w-[70%] md:w-1/3 flex justify-center items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href="#" className="block hover:href='#' h-40">
              <img
                src={`assets/logos/${logo}`}
                className="w-full h-auto max-h-[150px]  mx-auto rounded-lg shadow-lg object-contain"
                alt={`Logo ${index + 1}`}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatedCursor
        innerSize={20}
        outerSize={20}
        color='234, 38, 29' // use #ea261d
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          'a', "p", "h3", "img", "span",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
    </div>
  );
}


import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"



// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation
} from 'swiper/core';
import SliderCard from "./SliderCard";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Slider(props) {
    return (
        <div className="slider-border">
        <div className= "mt-3">
            <hr className="line"/>
            <h2 className="separator-title twice">{props.title}</h2>
            <Swiper slidesPerView={1} spaceBetween={5} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true} 
            navigation={true}
            breakpoints={{
                "640": {
                  "slidesPerView": 2,
                  "spaceBetween": 5,
                  "slidesPerGroup:":2
                },
                "768": {
                  "slidesPerView": 4,
                  "spaceBetween": 10,
                  "slidesPerGroup:":4

                },
                "1024": {
                  "slidesPerView": 5,
                  "spaceBetween": 10,
                  "slidesPerGroup:":5
                }
              }}
            className="mySwiper">
                {
                    props.events.map(event => {
                        return (
                            <SwiperSlide>
                                <SliderCard event={event} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
        </div>
    )
}


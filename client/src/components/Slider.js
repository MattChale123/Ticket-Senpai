import React from 'react';
import SliderCard from './SliderCard';

export default function Slider(props) {

    return (
        <div className="separator">
            <h2 className="separator-title twice">Concerts</h2>
            <div>
                <hr className="line" />
                <div className="slider overflow-auto">
                    <SliderCard />
                </div>
                <hr className="line" />
            </div>
        </div>
    )
}

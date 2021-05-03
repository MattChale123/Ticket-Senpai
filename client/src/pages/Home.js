import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CitySlider from '../components/CitySlider';

export default function Home() {
    const user = useSelector((state) => state.user);
  
 
    
    return (
        <div className="home-container">
            {user? (
                <CitySlider city = {user.city} state= {user.state}/>
            ):(
                <CitySlider city="atlanta" state="GA"/>
            )
        }
        </div>
    )
}

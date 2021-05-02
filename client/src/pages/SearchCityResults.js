import React from 'react'
import { useLocation, useParams } from 'react-router'
import CitySlider from '../components/CitySlider'

export default function SearchCityResults() {
    const location = useLocation()
    const city = location.state.city
    const state = location.state.state
    

    return (
        <div>
            <CitySlider city={city} state={state}/>
        </div>
    )
}

import React from 'react'
import { useParams } from 'react-router'
import CitySlider from '../components/CitySlider'

export default function SearchCityResults() {
    const { param } = useParams()
    

    return (
        <div>
            <CitySlider city={param}/>
        </div>
    )
}

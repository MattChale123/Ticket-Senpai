import React, { useEffect, useState } from 'react'
import NoResultsFound from './NoResultsFound'
import Slider from './Slider'

export default function CitySlider(props) {
    const [events, setEvents] = useState({
        music: [],
        sports: [],
        comedy: [],
        theater: []
    })

    const city = props.city.charAt(0).toUpperCase() + props.city.slice(1)
    console.log(city)

    useEffect(() => {
        fetchSG()
    }, [props.city])

    const fetchSG = () => {
        const types = [
            "concert", //music
            "sports", //sports
            "comedy",//comedy
            "theater"//classical
        ]
        const promiseEvents = types.map(type => {
            return fetch(`https://api.seatgeek.com/2/events?page=1&per_page=20&venue.city=${props.city}&taxonomies.name=${type}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
                .then(res => res.json())
                .then(data => {
                    return data.events
                })
        })

        Promise.all(promiseEvents).then(results => {
            setEvents({
                ...events,
                music: results[0],
                sports: results[1],
                comedy: results[2],
                theater: results[3]
            })
        })
    }



    return (
        <div className="home-container">
            {events.music.length ===0? (
                <NoResultsFound />
            ):(
                <>
                <h1 style ={{textAlign:"center"}} >Events in {city}</h1>
                
                <Slider events={events.music} title = "Concerts"/>
                <Slider events={events.sports} title= "Sports" />
                <Slider events={events.comedy} title = "Comedy"/>
                <Slider events={events.theater} title ="Theater" />
                </>
            )}
        </div>
    )
}

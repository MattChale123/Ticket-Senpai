import React, { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import Slider from '../components/Slider';

export default function Home() {
    const [events, setEvents] = useState({
        music: [],
        sports: [],
        comedy: [],
        theater: []
    })

    useEffect(() => {
        fetchSG()
    }, [])

    const fetchSG = () => {
        const types = [
            "concert", //music
            "sports", //sports
            "comedy",//comedy
            "theater"//classical
        ]
        const promiseEvents = types.map(type => {
            return fetch(`https://api.seatgeek.com/2/events?page=1&venue.city=atlanta&taxonomies.name=${type}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
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
            {/* <div>{events.music[0].title}</div> */}
            <Slider events = {events.music} title= "Concert"/>
            <Slider events = {events.sports} title= "Sports"/>
            <Slider events = {events.comedy} title= "Comedy"/>
            <Slider events = {events.theater} title= "Theater"/>
        </div>
    )
}

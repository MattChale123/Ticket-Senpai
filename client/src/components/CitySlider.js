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
    
    const [searchTitle, setSearchTitle] = useState("")
    const [searchError, setSearchError] = useState("")


    useEffect(() => {
        fetchSG()
    }, [props.state, props.city])

    const fetchSG = () => {
        const types = [
            "concert", //music
            "sports", //sports
            "comedy",//comedy
            "theater"//classical
        ]
        const promiseEvents = types.map(type => {
            setSearchError("")
            return fetch(`https://api.seatgeek.com/2/events?page=1&per_page=20&venue.city=${props.city}&venue.state=${props.state}&taxonomies.name=${type}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
                .then(res => res.json())
                .then(data => {
                    if (data.events.length ===0){
                        return fetch(`https://api.seatgeek.com/2/events?page=1&per_page=20&venue.state=${props.state}&taxonomies.name=${type}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
                        .then(res => res.json())
                        .then(data => {
                            setSearchTitle(props.state)
                            setSearchError(`No events found in ${props.city}, ${props.state}. Defaulted to events in ${props.state}.`)
                            return data.events
                        })
                    }
                    else{
                        setSearchTitle(props.city)
                        return data.events
                    }
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
                <h1 className="home-city-header contentH1" style ={{textAlign:"center"}} >Events in {searchTitle.charAt(0).toUpperCase() + searchTitle.slice(1)}</h1>
                <div style={{color:"red", textAlign:"center"}}>{searchError}</div>
      
                <Slider events={events.music} title = "Concerts"/>
                <Slider events={events.sports} title= "Sports" />
                <Slider events={events.comedy} title = "Comedy"/>
                <Slider events={events.theater} title ="Theater" />
                </>
            )}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchTM()
    }, [])

    const fetchTM = () => {
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&segmentId=KZFzniwnSyZfZ7v7nJ&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e")
            .then(res => res.json())
            .then(data => {
                // setEvents(data.embedded.events.splice(0,4))
                console.log(data._embedded.events)
            })
    }

    return (
    <div>

    </div>
        // <Row>
        //     {
        //         events.map(event => {
        //           return  <Col> <img src={event.images[2].url} alt=" "></img> </Col>                    
        //         })
        //     }
        // </Row>
    )
}

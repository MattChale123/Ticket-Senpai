import React, { useEffect, useState } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import CardTN from '../components/CardTN'
import { Link } from 'react-router-dom'
import SeatGeek from '../components/SeatGeek'

export default function Home() {
    const [events, setEvents] = useState({
        music: [],
        sports: [],
        comedy: [],
        classical: []
    })

    useEffect(() => {
        fetchTM()
    }, [])

    const fetchTM = () => {
        const urls = [
            "KZFzniwnSyZfZ7v7nJ", //music
            "KZFzniwnSyZfZ7v7nE", //sports
            "KnvZfZ7vAe1",//comedy
            "KnvZfZ7v7nJ"//classical
        ]
        const promiseEvents = urls.map(url => {
            return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationId=${url}&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
                .then(res => res.json())
                .then(data => {
                    return data._embedded.events.splice(0, 4)
                })
        })

        Promise.all(promiseEvents).then(results => {
            setEvents({
                ...events,
                music: results[0],
                sports: results[1],
                comedy: results[2],
                classical: results[3]
            })
        })
    }

    return (
        <Container>
            <Row className="mt-5" >
                <Col>
                    <h1>Welcome Kohai</h1>
                </Col>
            </Row>
            <Row >
                <Col>
                    <Jumbotron>
                        <Row>
                            <Col sm={6}>
                                <Link to= "/events" >
                                    <h2>Music</h2>
                                    <Row className="home_row">
                                        <CardTN events={events.music} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} >
                                <Link>
                                    <h2>Sports</h2>
                                    <Row className="home_row" >
                                        <CardTN events={events.sports} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} className="mt-3">
                                <Link>
                                    <h2>Comedy</h2>
                                    <Row className="home_row" >
                                        <CardTN events={events.comedy} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} className="mt-3">
                                <Link>
                                    <h2>Classical</h2>
                                    <Row className="home_row" >
                                        <CardTN events={events.classical} />
                                    </Row>
                                </Link>
                            </Col>
                        </Row>

                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

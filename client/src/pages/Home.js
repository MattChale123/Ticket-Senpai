import React, { useEffect, useState } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import CardTN from '../components/CardTN'
import { Link } from 'react-router-dom'
import useStubHub from '../hooks/useStubHub'

export default function Home() {
    const [events, setEvents] = useState({
        music: [],
        sports: [],
        comedy: [],
        classical: []
    })

    const stubHub = useStubHub()

    useEffect(() => {
        fetchTM()
        stubHub.searchMusicByCity('tampa')
        .then(data => {
            // console.log(data)
        })
    }, [])

    const fetchTM = () => {
        const urls = [
            "KZFzniwnSyZfZ7v7nJ", //music
            "KZFzniwnSyZfZ7v7nE", //sports
            "KnvZfZ7vAe1",//comedy
            "KnvZfZ7v7nJ"//classical
        ]
        const promiseEvents = urls.map(url => {
            return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&classificationId=${url}&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
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
                                <Link to= "/events/concert" >
                                    <h2>Music</h2>
                                    <Row className="home_row">
                                        <CardTN events={events.music} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} >
                                <Link to = "/events/sports">
                                    <h2>Sports</h2>
                                    <Row className="home_row" >
                                        <CardTN events={events.sports} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} className="mt-3">
                                <Link to ="events/comedy">
                                    <h2>Comedy</h2>
                                    <Row className="home_row" >
                                        <CardTN events={events.comedy} />
                                    </Row>
                                </Link>
                            </Col>
                            <Col sm={6} className="mt-3">
                                <Link to = "/events/classical">
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
        <Container>
            <p className="copyright">&#169; Copyright 2021 Ticket-Senpai. All Rights Reserved.</p>
        </Container>
        </Container>
    )
}

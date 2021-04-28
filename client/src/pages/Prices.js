import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import SeatGeekCard from '../components/SeatGeekCard'
import StubHubCard from '../components/StubHubCard'
import TicketMasterCard from '../components/TicketMasterCard'
import useStubHub from '../hooks/useStubHub'

export default function Prices(props) {
    const location = useLocation()
    const [TicketMaster, setTicketMaster] = useState([])
    const [stubHubInfo, setStubHubInfo] = useState([])
    const stubHub = useStubHub()
    const event = location.state.event


    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${event.venue.city}&size=1&keyword=${event.title.replace(/ *\([^)]*\) */g, "")}&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return null
            })
            .then(data => {
                if (data.page.totalElements === 0) {
                    setTicketMaster(data)
                }
                else {
                    setTicketMaster(data._embedded.events[0])
                }
            })
            .catch(error => {
                console.log(error)
                return null
            })



        stubHub.searchEvents(event.venue.city, event.title.replace(/ *\([^)]*\) */g, ""))
            .then(data => {
                if (data.numFound === 0) {
                    setStubHubInfo(data)
                }
                else {
                    setStubHubInfo(data.events[0])
                }
            })
            .catch(error => {
                console.log(error)
                return null
            })
    }




    return (
        <Container style={{ textAlign: "center" }}>
            <Row >
                <Col className="mt-3">
                    <h1> Prices for {event.title} in {event.venue.city} {event.venue.state}</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <SeatGeekCard event={event} />
                </Col>
                <Col sm={4}>
                    <StubHubCard event={stubHubInfo} />
                </Col>
                <Col sm={4}>
                    <TicketMasterCard event={TicketMaster} />
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <h1>For Matt</h1>
                    <div>
                        address: {event.venue.address}
                        <br/>
                        city: {event.venue.city}
                        <br/>
                        zipcode: {event.venue.postal_code}
                        <br/>
                        state: {event.venue.state}
                    </div>
                </Col>
            </Row>


        </Container>

    )
}

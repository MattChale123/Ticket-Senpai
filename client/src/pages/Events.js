import React, { useEffect, useState } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import TicketMasterCard from '../components/TicketMasterCard'
import useStubHub from '../hooks/useStubHub'

export default function Events() {
    const [ticketMaster, setTicketMaster] = useState([])
    const [stubHubInfo, setStubHubInfo] = useState([])
    const stubHub = useStubHub()

    useEffect(() => {
        fetchTicketMaster()
        stubHub.searchMusicByCity('atlanta')
        .then(data => {
            // console.log(data)
            setStubHubInfo(data)
            console.log(data)
        })
        stubHub.searchPerformers('weezer')
        .then(data => {
            console.log(data)
        })
    }, [])

    const fetchTicketMaster = async () => {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&size=4&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
            .then(res => res.json())
            .then(data => {
                return data._embedded.events
            })
        setTicketMaster(response)
    }

    return (
        <Container>
            <h1>Music Events in Atlanta</h1>

            <Row>

                <Col>
                    {
                        
                            ticketMaster.map(event => {
                                // console.log(event)
                                return <TicketMasterCard event={event} />
                            })
                    }
                </Col>
                <Col>
                    <Jumbotron>
                    </Jumbotron>
                </Col>
                <Col>
                    <Jumbotron>
                    </Jumbotron>
                </Col>
            </Row>


        </Container>


    )
}

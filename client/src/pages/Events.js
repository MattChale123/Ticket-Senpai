import React, { useEffect, useState } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import SeatGeekCard from '../components/SeatGeekCard'
import StubHubCard from '../components/StubHubCard'
import TicketMasterCard from '../components/TicketMasterCard'
import useStubHub from '../hooks/useStubHub'

export default function Events() {
    const [ticketMaster, setTicketMaster] = useState([])
    const [seatGeek, setSeatGeek] = useState([])
    const {type} = useParams()
    const [stubHubInfo, setStubHubInfo] = useState([])
    const stubHub = useStubHub()
    
    useEffect(() => {
        fetchAll()
        stubHub.searchEvents()
        .then(data => {
            setStubHubInfo(data.events)
        })
    }, [])




    const fetchAll = () => {
        const URL = `https://api.seatgeek.com/2/events?page=1&venue.city=atlanta&taxonomies.name=${type}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`
        const promiseEvents = fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                let artistNames = []
                let SGdata = data.events.filter((event) => {
                    if (artistNames.indexOf(event.performers[0].name) === -1) {
                        artistNames.push(event.performers[0].name)
                        return true
                    }
                    else {
                        return false
                    }
                })
                return SGdata.splice(0, 4)

            });

        Promise.resolve(promiseEvents).then(results => {
            setSeatGeek(results)

            const promises = results.map((event) => {
                return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&size=1&keyword=${event.title}&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                        }
                        return null
                    })

                    .then(data => {
                        console.log(data)
                        if (data.page.totalElements === 0) {
                            return data
                        }
                        else {
                            return data._embedded.events[0]
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return null
                    }
                    )
            });
            Promise.all(promises).then(eventResults => {
                console.log(eventResults)
                setTicketMaster(eventResults)

            })

        })
    }


    return (
        <Container>
            <h1>Music Events in Atlanta</h1>

            <Row>
                <Col>
                    <h1>Seat Geek</h1>
                    {
                        seatGeek.map(event => {
                            return <SeatGeekCard event={event} />
                        })
                    }
                </Col>
                <Col>
                    <h1>Ticket Master</h1>
                    {

                        ticketMaster.map(event => {
                            return <TicketMasterCard event={event} />
                        })
                    }
                </Col>
                <Col>
                {
                    stubHubInfo.map(event => {
                        return <StubHubCard event={event} />
                    })
                }
                </Col>
            </Row>


        </Container>


    )
}

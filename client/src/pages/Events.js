import React, { useEffect, useState } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import SeatGeekCard from '../components/SeatGeekCard'
import StubHubCard from '../components/StubHubCard'
import TicketMasterCard from '../components/TicketMasterCard'
import useStubHub from '../hooks/useStubHub'
import seatGeekLogo from '../img/seatgeek.png';
import stubHubLogo from '../img/stubhub.png';
import ticketMasterLogo from '../img/ticketmaster.svg'



export default function Events() {
    const [ticketMaster, setTicketMaster] = useState([])
    const [seatGeek, setSeatGeek] = useState([])
    const { type } = useParams()
    const [stubHubInfo, setStubHubInfo] = useState([])
    const stubHub = useStubHub()

    useEffect(() => {
        fetchAll()
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
                return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&size=1&keyword=${event.title.replace(/ *\([^)]*\) */g, "")}&apikey=vaxX0RePwNx8nBk5VVUekQWZP9JFsD5e`)
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                        }
                        return null
                    })
                    .then(data => {
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
                setTicketMaster(eventResults)
            })

            const stubHubPromises = results.map(event => {
                return stubHub.searchEvents("atlanta", event.title.replace(/ *\([^)]*\) */g, ""))

                    .then(data => {
                        if (data.numFound === 0) {
                            return data
                        }
                        else {
                            return data.events[0]
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return null
                    })
            })
            Promise.all(stubHubPromises).then(stubHubResults => {
                console.log(stubHubResults)
                setStubHubInfo(stubHubResults)
            })

        })
    }


    return (
        <Container>
            <h1>Music Events in Atlanta</h1>

            <Row>
                <Col sm={4}>
                    <img className="seatGeekLogo" src={seatGeekLogo} alt="" />
                    {
                        seatGeek.map(event => {
                            return <SeatGeekCard event={event} />
                        })
                    }
                </Col>
                <Col sm={4}>
                    <img className="stubHubLogo" src={stubHubLogo} alt="stubhub logo"/>
                    {
                        stubHubInfo.map(event => {
                            return <StubHubCard event={event} />
                        })
                    }
                </Col>
                <Col sm={4}>
                    <img className="ticketmasterLogo" src= {ticketMasterLogo} alt = "ticketmaster logo"/>
                    {

                        ticketMaster.map(event => {
                            return <TicketMasterCard event={event} />
                        })
                    }
                </Col>
            </Row>


        </Container>


    )
}

import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import TicketMasterCard from '../components/TicketMasterCard';
import SeatGeekCard from '../components/SeatGeekCard';
import StubHubCard from '../components/StubHubCard';
import React, { useEffect, useState } from 'react';
import GoogleMaps from '../components/GoogleMaps';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import usePosition from '../hooks/usePosition';
import useStubHub from '../hooks/useStubHub';
import moment from 'moment';
import '.././App.css';
import { useSelector } from 'react-redux';
import NotLoggedInToStubHubCard from '../components/NotLoggedInToStubHubCard';
import stubHubLogo from '../img/stub-hub-logo.png'
import seatGeekLogo from '../img/seatgeek.png'
import ticketMasterLogo from '../img/ticketmaster.svg'



export default function Prices(props) {
    const location = useLocation()
    const [TicketMaster, setTicketMaster] = useState([])
    const [stubHubInfo, setStubHubInfo] = useState([])
    const stubHubAPI = useStubHub()
    const event = location.state.event
    const { latitude, longitude } = usePosition()
    const address = {
        city: event.venue.city,
        state: event.venue.state,
        address: event.venue.address,
        postal_code: event.venue.postal_code
    }
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const stubHubUser = useSelector((state) => state.stubHub);


    useEffect(() => {
        fetchAll()
    }, [])


    const fetchStubHub = () => {
        (!stubHubUser ? 
            setStubHubInfo(["noStubHubUser"]) :
            (
                stubHubAPI.searchEvents(event.venue.city, event.title.replace(/ *\([^)]*\) */g, ""))
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
            )) 
    }

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

            fetchStubHub()
    }


    const styling = {
        border: '2px solid #FFC0CB',
        margin: '10px auto',
        borderRadius: '15px',
        width: '50%',
        minWidth: '325px',
        alignItems: 'center'
    }

    return (
        <Container style={{ textAlign: "center" }}>
            <Row >
                <Col className="mt-3 mb-5">
                    <h1 className="prices-header contentH1"> Prices for {event.title.replace(/ *\([^)]*\) */g, "")} in {event.venue.city}, {event.venue.state}</h1>
                </Col>
            </Row>
            {isDesktopOrLaptop &&
                <>
                    <Row>
                        <Col sm={4}>
                            <div className="pricesCard">
                            <img src={seatGeekLogo} alt="" className="seatGeekLogo"></img>
                            <SeatGeekCard event={event} />
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="pricesCard">
                        <img src={stubHubLogo} className="stubHubLogo" alt=""></img>
                            {
                                stubHubInfo[0] === "noStubHubUser" ? <NotLoggedInToStubHubCard /> :
                                <StubHubCard event={stubHubInfo}/>
                            }
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="pricesCard">
                        <img src={ticketMasterLogo} className="ticketmasterLogo" alt=""></img>
                            <TicketMasterCard event={TicketMaster}  />
                            </div>
                        </Col>
                    </Row>
                </>
            }
            {isTabletOrMobileDevice &&
                <div>
                    <Table  variant="dark">
                        <thead>
                            <tr>
                                <th>{event.title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> <img src={event.performers[0].image} alt="event"></img> </td>
                            </tr>
                            <tr>
                                Date: {moment.parseZone(event.datetime_local).format('MM/D/YYYY')}
                                <td> </td>
                            </tr>
                            <tr>
                                <td>Venue: <a href={`https://google.com/maps/search/${event.venue.name_v2} ${event.venue.city} ${event.venue.country}`} target="_blank" rel="noreferrer">
                                    <span>{event.venue.name_v2}</span>
                                </a></td>
                            </tr>
                            <Table  variant="dark">
                                <thead>
                                    <tr>
                                        <th>Seller</th>
                                        <th>Low</th>
                                        <th>Average</th>
                                        <th>High</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SeatGeek</td>
                                        <td>
                                            <Button className="ml-2 mr-2" href={event.url} variant="success">${event.stats.lowest_price}</Button>
                                        </td>
                                        <td>
                                            <Button className="mr-2" href={event.url} name="averagePrice" variant="primary">${event.stats.average_price}</Button>
                                        </td>
                                        <td>
                                            <Button href={event.url} variant="danger">${event.stats.highest_price}</Button>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>StubHub</td>
                                        {
                                            stubHubInfo[0] === "noStubHubUser" ? 
                                            (
                                                <td> Please log into StubHub to find ticket information on this event</td>
                                            ) :
                                            (!stubHubInfo.id ? (
                                                <td> No tickets currently available from this vendor.</td>
                                            ) : (
                                                <>
                                                    <td>
                                                        <Button href={`https://www.stubhub.com//${stubHubInfo.webURI}`} variant="success">${Math.round(stubHubInfo.ticketInfo.minListPrice)}</Button>
                                                    </td>
                                                    <td>
                                                        <Button href={`https://www.stubhub.com//${stubHubInfo.webURI}`} name="averagePrice" variant="primary">${
                                                            Math.round((stubHubInfo.ticketInfo.maxListPrice + stubHubInfo.ticketInfo.minListPrice) / 2)}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button href={`https://www.stubhub.com//${stubHubInfo.webURI}`} variant="danger">
                                                            ${Math.round(stubHubInfo.ticketInfo.maxListPrice)}
                                                        </Button>
                                                    </td>
                                                </>
                                            ))
                                        }
                                    </tr>
                                    <tr>
                                        <td>ticketmaster</td>
                                        {!TicketMaster.id ? (
                                            <td> No tickets currently available from this vendor.</td>
                                        ) : (
                                            <>
                                                <td>
                                                    <Button href={TicketMaster.url} variant="success">${Math.round(TicketMaster.priceRanges[0].min)}</Button>
                                                </td>
                                                <td>
                                                    <Button href={TicketMaster.url} name="averagePrice" variant="primary">
                                                        ${Math.round((TicketMaster.priceRanges[0].min + TicketMaster.priceRanges[0].max) / 2)}
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button href={TicketMaster.url} variant="danger">${Math.round(TicketMaster.priceRanges[0].max)}</Button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            </Table>
                        </tbody>
                    </Table>
                </div>
            }

            <div className="spacer"></div>

            <Row style={styling} className="map-row">
                <Col className="mt-3">
                    <h3>Distance to event:</h3>
                    <h5>Use current location or enter origin address.</h5>
                    <p className="location-disclaimer">(Location automatically filled if accepted)</p>
                    <div>
                        <GoogleMaps eventLatitude={latitude} eventLng={longitude} address={address} />
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

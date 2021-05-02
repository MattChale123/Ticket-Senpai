import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import moment from 'moment'

export default function TicketMasterCard(props) {
    return (
        <div className="mt-3 pricesCard">
            {
                !props.event?.id ? (
                    <Card style={{ width: '20rem' }} className="card-background">
                        <Card.Img variant="top" style={{ height: "238px", width: "318px" }} src={"https://www.livenation.com/ticketmaster/img/ticketmaster-banner2500w.png"} />
                        <Card.Body className="card-background">
                            <Card.Title>No matching event found</Card.Title>
                            <hr></hr>
                            <span> NA</span>
                            <Card.Text>
                                Price of Tickets:
                        </Card.Text>
                            <span style={{ color: 'red' }}>
                                No tickets currently available from this Vendor
                            </span>
                        </Card.Body>
                    </Card>
                ) :
                    (

                        <Card style={{ width: '20rem' }} className="card-background">
                            <a href={props.event.url}><Card.Img variant="top" src={props.event.images[2].url} /></a>
                            <Card.Body className="card-background">
                                <Card.Title>{props.event.name}</Card.Title>
                                <hr></hr>
                                <a href={`https://google.com/maps/search/${props.event._embedded.venues[0].name} ${props.event._embedded.venues[0].city.name}`} target="_blank" rel="noreferrer">
                                    <span> @ {props.event._embedded.venues[0].name}</span>
                                </a>
                                <div>
                                {moment(`${props.event.dates.start.localDate}`).format('MM/D/YYYY')}
                                </div>

                                <Card.Text>
                                    Price of Tickets:
                                </Card.Text>
                                {
                                    props.event.priceRanges == null ?
                                        <span style={{ color: 'red' }}>
                                            No tickets currently available from this Vendor.
                                        </span> :

                                        <div >
                                            <Row>
                                                <Col >Low</Col>
                                                <Col >Average</Col>
                                                <Col >High</Col>
                                            </Row>
                                            <Row >
                                                <Col sm={4}>
                                                    <Button href={props.event.url} variant="success">${Math.round(props.event.priceRanges[0].min)}</Button>
                                                </Col>
                                                <Col sm={4}>
                                                    <Button href={props.event.url} name="averagePrice" variant="primary">
                                                        ${Math.round((props.event.priceRanges[0].min + props.event.priceRanges[0].max) / 2)}
                                                    </Button>
                                                </Col>
                                                <Col sm={4}>
                                                    <Button href={props.event.url} variant="danger">${Math.round(props.event.priceRanges[0].max)}</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                }
                            </Card.Body>
                        </Card>
                    )
            }
        </div >
    )
}

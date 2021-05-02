import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import moment from 'moment'

export default function SeatGeekCard(props) {
    const { url, venue, performers, stats, title } = props.event;
    const noTicketStr = "No tickets currently available from this Vendor"

    return (
        <div className="mt-3 pricesCard" >
            <Card style={{ width: '20rem' }} className="card-background">
                <a href={url}><Card.Img variant="top" src={`${performers[0].image}`} /></a>
                <Card.Body className="card-background">
                    <Card.Title>{title}</Card.Title>
                    <hr></hr>
                    <a href={`https://google.com/maps/search/${venue.name_v2} ${venue.city} ${venue.country}`} target="_blank" rel="noreferrer">
                        <span> @ {venue.name_v2}</span>
                    </a>
                    <div>
                        {moment.parseZone(props.event.datetime_local).format('MM/D/YYYY')}
                    </div>
                    <Card.Text>
                        Price of Tickets:
                     </Card.Text>
                    {
                        stats.average_price == null ?
                            <span style={{ color: 'red' }}>
                                {noTicketStr}
                            </span> :
                            <div >
                                <Row>
                                    <Col>Low</Col>
                                    <Col>Average</Col>
                                    <Col>High</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button href={url} variant="success">${stats.lowest_price}</Button>
                                    </Col>
                                    <Col>
                                        <Button href={url} name="averagePrice" variant="primary">${stats.average_price}</Button>
                                    </Col>
                                    <Col>
                                        <Button href={url} variant="danger">${stats.highest_price}</Button>
                                    </Col>
                                </Row>
                            </div>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

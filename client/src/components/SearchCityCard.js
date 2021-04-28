import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function SearchCityCard(props) {
    const { url, venue, performers, stats, title } = props.event;
    const noTicketStr = "No tickets currently available from this Vendor"

    return (
        <div>
            <Card style={{ width: '20rem' }}>
                <a href={url}><Card.Img variant="top" src={`${performers[0].image}`} /></a>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <hr></hr>
                    <div style={{ marginBottom: '10px' }}>
                        <a href={`https://google.com/maps/search/${venue.name_v2} ${venue.city} ${venue.country}`} target="_blank" rel="noreferrer">
                            <span > @ {venue.name_v2}</span>
                        </a>
                    </div>
                    <div>
                        {
                            stats.average_price == null ?
                                <span style={{ color: 'red', marginBottom: '5px' }}>
                                    {noTicketStr}
                                </span> :
                                <div >
                                    <Row>
                                        <Col>
                                            <Button name="compareButton" variant="primary">Compare Prices</Button>
                                        </Col>
                                    </Row>
                                </div>
                        }
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

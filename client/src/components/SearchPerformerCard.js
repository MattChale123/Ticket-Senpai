import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function SearchPerformerCard(props) {
    const { url, venue, performers, stats, title } = props.event;
    const noTicketStr = "No tickets currently available from this Vendor"
    const history = useHistory()

    const handleClick = () => {
        history.push({
            pathname: `/prices/${title.replace(/ *\([^)]*\) */g, "")}`,
            state: {event: props.event}
        })
    }

    return (
        <div>
            <Card style={{ width: '20rem' }}>
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
                                            <Button variant="primary" onClick={handleClick}>Compare</Button>
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

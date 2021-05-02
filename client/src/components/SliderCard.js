import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment'

export default function SliderCard(props) {
    const history = useHistory()

    const handleClick = () => {
        history.push({
            pathname: `/prices/${props.event.title.replace(/ *\([^)]*\) */g, "")}`,
            state: {event: props.event}
        })
    }

    return (
        <div>
            <div className="card2" onClick={handleClick} >
                <img src={props.event.performers[0].image} alt="concerts"></img>
            <div className="card-content">
                <div className="card-content-title">{props.event.title}</div>
                <Button  className="neon-button-pink card-content-details" variant="outline-primary" onClick={handleClick}>Compare</Button>
                <div className="card-content-footer">
                    <div>{props.event.venue.city}, {props.event.venue.state}</div>
                    <div>{moment.parseZone(props.event.datetime_local).format('MM/D/YYYY')}</div>
                </div>
            </div>
            </div>
            <div className="card-event-title">
                {props.event.title.replace(/ *\([^)]*\) */g, "")}
            </div>
        </div>
    )
}

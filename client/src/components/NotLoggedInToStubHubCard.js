import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import StubHubLogo from '../img/stub-hub-logo.png';
import moment from 'moment'
import '.././App.css';
import { Link } from 'react-router-dom';

export default function NotLoggedInToStubHubCard() {
    return (
        <div>
            <div className="mt-3">
                <Card style={{ width: '20rem' }} className="stubhub-card-background">
                    <Card.Body className="card-background" style={{display: 'flex', justifyContent: 'center',}}>
                        <Card.Title style={{ color: 'red' }}> Please log into StubHub to find ticket information regarding this event</Card.Title>
                        <Link to="/login/stubhub"><Button className="neon-button-pink">Login to StubHub</Button></Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}


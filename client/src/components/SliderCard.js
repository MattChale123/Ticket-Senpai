import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import concertImg from '../img/concerts.png';

export default function SliderCard() {


    return (
        <div>
            <Link className="card2">
                <img src={concertImg} alt="concerts"></img>
            <div className="card-content">
                <div className="card-content-title">Justin Bieber</div>
                <Button className="card-content-details" variant="outline-primary">Details</Button>
                <div className="card-content-footer">
                    <div>Type: Concert</div>
                    <div>Date: July 2021</div>
                </div>
            </div>
            </Link>
        </div>
    )
}

import React from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';

export default function Copyright() {
    return (
            <Container className="text-center copyright-container">
                <h5 className="copyright-text">&#169; Copyright 2021 Ticket Senpai. All Right Reserved.</h5>
            </Container>
    )
}

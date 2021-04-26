import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

export default function StubHub() {
    const [search, setSearch] = useState('');
    const [stubHubData, setStubHubData] = useState([]);

    const fetchStubHubData = () => {  
        // generate an access token with these steps:
        // 1. concatenate the app's consumer key & secret, separated by a colon:
        const consumerKey = 'CmcAzYV3wiQwL5kLZ4onoroVeAJH8hU3'
        const consumerSecret = '30FAv5vpppELlTjI'
        const consumerKeyAndSecret = consumerKey + ':' + consumerSecret
        const base64EncodedConsumerKeyAndSecret = btoa(consumerKeyAndSecret)

        fetch(`https://api.stubhub.com/sellers/oauth/accesstoken`, {
            headers: {
                'Authorization': `Basic ${base64EncodedConsumerKeyAndSecret}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setStubHubData(data)
            // console.log(data)
        })
    }

    return (
        <div>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

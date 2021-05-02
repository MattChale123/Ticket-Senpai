import React, { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Loader } from "@googlemaps/js-api-loader"
import ".././App.css";

const loader = new Loader({
    apiKey: 'AIzaSyBxCFPMNQ1YqokuJM8pwSnWnqNByNzEPl0',
    version: "beta",
  });

export default function GoogleMaps(props) {
    const [ results, setResults ] = useState([])
    const [ googleMaps, setGoogleMaps ] = useState(null)
    const [ error, setError ] = useState('')
    const [ form, setForm ] = useState({
        origin: '',
        destination: [props.address.address, props.address.city, props.address.state, props.address.postal_code]
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const position = new googleMaps.LatLng(props.eventLatitude, props.eventLng)
        const service = new googleMaps.DistanceMatrixService();
        console.log(form.origin)
        console.log(position)
        service.getDistanceMatrix({
            origins: [...form.origin].length > 0 ? [form.origin] : [position],
            destinations: [`${props.address.address}, ${props.address.city}, ${props.address.state}, ${props.address.postal_code}`] || [form.destination],
            travelMode: 'DRIVING',
        })
        .then(data => {
            console.log(data)
            if (data.rows[0].elements[0].status === "NOT_FOUND" ) {
                setError('Invalid location. Please set origin to a valid address.')
            } else {
                setResults(data.rows)
            }
            
        })
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        loader.load().then(() => {
            setGoogleMaps(window.google.maps)
          });
    
    }, [])
    const styling = {
        margin: '10px'
    }
    const metersToMiles = (num) => {
        return Math.round(num / 1000 * 0.621371)
    }
    const errorStyling = {
        color: "red",
        fontWeight: "bold"
      }

    return (
        <div className="maps-container">
            <Form onSubmit={handleSubmit} style={styling}>
                <label className="maps-label">User address:</label>
                <Form.Control type="text" placeholder="123 Main St, State, GA 12345" onChange={handleChange} value={form.origin} name='origin'/>
                    <br />
                <label className="maps-label">Venue address:</label>
                <Form.Control type="text" placeholder="Destination" onChange={handleChange} value={form.destination} name='destination'/>
                    <br />
                <Button className="neon-button-pink" variant="primary" type="submit">Submit</Button>
            </Form>
            {results.map((result) => {
                return (
                    <Card>
                        <Card.Body>
                        <Card.Text>{metersToMiles(result.elements[0].distance.value)} miles</Card.Text>
                          <Card.Text>{result.elements[0].duration.text}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
            {(error === 'Invalid location. Please set origin to a valid address.') && <p style={errorStyling}>*{error}*</p>}
        </div>
    )
}

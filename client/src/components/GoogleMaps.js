import React, { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Loader } from "@googlemaps/js-api-loader"
import usePosition from '../hooks/usePosition'

const loader = new Loader({
    apiKey: 'AIzaSyBxCFPMNQ1YqokuJM8pwSnWnqNByNzEPl0',
    version: "beta",
  });

export default function GoogleMaps(props) {
    const  { latitude, longitude } = usePosition()
    const [ results, setResults ] = useState([])
    console.log(results)
    const [ googleMaps, setGoogleMaps ] = useState(null)
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
            destinations: [props.address.address, props.address.city, props.address.state, props.address.postal_code] || [form.destination],
            travelMode: 'DRIVING',
        })
        .then(data => {
            console.log(data)
            setResults(data.rows)
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

    return (
        <div>
            <Form onSubmit={handleSubmit} style={styling}>
                <Form.Control type="text" placeholder="Starting location" onChange={handleChange} value={form.origin} name='origin'/>
                    <br />
                <Form.Control type="text" placeholder="Destination" onChange={handleChange} value={form.destination} name='destination'/>
                    <br />
                <Button variant="primary" type="submit">Submit</Button>
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
        </div>
    )
}

import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Button, Card } from 'react-bootstrap';
import SeatGeek from '../components/SeatGeek';

export default function SeatGeakTest() {
    const [searchCity, setSearchCity] = useState('');
    const [seatGeekData, setSeatGeekData] = useState([])

    const fetchSeatGeakCity = () => {
        const URL = `https://api.seatgeek.com/2/events?per_page=25&page=1&venue.city=${searchCity}&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setSeatGeekData(data.events)
                console.log(data.events)
                if (data.Error) {
                    alert(data.Error);
                }
            });
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        fetchSeatGeakCity()
    };
    const handleChangeCity = (event) => {
        setSearchCity(event.target.value);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className="cityForm">
                <InputGroup className="mb-3 inputGrp">
                    <div>
                        <FormControl
                            placeholder="Enter a City"
                            aria-label="Enter a City"
                            onChange={handleChangeCity}
                            value={searchCity}
                            className="formCtrl"
                            required
                        />
                    </div>
                    <div>
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-info">
                                Search
                            </Button>
                        </InputGroup.Append>
                    </div>
                </InputGroup>
            </Form>
            {seatGeekData.map((sGD, index) => {
                console.log(sGD)
                return (
                    <div key={index}>
                        <SeatGeek sGD={sGD} />
                    </div>

                )
            })}

        </div>
    )
}

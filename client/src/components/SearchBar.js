import React, { useState } from 'react'
import { DropdownButton, Dropdown, Form, InputGroup, Button, FormControl } from 'react-bootstrap';


export default function SearchBar() {
    const [searchCityForm, setSearchCityForm] = useState(false)
    const [searchPerformerForm, setSearchPerformerForm] = useState(false)
    const [searchParam, setSearchParam] = useState('');
    const [seatGeekCityData, setSeatGeekCityData] = useState([])
    const [seatGeekPerformerData, setSeatGeekPerformerData] = useState([])

    const fetchSeatGeakCity = () => {
        const URL = `https://api.seatgeek.com/2/events?per_page=4&page=1&venue.city=${searchParam}&taxonomies.name=concert&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setSeatGeekCityData(data.events)
                console.log(data.events)
                if (data.Error) {
                    alert(data.Error);
                }
            });
    }

    const fetchSeatGeakPerformer = () => {
        const URL = `https://api.seatgeek.com/2/events?per_page=4&page=1&venue.city=${searchParam}&taxonomies.name=sports&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setSeatGeekPerformerData(data.events)
                console.log(data.events)
                if (data.Error) {
                    alert(data.Error);
                }
            });
    }

    const handleSubmitCity = (event) => {
        event.preventDefault();
        fetchSeatGeakCity()
    };

    const handleSubmitPerformer = (event) => {
        event.preventDefault();
        fetchSeatGeakPerformer()
    };
    
    const handleChange = (event) => {
        setSearchParam(event.target.value);
    };

    const onChangeCity = (event) => {
        switch(event) {
            case "City": 
                return (
                    setSearchCityForm(true),
                 setSearchPerformerForm(false)
                 );

            case "Performer": 
                return (
                    setSearchPerformerForm(true),
                        setSearchCityForm(false)
                        )
            default:
                return ""
        }
    }
    
    return (
        <div>
            <DropdownButton
                alignRight
                title="Dropdown right"
                id="dropdown-menu-align-right"
                onSelect={onChangeCity}
            >
                <Dropdown.Item eventKey="City" >City</Dropdown.Item>
                <Dropdown.Item eventKey="Performer" >Performer</Dropdown.Item>
            </DropdownButton>
            <div>
            {
                searchCityForm && 
                            <Form onSubmit={handleSubmitCity} className="cityForm">
                                <InputGroup className="mb-3 inputGrp">
                                    <div>
                                        <FormControl
                                            placeholder="Enter a City"
                                            aria-label="Enter a City"
                                            onChange={handleChange}
                                            value={searchParam}
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
            }
            {
                searchPerformerForm && 
                            <Form onSubmit={handleSubmitPerformer} className="cityForm">
                                <InputGroup className="mb-3 inputGrp">
                                    <div>
                                        <FormControl
                                            placeholder="Enter a Performer"
                                            aria-label="Enter a Performer"
                                            onChange={handleChange}
                                            value={searchParam}
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
            }
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { DropdownButton, Dropdown, Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function SearchBar() {
    const [searchDefault, setSearchDefault] = useState(true)
    const [searchCityForm, setSearchCityForm] = useState(false)
    const [searchPerformerForm, setSearchPerformerForm] = useState(false)
    const [searchParam, setSearchParam] = useState('');
    const history = useHistory();

    const handleSubmitDefault = () => {
        history.push(`/search/1/${searchParam}`)
        setSearchParam("")
    };
    const handleSubmitCity = () => {
        history.push(`/search/1/${searchParam}`)
        setSearchParam("")
    };

    const handleSubmitPerformer = () => {
        history.push(`/search/2/${searchParam}`)
        setSearchParam("")
    };
    
    

    const handleChange = (event) => {
        setSearchParam(event.target.value);
    };

    const onChangeCity = (event) => {
        switch(event) {
            case "City": 
                return (
                    setSearchCityForm(true),
                 setSearchPerformerForm(false),
                 setSearchDefault(false)
                 );
            case "Performer": 
                return (
                    setSearchPerformerForm(true),
                        setSearchCityForm(false),
                        setSearchDefault(false)
                        );
            default:
                return (setSearchDefault(true),
                        setSearchCityForm(false),
                        setSearchPerformerForm(false)
                        )
        }
    }
    
    return (
        <div className="searchBar mt-3">
            <DropdownButton
                alignRight
                title="Search By"
                id="dropdown-menu-align-right"
                onSelect={onChangeCity}
            >
                <Dropdown.Item eventKey="City">City</Dropdown.Item>
                <Dropdown.Item eventKey="Performer">Performer</Dropdown.Item>
            </DropdownButton>
            {
                searchDefault && 
                            <Form onSubmit={handleSubmitDefault} className="cityForm">
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

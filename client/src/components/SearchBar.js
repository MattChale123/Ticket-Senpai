import React, { useState } from 'react'
import { DropdownButton, Dropdown, Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function SearchBar() {
    const [searchDefault, setSearchDefault] = useState(true)
    const [searchCityForm, setSearchCityForm] = useState(true)
    const [searchPerformerForm, setSearchPerformerForm] = useState(false)
    const [searchParam, setSearchParam] = useState('');
    const [searchPCParam, setSearchPCParam] = useState('')

    const history = useHistory();

    const handleSubmitCity = (e) => {
        e.preventDefault()
        history.push(`/search/city/${searchParam}`)
        setSearchParam("")
    };

    const handleSubmitPerformer = (e) => {
        e.preventDefault()
        history.push({
            pathname: `/search/performer/${searchParam}}`,
            state: { PCParam: searchPCParam }
        })
        setSearchParam("")
        setSearchPCParam("")

    };

    const handleChange = (event) => {
        setSearchParam(event.target.value);
    };
    const handlePCParamChange = (event) => {
        setSearchPCParam(event.target.value);
    };

    const onChangeCity = (event) => {
        switch (event) {
            case "City":
                return (
                    setSearchCityForm(true),
                    setSearchPerformerForm(false),
                    setSearchDefault(true)
                );
            case "Performer":
                return (
                    setSearchPerformerForm(true),
                    setSearchCityForm(false),
                    setSearchDefault(false)
                )
            default:
                return ""
        }
    }

    return (
        <div className="bg-dark border border-primary">
                
        <div className="searchBar mt-3 ">
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
                    searchCityForm && searchDefault ? (
                        <Form onSubmit={handleSubmitCity} className="cityForm">
                            <InputGroup className="mb-3 inputGrp">
                                
                                    <FormControl
                                        placeholder="Enter a City"
                                        aria-label="Enter a City"
                                        onChange={handleChange}
                                        value={searchParam}
                                        required
                                    />
                                    <InputGroup.Append>
                                        <Button type="submit" variant="outline-info">
                                            Search
                                        </Button>
                                    </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    ) : (
                        <Form onSubmit={handleSubmitPerformer} className="cityForm">
                            <InputGroup className="mb-3 inputGrp">
                                <FormControl
                                    placeholder="Enter a Performer or Team"
                                    aria-label="Enter a Performer or Team"
                                    onChange={handleChange}
                                    value={searchParam}
                                    required
                                />
                                    <FormControl
                                        placeholder="Enter a City"
                                        aria-label="Enter a City"
                                        onChange={handlePCParamChange}
                                        value={searchPCParam}
                                    />
                                    <InputGroup.Append>
                                        <Button type="submit" variant="outline-info">
                                            Search
                                        </Button>
                                    </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    )
                }
        </div>
        </div>
    )
}

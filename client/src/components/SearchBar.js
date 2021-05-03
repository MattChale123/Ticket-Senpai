import { DropdownButton, Dropdown, Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import '.././App.css';
import { useSelector } from 'react-redux';

export default function SearchBar() {
    const [searchDefault, setSearchDefault] = useState(true)
    const [searchCityForm, setSearchCityForm] = useState(true)
    const [searchPerformerForm, setSearchPerformerForm] = useState(false)
    const [searchParam, setSearchParam] = useState('');
    const [searchPCParam, setSearchPCParam] = useState('')
    const [selectState, setSelectState] = useState('Select State')
    const history = useHistory();
    const user = useSelector((state) => state.user)
    const [stateError, setStateError] = useState('')

    const handleSubmitCity = (e) => {
        e.preventDefault()
        if (selectState === "Select State") {
            setStateError("Please select a state")
        }
        else {
            history.push({
                pathname: `/search/city/${searchParam}`,
                state: {
                    state: selectState,
                    city: searchParam
                }
            })
            setSearchParam("")
            setStateError("")
        }
    };
    const handleSubmitPerformer = (e) => {
        e.preventDefault()
        history.push({
            pathname: `/search/performer/${searchParam}`,
            state: {
                PCParam: searchPCParam,
            }
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



    const onChangeState = (event) => {
        setSelectState(event)
    }

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
        <div className="bg-dark border border-dark">
            <div className="searchBar mt-3">
                <div>

                    <DropdownButton
                        className="searchBarBtn"
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
                                        className="citySearchInput"
                                        required
                                    />
                                    <DropdownButton
                                        className="stateBarBtn"
                                        alignRight
                                        title={selectState}
                                        id="dropdown-menu-align-right"
                                        onSelect={onChangeState}
                                        required
                                    >
                                        <Dropdown.Item active selected disabled>Select state</Dropdown.Item>
                                        <Dropdown.Item eventKey="AL">Alabama</Dropdown.Item>
                                        <Dropdown.Item eventKey="AK">Alaska</Dropdown.Item>
                                        <Dropdown.Item eventKey="AZ">Arizona</Dropdown.Item>
                                        <Dropdown.Item eventKey="AR">Arkansas</Dropdown.Item>
                                        <Dropdown.Item eventKey="CA">California</Dropdown.Item>
                                        <Dropdown.Item eventKey="CO">Colorado</Dropdown.Item>
                                        <Dropdown.Item eventKey="CT">Connecticut</Dropdown.Item>
                                        <Dropdown.Item eventKey="DE">Delaware</Dropdown.Item>
                                        <Dropdown.Item eventKey="DC">District Of Columbia</Dropdown.Item>
                                        <Dropdown.Item eventKey="FL">Florida</Dropdown.Item>
                                        <Dropdown.Item eventKey="GA">Georgia</Dropdown.Item>
                                        <Dropdown.Item eventKey="HI">Hawaii</Dropdown.Item>
                                        <Dropdown.Item eventKey="ID">Idaho</Dropdown.Item>
                                        <Dropdown.Item eventKey="IL">Illinois</Dropdown.Item>
                                        <Dropdown.Item eventKey="IN">Indiana</Dropdown.Item>
                                        <Dropdown.Item eventKey="IA">Iowa</Dropdown.Item>
                                        <Dropdown.Item eventKey="KS">Kansas</Dropdown.Item>
                                        <Dropdown.Item eventKey="KY">Kentucky</Dropdown.Item>
                                        <Dropdown.Item eventKey="LA">Louisiana</Dropdown.Item>
                                        <Dropdown.Item eventKey="ME">Maine</Dropdown.Item>
                                        <Dropdown.Item eventKey="MD">Maryland</Dropdown.Item>
                                        <Dropdown.Item eventKey="MA">Massachusetts</Dropdown.Item>
                                        <Dropdown.Item eventKey="MI">Michigan</Dropdown.Item>
                                        <Dropdown.Item eventKey="MN">Minnesota</Dropdown.Item>
                                        <Dropdown.Item eventKey="MS">Mississippi</Dropdown.Item>
                                        <Dropdown.Item eventKey="MO">Missouri</Dropdown.Item>
                                        <Dropdown.Item eventKey="MT">Montana</Dropdown.Item>
                                        <Dropdown.Item eventKey="NE">Nebraska</Dropdown.Item>
                                        <Dropdown.Item eventKey="NV">Nevada</Dropdown.Item>
                                        <Dropdown.Item eventKey="NH">New Hampshire</Dropdown.Item>
                                        <Dropdown.Item eventKey="NJ">New Jersey</Dropdown.Item>
                                        <Dropdown.Item eventKey="NM">New Mexico</Dropdown.Item>
                                        <Dropdown.Item eventKey="NY">New York</Dropdown.Item>
                                        <Dropdown.Item eventKey="NC">North Carolina</Dropdown.Item>
                                        <Dropdown.Item eventKey="ND">North Dakota</Dropdown.Item>
                                        <Dropdown.Item eventKey="OH">Ohio</Dropdown.Item>
                                        <Dropdown.Item eventKey="OK">Oklahoma</Dropdown.Item>
                                        <Dropdown.Item eventKey="OR">Oregon</Dropdown.Item>
                                        <Dropdown.Item eventKey="PA">Pennsylvania</Dropdown.Item>
                                        <Dropdown.Item eventKey="RI">Rhode Island</Dropdown.Item>
                                        <Dropdown.Item eventKey="SC">South Carolina</Dropdown.Item>
                                        <Dropdown.Item eventKey="SD">South Dakota</Dropdown.Item>
                                        <Dropdown.Item eventKey="TN">Tennessee</Dropdown.Item>
                                        <Dropdown.Item eventKey="TX">Texas</Dropdown.Item>
                                        <Dropdown.Item eventKey="UT">Utah</Dropdown.Item>
                                        <Dropdown.Item eventKey="VT">Vermont</Dropdown.Item>
                                        <Dropdown.Item eventKey="VA">Virginia</Dropdown.Item>
                                        <Dropdown.Item eventKey="WA">Washington</Dropdown.Item>
                                        <Dropdown.Item eventKey="WV">West Virginia</Dropdown.Item>
                                        <Dropdown.Item eventKey="WI">Wisconsin</Dropdown.Item>
                                        <Dropdown.Item eventKey="WY">Wyoming</Dropdown.Item>
                                    </DropdownButton>
                                    <InputGroup.Append>
                                        <Button type="submit" variant="outline-info" className="neon-button-pink">
                                            Search
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        ) : (
                            <Form onSubmit={handleSubmitPerformer} className="cityForm">
                                <InputGroup className="mb-3 inputGrp searchPerformer">
                                    <div className="searchPerformer">
                                        <div className="performerInput">
                                            <FormControl
                                                placeholder="Enter a Performer or Team"
                                                aria-label="Enter a Performer or Team"
                                                onChange={handleChange}
                                                value={searchParam}
                                                required
                                            />
                                        </div>
                                        <div className="performerInput">
                                            <FormControl
                                                placeholder="Enter a City"
                                                aria-label="Enter a City"
                                                onChange={handlePCParamChange}
                                                value={searchPCParam}
                                            />
                                            <InputGroup.Append className="mt-3">
                                                <Button type="submit" variant="outline-info" className="neon-button-pink">
                                                    Search
                                    </Button>
                                            </InputGroup.Append>
                                        </div>
                                    </div>
                                </InputGroup>
                            </Form>
                        )
                    }
                    
                    <div style={{textAlign:"center", color:"red"}}>{stateError}</div>

                </div>
            </div>
        </div>
    )
}

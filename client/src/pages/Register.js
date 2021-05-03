import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import background from '../components/senpailogopurple.svg';
import { Link } from 'react-router-dom';

export default function Register() {
    const [ error, setError ] = useState('')
    const [form, setForm ] = useState({
        username: '',
        password: '',
        email: ''
    })
    const history = useHistory()
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
                email: form.email,
                city: form.city,
                state: form.state
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                history.push('/login')
            }
        })
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const errorStyling = {
        color: "red",
        fontWeight: "bold"
      }
    const styling = {
        backgroundColor: 'rgba(255, 255, 255, .15)',
        backdropFilter: 'blur(5px)',
        color: 'black',
        flexDirection: 'column',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        opacity: '.85',
        border: '2px solid black',
        width: '35%',
        padding: '10px',
        minWidth: '325px'
    }
      
    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'noRepeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: '90% 100%',
            height: '1100px'
           }}>
               <br />
            <div style={styling}>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{textAlign: 'center', color: 'black'}}>Register</h2>
                    <br />
                        <Form.Group>
                            <Form.Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Label htmlFor="inlineFormInputGroup" style={{color: 'black'}}>
                                        Username
                                    </Form.Label>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="inlineFormInputGroup" placeholder="Username" onChange={handleChange} value={form.username} name='username' required />
                                    </InputGroup>
                                    </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{color: 'black'}}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={form.email} name='email' required/><br />
                            <Form.Text className="text-muted" style={{textAlign: 'left', color: 'white'}}>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={{color: 'black'}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' required/>
                        </Form.Group><br />
                        {(error === 'Username already in use. Pick another') && <p style={errorStyling}>{error}</p>}
                        <Form.Group controlId="formBasicCity" required>
                                <Form.Label style={{color: 'black'}}>City</Form.Label>
                                <Form.Control type="text" placeholder="City" onChange={handleChange} value={form.city} name='city' required/>
                        </Form.Group><br />
                        <Form.Group controlId="exampleForm.ControlSelect1" >
                            <Form.Label style={{color: 'black'}}>Select a State</Form.Label>
                            <Form.Control as="select" defaultValue='Select a State' onChange={handleChange} value={form.state} name='state' required>
                            <option>Select a State</option>
                            <option>AL</option>
                            <option>AK</option>
                            <option>AZ</option>
                            <option>AR</option>
                            <option>CA</option>
                            <option>CO</option>
                            <option>CT</option>
                            <option>DE</option>
                            <option>FL</option>
                            <option>GA</option>
                            <option>HI</option>
                            <option>ID</option>
                            <option>IL</option>
                            <option>IN</option>
                            <option>IA</option>
                            <option>KS</option>
                            <option>KY</option>
                            <option>LA</option>
                            <option>ME</option>
                            <option>MD</option>
                            <option>MA</option>
                            <option>MI</option>
                            <option>MN</option>
                            <option>MS</option>
                            <option>MO</option>
                            <option>MT</option>
                            <option>NE</option>
                            <option>NV</option>
                            <option>NH</option>
                            <option>NJ</option>
                            <option>NM</option>
                            <option>NY</option>
                            <option>NC</option>
                            <option>ND</option>
                            <option>OH</option>
                            <option>OK</option>
                            <option>OR</option>
                            <option>PA</option>
                            <option>RI</option>
                            <option>SC</option>
                            <option>SD</option>
                            <option>TN</option>
                            <option>TX</option>
                            <option>UT</option>
                            <option>VT</option>
                            <option>VA</option>
                            <option>WA</option>
                            <option>WV</option>
                            <option>WI</option>
                            <option>WY</option>
                            </Form.Control>
                        </Form.Group>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Button variant="primary" className="neon-button-pink" type="submit">Submit</Button>
                        </div><br />
                        <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            Already registered? Click <Link to={'/login'} style={{color: 'white'}}>&nbsp;
                             here</Link></p>
                        <br />
                    </Form>
            </div>
        </div>
    )
}
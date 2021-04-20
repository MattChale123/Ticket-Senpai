import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap'

export default function Register() {
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
                email: form.email
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert("Thank you for registering")
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

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                Username
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="inlineFormInputGroup" placeholder="Username" onChange={handleChange} value={form.username} name='username' />
                            </InputGroup>
                            </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={form.email} name='email' /><br />
                    <Form.Text className="text-muted" style={{textAlign: 'left', color: 'white'}}>
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' />
                </Form.Group><br />
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}

import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
      });
      const history = useHistory();
      const dispatch = useDispatch();
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              alert(data.error);
            } else {
              dispatch(setUser(data));
              history.push('/');
            }
          });
      };
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={form.username} name='username'></input>
            </form>
        </div>
    )
}

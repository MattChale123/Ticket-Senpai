import { useEffect, useState } from 'react'

export default function Profile() {
    const [ user, setUser ] = useState('')
    
    useEffect(() => {
        getUsername()
    }, [])

    const getUsername = async () => {
        fetch('/api/v1/users/current', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data.username)
        })
    }

    return (
        <div>
            <h3>Welcome back {user}</h3>
        </div>
    )
}

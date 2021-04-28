import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Prices(props) {
    const location = useLocation()

    console.log(location.state.event)
    return (
        <div>
            Hi
        </div>
    )
}

import React, { useState, useEffect } from 'react'

export default function usePosition() {
    const [ position, setPosition ] = useState({})
    const [ error, setError ] = useState(null)
    
    const onChange = ({coords}) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    const onError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        const geo = navigator.geolocation
        if (!geo) {
            setError('Location not supported on current browser.')
        }

        const watcher = geo.watchPosition(onChange, onError)

        return () => geo.clearWatch(watcher)
    }, [])

    return {...position, error}
}

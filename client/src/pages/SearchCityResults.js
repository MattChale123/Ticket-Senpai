import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SearchCityCard from '../components/SearchCityCard'

export default function SearchCityResults() {
    const { param } = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        fetchCityResults()
    }, [param]);

    const fetchCityResults = () => {
        fetch(`https://api.seatgeek.com/2/events?per_page=4&page=1&venue.city=${param}&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setResults(data.events)
                    console.log(data.events)
                }
                else {
                    setResults(["No Results Found"])
                }
            });
    }

    return (
        <div>
            {
                results.map(event => {
                    return <SearchCityCard event={event} />
                })
            }

        </div>
    )
}

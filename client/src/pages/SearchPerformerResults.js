import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SearchPerformerCard from '../components/SearchCityCard'
import { Jumbotron } from 'react-bootstrap'

export default function SearchPerformerResults() {
    const { param } = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        fetchPerformerResults()
    }, [param]);

    const fetchPerformerResults = () => {
        fetch(`https://api.seatgeek.com/2/events?q=${param}&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                console.log('fetching data')
                    setResults(data.events)
                    console.log(data)
                }
                else {
                    setResults(["No Results Found"])
                }
            });
    }

    return (
        <div>
            <Jumbotron>
                
            </Jumbotron>
            {
                results.map(event => {
                    return <SearchPerformerCard event={event} />
                })
            }

        </div>
    )
}

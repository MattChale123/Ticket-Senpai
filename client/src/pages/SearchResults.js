import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SearchResultsCard from '../components/SearchResultsCard'
import '../App.css'

export default function SearchResults() {
    const { num, param } = useParams()
    const [results, setResults] = useState([])

    const conditionDeterminer = () => {
        switch(num) {
            case "1": 
                return (
                    fetchCityResults()
                 );
            case "2": 
                return (
                    fetchPerformerResults()
                );
            default:
                return ""
        }
    }
    useEffect(() => {
        conditionDeterminer()
    }, []);

    const fetchCityResults = () => {
        fetch(`https://api.seatgeek.com/2/events?per_page=4&page=1&venue.city=${param}&taxonomies.name=concert&sort=score.desc&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
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
    
    const fetchPerformerResults = () => {
        fetch(`https://api.seatgeek.com/2/events?q=${param}&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
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
            {
                results.map(event => {
                    return <SearchResultsCard event={event} />
                })
            }

        </div>
    )
}

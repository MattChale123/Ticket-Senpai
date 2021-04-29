import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SearchPerformerCard from '../components/SearchPerformerCard'
import { Button, Col, Image, Jumbotron, Row, Table } from 'react-bootstrap'

export default function SearchPerformerResults() {
    const { param } = useParams()
    const [results, setResults] = useState([])
    const [metaData, setMetaData] = useState([])
    const [previousJumbo, setPreviousJumbo] = useState("")
    let [count, setCount] = useState(1)

    const nextPageButton = () => {
        setCount(count + 1)
    }
    const previousPageButton = () => {
        setCount(count - 1)
    }

    console.log("SearchPerformerResults rendering")
    useEffect(() => {
        fetchPerformerResults()
    }, [param, count]);

    const fetchPerformerResults = () => {
        fetch(`https://api.seatgeek.com/2/events?q=${param}&venue.city=${""}&per_page=10&page=${String(count)}&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log(data)
                    setResults(data.events)
                    setMetaData(data.meta)
                    if ( count === 1) {
                        setPreviousJumbo(data.events[0].performers[0].name)
                        console.log(previousJumbo)
                    } 

                }
                else {
                    setResults(["No Results Found"])
                }
            });
    }

    return (
        <div>
            <div className="performerResultsContainer">
                
                {(results.length > 1) ? (
                    <Jumbotron className="performerJumbotron">
                        <div className="performerBio">
                            <div className="performerTitle">
                                {
                                    previousJumbo !== results[0].performers[0].name ? previousJumbo : previousJumbo
                                }
                            </div>
                            <div className="performerGenre ">
                                {results[0].type !== 'concert' ? (
                                    <span className="ml-2">{(results[0].performers[0].type).toUpperCase()}</span>
                                ) : (
                                    results[0].performers[0].genres.map((genre, index) => {
                                        return (
                                            <span key={index}>{genre.name} / </span>
                                        )
                                    })
                                )
                                }
                            </div>
                        </div>
                        <div>
                            <Image variant="top" src={`${results[0].performers[0].image}`} className="performerImg" />
                        </div>
                    </Jumbotron>
                ) : (
                    <h1>No results found</h1>
                )
                }
                <Row className="performerResultsRow">
                    <Table className="performerResultsTable">
                        <thead>
                            <tr className="performerResultsTableTitle">
                                <td>
                                    <div className="upcomingEvents">
                                        {(results.length > 1) ? (
                                            !results[0].performers[0].has_upcoming_events ?
                                                <span style={{ color: 'red', marginBottom: '5px' }}>
                                                    No upcoming Events
                                            </span> :
                                                <span>
                                                    Upcoming Events: {results[0].performers[0].num_upcoming_events}
                                                </span>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div></div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.map((event, index) => {
                                    return <SearchPerformerCard key={index} event={event} />
                                })
                            }              
                        </tbody>
                    </Table>
                </Row>
                <Row className="performerResultsButtonRow">
                    <Col className="performerResultsPreviousButton">
                        {(count === 1) ? (
                            <div></div>
                        ) : (
                            <div>
                                <Button variant="primary" onClick={previousPageButton}>Previous Page</Button>
                            </div>
                        )}
                    </Col>
                    <Col className="performerResultsPreviousButton">
                        <div>
                            Page {metaData.page} of {Math.round(metaData.total / metaData.per_page)}
                        </div>
                    </Col>
                    <Col className="performerResultsNextPageButton">
                        {metaData.page === Math.round(metaData.total / metaData.per_page) ? (
                            <div></div>
                        ) : (
                            <Button variant="primary" onClick={nextPageButton}>Next Page</Button>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

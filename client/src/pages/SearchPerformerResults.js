import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import SearchPerformerCard from '../components/SearchPerformerCard'
import { Button, Col, Image, Jumbotron, Row, Table } from 'react-bootstrap'
import NoResultsFound from '../components/NoResultsFound'

export default function SearchPerformerResults() {
    const { param } = useParams()
    const location = useLocation()
    const [results, setResults] = useState([])
    const [metaData, setMetaData] = useState([])
    const [previousJumbo, setPreviousJumbo] = useState({
        name: "",
        img: "",
        events: ""

    })
    const PCParam = location.state.PCParam
    let [count, setCount] = useState(1)
    const [previous, setPrevious] = useState({
        param: "",
        PCParam: ""
    })
    const nextPageButton = () => {
        setCount(count + 1)
    }
    const previousPageButton = () => {
        setCount(count - 1)
    }

        ;
    const toUpperCaseCity = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    useEffect(() => {
        fetchPerformerResults()
        if (previous.param !== param || previous.PCParam !== PCParam) {
            setPrevious({ param, PCParam })
            setCount(1)
        }
    }, [param, PCParam, count]);

    const fetchPerformerResults = () => {
        fetch(`https://api.seatgeek.com/2/events?q=${param}&venue.city=${PCParam}&per_page=10&page=${String(count)}&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.meta.total)
                
                if (data.events.length) {
                    console.log(data)
                    setResults(data.events)
                    setMetaData(data.meta)
                    if (count === 1) {
                        setPreviousJumbo({
                            name: data.events[0].performers[0].name,
                            img: data.events[0].performers[0].image,
                            events: data.events[0].performers[0].num_upcoming_events
                        })
                    }
                }
                else {
                    console.log(data)
                    setResults(data)
                }
            });
    }

    return (
        <div>
            { !results.length ?
                (<NoResultsFound />) :
                (
                    <div className="performerResultsContainer">
                        {(results.length >= 1) ? (
                            <Jumbotron className="performerJumbotron">
                                <div className="performerBio">
                                    <div className="performerTitle sliderHeaders">
                                        {results.length === 1 ?
                                            (results[0].performers[0].name)
                                            :
                                            (previousJumbo.name !== results[0].performers[0].name ? previousJumbo.name : previousJumbo.name)
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
                                    <Image variant="top" src={`${results.length === 1 ?
                                            (results[0].performers[0].image)
                                            :
                                            (previousJumbo.img !== results[0].performers[0].image ? previousJumbo.img : previousJumbo.img)
                                        }`} className="performerImg" />
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
                                        <td className="performerResultsTableTD">
                                            <div className="upcomingEvents">
                                                {(results.length >= 1) ? (
                                                    !results[0].performers[0].has_upcoming_events ?
                                                        <span style={{ color: 'red', marginBottom: '5px' }}>
                                                            No upcoming Events
                                            </span> :
                                                        PCParam === "" ? (
                                                            <span className="sliderHeaders">
                                                                Upcoming Events: {
                                                                    results.length < 10 ?
                                                                        (results.length)
                                                                        :
                                                                        (previousJumbo.events !== results.length ? previousJumbo.events : previousJumbo.events)
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span style={{color: 'rgb(220, 46, 255)'}}>
                                                                Upcoming Events in {toUpperCaseCity(PCParam)}: {
                                                                    results.length < 10 ?
                                                                        (results.length)
                                                                        :
                                                                        (previousJumbo.events !== results.length ? previousJumbo.events : previousJumbo.events)
                                                                }
                                                            </span>
                                                        )
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="eventsTitleFiller">
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
                                        <Button className="previousPageBtn neon-button-purple" onClick={previousPageButton}>Prev. Page</Button>
                                    </div>
                                )}
                            </Col>
                            <Col className="performerResultsPreviousButton ">
                                {
                                    results.length >= 10 ?
                                        (
                                            <div className="pageNumber">
                                                Page {metaData.page} of {Math.round(metaData.total / metaData.per_page)}
                                            </div>
                                        ) :
                                        (
                                            <div></div>
                                        )
                                }
                            </Col>
                            <Col className="performerResultsNextPageButton">
                                {
                                    results.length >= 10 ? (
                                        (metaData.page === Math.round(metaData.total / metaData.per_page)) ? (
                                            <div></div>
                                        ) : (
                                            <Button className="nextPageBtn neon-button-purple" onClick={nextPageButton}>Next Page</Button>
                                        )

                                    ) :
                                        <div></div>
                                }
                            </Col>
                        </Row>
                    </div>

                )

            }
        </div>
    )
}

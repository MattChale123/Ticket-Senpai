import React from 'react'
import { Col } from 'react-bootstrap'
export default function CardTN(props) {
    return (
        <>
            {
                props.events.map((event) => {
                    return <Col sm={6}><img src={event.images[2].url} className="home_img " alt=" "></img></Col>
                })
            }
        </>
    )
}

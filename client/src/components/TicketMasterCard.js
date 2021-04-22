import React from 'react'
import { Jumbotron } from 'react-bootstrap'

export default function TicketMasterCard(props) {

    return (
        
       <Jumbotron>
           {/* <h1>{props.event.name}</h1> */}

           <img className="event_pic" src={props.event.images[2].url} alt=""/> 
          
       </Jumbotron>
    )
}

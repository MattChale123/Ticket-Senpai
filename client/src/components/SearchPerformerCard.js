import { Button } from 'react-bootstrap';
import React from 'react'
import { useHistory } from 'react-router';
import moment from 'moment'

export default function SearchPerformerCard(props) {
    const { venue, stats, title } = props.event;
    const noTicketStr = "No tickets currently available"
    const history = useHistory()
    const eventDate = moment.parseZone(props.event.datetime_local).format('MMM D, YYYY').toUpperCase();
    const eventTime = moment.parseZone(props.event.datetime_local).format('HH:mm');
    const handleClick = () => {
        console.log('clicked')
        history.push({
            pathname: `/prices/${title.replace(/ *\([^)]*\) */g, "")}`,
            state: { event: props.event }
        })
    }
    const tConvert = (time) => {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { 
          time = time.slice (1);  
          time[5] = +time[0] < 12 ? 'am' : 'pm'; 
          time[0] = +time[0] % 12 || 12; 
        }
        return time.join ('');
      }
    const newEventTime = tConvert(eventTime)


    return (
            <tr className="performerResultsTableRow">
                <td className="td1">
                    <div className="performerResultsTableInfo">
                        <div className="eventDateTIme">
                            <div className="perfomerEventDate">
                                {eventDate}
                            </div>
                            <div className="performerEventTime">
                                {newEventTime}
                            </div>
                        </div>

                        <div>
                            <a href={`https://google.com/maps/search/${venue.name_v2} ${venue.city} ${venue.country}`} target="_blank" rel="noreferrer">
                                <span> {venue.name} - {venue.city}, {venue.state} </span>
                            </a>
                            <br></br>
                            {title}
                        </div>
                    </div>
                </td>

                <td className="td2">
                    <div className="resultsCompareButton">
                        {
                            stats.average_price == null ?
                                <span style={{ color: 'red', marginBottom: '5px' }}>
                                    {noTicketStr}
                                </span> :
                                <Button className="comparePricesBtn neon-button-pink" onClick={handleClick}>Compare Prices</Button>
                        }
                    </div>
                </td>
            </tr>
    )
}

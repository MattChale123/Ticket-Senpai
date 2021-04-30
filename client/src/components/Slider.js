import SliderCard from './SliderCard';

export default function Slider(props) {

    return (
        <div className="slider-border">
        <div className="separator">
            <h2 className="separator-title twice">{props.title}</h2>
            <div>
                <hr className="line" />
                <div className="slider overflow-auto">
                    {
                        props.events.map(event => {
                            return(
                                <SliderCard event={event} />
                            )
                        })
                    }
                </div>
                <hr className="line" />
            </div>
        </div>
        </div>
    )
}

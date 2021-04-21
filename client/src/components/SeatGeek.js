import React, { useEffect, useState } from 'react'

export default function SeatGeek() {
    const [search, setSearch] = useState('');
    const [seatGeekData, setSeatGeekData] = useState([])


    const fetchSeatGeaksData = () => {
        fetch(`https://api.seatgeek.com/2/venues?city=tampa&client_id=MjE3NTkxNTd8MTYxODk0NzQ1NS42NzczMDgz`)
        .then((res) => res.json())
        .then((data) => {
            setSeatGeekData(data.venues)
            console.log(data.venues)
            if (data.Error) {
                alert(data.Error);
            }
        });
    }

    useEffect(() => {
        fetchSeatGeaksData()
    }, [])

    return (
        <div>
            {seatGeekData.map((sGD) => {
                return(
                <div>
                    {sGD.name_v2}



                </div>
                ) 
            })}

            
        </div>
    )
}

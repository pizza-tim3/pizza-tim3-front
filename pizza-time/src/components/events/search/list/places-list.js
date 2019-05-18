import React from 'react';

//props from map : data={placesData}

const PlacesList = (props) => {
    console.log(props.data);
    return(
        <div className='card-container'>
            <h1>Results:</h1>
            {props.data.map(data => {
                return(
                    <ul key={data.id} className="card">
                        <li>{data.name}</li>
                        <li>{data.rating}</li>
                    </ul>
            )})}
        </div>
    )
}

export default PlacesList
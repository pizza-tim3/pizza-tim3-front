import React from 'react';

//props from map : data={placesData} handleClick = {handleOnClick}

const PlacesList = (props) => {
    return(
        <div className='card-container'>
            <h1>Results:</h1>
            {props.data && props.data.map(data => {

                return(
                    <ul key={data.id} className="card">
                        <li>{data.name}</li>
                        <li>Rating: {data.rating}</li>
                        <button id='addPlaceId' onClick={() => props.handleClick(data.place_id)}>&#43;</button>
                    </ul>
            )})}
        </div>
    )
}

export default PlacesList
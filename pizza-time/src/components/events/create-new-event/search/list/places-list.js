import React from 'react';
import { PlacesContainer, Span } from '../../../../../styles/placesListStyles';
//props from map : data={placesData} handleClick = {handleOnClick}

const PlacesList = (props) => {
    return(
        <PlacesContainer>
            {props.data && props.data.map(data => {
                return(
                    <div key={data.id} className="card">
                        <div className="content">
                            <p>{data.name}</p>
                            <p className="rating">Rating: <Span rating={data.rating}>{data.rating}</Span></p>
                        </div>
                        <button id='addPlaceId' onClick={() => props.handleClick(data.place_id)}>+</button>
                    </div>
            )})}
        </PlacesContainer>
    )
}

export default PlacesList
import React, { useState, useEffect } from 'react';
import { PlacesContainer, Span, ShowMore } from '../../../../../styles/placesListStyles';
//props from map : data={placesData} handleClick = {handleOnClick}

const PlacesList = (props) => {
    const [dataIndex, setDataIndex] = useState(3);
    const [data, setData] = useState([]);
    
    setTimeout(() => setData(props.data.slice(0, dataIndex)))
    const moreItems = () => setDataIndex(dataIndex + 3);

    return(
        <>
            <PlacesContainer>
                {data && data.map(data => {
                    return(
                        <div key={data.id} className="card">
                            <div className="content">
                                <p>{data.name}</p>
                                <p className="rating">
                                    Rating: 
                                    <Span rating={data.rating}>{data.rating}</Span>
                                </p>
                            </div>
                            <button id='addPlaceId' onClick={() => props.handleClick(data.place_id)}>+</button>
                        </div>
                )})}
            </PlacesContainer>
            <ShowMore onClick={moreItems}>More Locations</ShowMore>
        </>
    )
}

export default PlacesList
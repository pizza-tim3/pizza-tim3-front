import React, { useState } from 'react';
import { PlacesContainer, Span, ShowMore } from '../../../../../styles/placesListStyles';
import next from '../../../../../assets/next-orange.png';
import prev from '../../../../../assets/prev-orange.png';
//props from map : data={placesData} handleClick = {handleOnClick}


const PlacesList = (props) => {
    const [dataIndex, setDataIndex] = useState(3);
    const [data, setData] = useState([]);
    
    setTimeout(() => setData(props.data.slice(dataIndex -3, dataIndex)))

    const moreItems = () => {
        const dataLength = props.data.length;
        if(dataIndex < dataLength) {
            setDataIndex(dataIndex + 3);
        }
    }

    const lessItems = () => {
        if(dataIndex > 3) {
            setDataIndex(dataIndex - 3);    
        }
    }


    return(
        <>
            <PlacesContainer>
                {data && data.map(data => {
                    return(
                        <div key={data.reference} className="card">
                            <div className="content">
                                <p>{data.name}</p>
                                <p className="rating">
                                    Rating: <Span rating={data.rating}>{data.rating}</Span>
                                </p>
                                <p>
                                    Location: <span>{data.formatted_address}</span>
                                </p>
                            </div>
                            <button className='addPlaceId' onClick={() => props.handleClick(data.place_id, data.name)}>+</button>
                        </div>
                )})}
            </PlacesContainer>
            <ShowMore onClick={lessItems}>
                <img src={prev} alt="previous arrow" />
            </ShowMore>
            <ShowMore onClick={moreItems}>
                <img src={next} alt="next arrow" />
            </ShowMore>
        </>
    )
}

export default PlacesList

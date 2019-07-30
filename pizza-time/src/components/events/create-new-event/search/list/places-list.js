import React, { useState } from 'react';
import { PlacesContainer, ShowMore } from '../../../../../styles/placesListStyles';
import next from '../../../../../assets/next-orange.png';
import prev from '../../../../../assets/prev-orange.png';
import Place from './place';
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
                        <Place key={data.reference} data={data} className="card" handleClick={props.handleClick}/>
                    )
                })}
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

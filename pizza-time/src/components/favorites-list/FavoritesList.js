import React, { useEffect, useState } from "react";

//displays the actual list of favorites
export default function FavoritesList({ places, filter }) {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (filter === "All") {
      setFavorites(places);
    } else {
      const favs = places.filter(place => place.city === filter);
      setFavorites(favs);
    }
  }, [filter]);
  return (
    <div>
      {console.log("render-list", filter, favorites)}
      {favorites.map((place, idx) => {
        return (
          <div key={idx}>
            <p>{place.name}</p>
            <p>{place.address}</p>
            <img
              src={place.photoUrl}
              alt="location"
              height="200px"
              width="200px"
            />
          </div>
        );
      })}
    </div>
  );
}

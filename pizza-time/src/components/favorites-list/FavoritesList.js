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
  }, [filter, favorites]);
  return (
    <div>
      {favorites.map(place => {
        return (
          <div>
            <p>{place.name}</p>
            <p>{place.address}</p>
            <img src={place.photoUrl} height="200px" width="200px" />
          </div>
        );
      })}
    </div>
  );
}

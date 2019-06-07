import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h3> Favorites Works! </h3>
      {favorites.map(favorite => (
        <div>
          <p>{favorite.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;

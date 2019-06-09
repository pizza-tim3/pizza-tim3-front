import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Favorites = ({ firebase_uid }) => {
  console.log(firebase_uid);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    //Immediately Invoked Function Expression
    /*https://developer.mozilla.org/en-US/docs/Glossary/IIFE#targetText=An%20IIFE%20(Immediately%20Invoked%20Function,and%20contains%20two%20major%20parts.*/
    (async function() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACK_END_URL}/api/favorites/${firebase_uid}`
        );
        const json = await response.json();
        console.log(json);
        setFavorites(json);
      } catch (error) {}
    })();
  }, []);
  return (
    <div>
      <h3> Favorites Works! </h3>
      {favorites.map(favorite => (
        <div>
          <p>{favorite.google_place_id}</p>
        </div>
      ))}
    </div>
  );
};

const mstp = ({ userReducer }) => userReducer;

export default connect(
  mstp,
  {}
)(Favorites);

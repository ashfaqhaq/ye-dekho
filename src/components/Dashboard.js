/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import { Button,  Input, Grid, Image, Icon } from 'semantic-ui-react';
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Card } from "semantic-ui-react";

import Skeleton from "./Skeleton";
import Search from "./SearchBar";
import ReviewCard from "./ReviewCard";
import ShareLink from './ShareLink';


function Dashboard() {
  const { currentUser } = useAuth();


  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    getReviews();
  }, [currentUser]);

  async function getReviews() {
    try {
      const notesRef = db.collection("users").doc(currentUser.displayName);

      notesRef.collection("reviews").onSnapshot(function (querySnapshot) {
        setReviews(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            Plot: doc.data().Plot || "default",
            Title: doc.data().Title || "",
            Rating: doc.data()?.imdbRating || "",
            Runtime: doc.data()?.Runtime || "",
            Type: doc.data()?.Type || "",
            Writer: doc.data()?.Writer || "",
            Poster: doc.data()?.Poster || "",
            Year: doc.data()?.Year || "",
            imdbID: doc.data()?.imdbRating || "",
            imdbRating: doc.data()?.imdbRating || "",
            imdbVotes: doc.data()?.imdbVotes || "",
            genreArray: doc.data()?.genreArray || "",
            isSpoiler: doc.data()?.isSpoiler,
            review: doc.data().review || "",
          }))
        );
        
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  
 

  return (
    <>
      <Search />
      <ShareLink />
      
      {isLoading ? <Skeleton /> : null}

      { !isLoading && reviews.length<1? <h1>You haven't reviewd any title yet!</h1> : null}
      <br />
      <Card.Group>
     
      {reviews &&  <ReviewCard data={reviews} />}
      </Card.Group>
    </>
  );
}

export default Dashboard;

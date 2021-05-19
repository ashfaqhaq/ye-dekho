/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef,useState } from 'react'

import {db} from '../firebase/firebase'
import Skeleton from "./Skeleton";
import { Card } from "semantic-ui-react";

import ReviewCard from "./ReviewCard";

function Share() {
    
    
    const username = useRef();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    var pathArray = window.location.pathname.split('/');
    useEffect(() => {
        
       
         username.current = pathArray[3];
       
        getReviews();
        console.log('reviews got')
        
    }, [])


    

    async function getReviews() {
        try {
          if(username){  
          const notesRef = db.collection("users").doc(username.current);
    
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
          }
        } catch (error) {
          console.log(error);
        }

      }
      

    return (
        <>
            {isLoading && <Skeleton/>}
            <Card.Group>
     
     {reviews &&  <ReviewCard data={reviews}  readOnly ={ true } />}
     </Card.Group>
        </>
    )
}

export default Share

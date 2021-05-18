/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import { Button,  Input, Grid, Image, Icon } from 'semantic-ui-react';
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Card, Icon, Header } from "semantic-ui-react";
import Rating from "@material-ui/lab/Rating";
import {
  Grid,
  Image,
  Label,
  Segment,
  Confirm,
  Button,
} from "semantic-ui-react";

import Skeleton from "./Skeleton";
import Search from "./SearchBar";

function Dashboard() {
  const { currentUser } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    getTodos();
  }, [currentUser]);

  async function getTodos() {
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
    }
  }

  function deleteReview(id) {
    const notesRef = db.collection("users").doc(currentUser.displayName);
    notesRef.collection("reviews").doc(id).delete();
  }

  return (
    <>
      <Search />
      {isLoading ? <Skeleton /> : null}
      <br />
      <Card.Group>
        <Grid celled>
          {reviews.map((data) => {
            return (
              <Grid.Row>
                <Grid.Column computer={3} mobile={8}>
                  {data?.Poster === "N/A" ? (
                    <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                  ) : (
                    <Image src={data?.Poster} />
                  )}
                </Grid.Column>
                <Grid.Column
                  computer={13}
                  mobile={16}
                  style={{ boxShadow: "none" }}
                >
                  <Segment
                    raised
                    fluid
                    floated="right"
                    style={{ boxShadow: "none" }}
                  >
                    <Label
                      as="a"
                      color="red"
                      ribbon="right"
                      style={{ boxShadow: "none" }}
                    >
                      {data?.Type.toUpperCase()}
                    </Label>
                  </Segment>
                  <Card fluid>
                    {isOpen && (
                      <Confirm
                        open={open}
                        onCancel={close}
                        onConfirm={() => deleteReview(data?.id)}
                      />
                    )}
                    <Card.Content fluid>
                      <Card.Header>{data?.Title}</Card.Header>
                      <Card.Meta>{data?.Year}</Card.Meta>
                      <Label.Group tag>
                        <Header as="h4">Genre </Header>{" "}
                        {data?.genreArray?.map((item) => (
                          <Label as="a" color="blue">
                            {item}
                          </Label>
                        ))}
                      </Label.Group>
                      {/* <Label.Group >
                                {data?.Actors.split(',')?.map((item => <Label as='a' image> <img src={`avatars.dicebear.com/v2/avataaars/${item}.svg?options%5bmood%5d%5b%5d=sad`} />{item}</Label>))}
                                </Label.Group> */}
                      <Card.Description>
                        <br />
                        Plot : {data?.review} <br />
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      Rating:{" "}
                      <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        size="large"
                        value={(0 + data?.imdbRating) / 2}
                        precision={0.5}
                        readOnly
                      />
                      <br />
                      Number of votes: {data?.imdbVotes}
                    </Card.Content>
                    <Button onClick={open} negative>
                      <Icon name="trash" size="big" />
                    </Button>
                    {/* <Button onClick={open} negative>
                      <Icon name="trash" size="big" />
                    </Button> */}
                  </Card>

                  {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' /> */}
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      </Card.Group>
    </>
  );
}

export default Dashboard;

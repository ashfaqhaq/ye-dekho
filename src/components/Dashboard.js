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
  Dimmer,
  Confirm,
  Button,
  Tab,
} from "semantic-ui-react";

import Skeleton from "./Skeleton";
import Search from "./SearchBar";

function Dashboard() {
  const { currentUser } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleShow = () => setIsSpoiler(true);
  const handleHide = () => setIsSpoiler(false);

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
        setIsSpoiler(querySnapshot.docs.map((doc) => (doc.data()?.isSpoiler[0])))
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(isSpoiler)
  function deleteReview(id) {
    const notesRef = db.collection("users").doc(currentUser.displayName);
    notesRef.collection("reviews").doc(id).delete();
  }
  const panes = (data) => [
    {
      menuItem: "Review",
      render: () => (
        <Tab.Pane style={{ boxShadow: "none" }}>
          {" "}
          <Dimmer.Dimmable as='h2' blurring dimmed={isSpoiler}>
          <Dimmer active={isSpoiler} onClickOutside={handleHide} />
          <Card.Description style={{ boxShadow: "none" }}>
            {data?.review}{" "}
          </Card.Description>
          </Dimmer.Dimmable>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Plot",
      render: () => (
        <Tab.Pane style={{ boxShadow: "none" }}>{data?.Plot}</Tab.Pane>
      ),
    },
  ];

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
                <Grid.Column computer={3} mobile={8} size="medium">
                  <Label attached="top" centered size="big" color="white">
                    {" "}
                    {data?.Type.toUpperCase()}
                  </Label>
                  {data?.Poster === "N/A" ? (
                    <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                  ) : (
                    <Image src={data?.Poster} size="medium" centered />
                  )}
                </Grid.Column>
                <Grid.Column
                  computer={13}
                  mobile={16}
                  style={{ boxShadow: "none" }}
                >
                  {/* <Segment
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
                  </Segment> */}
                  <Card fluid>
                    {/* <Label
                      as="a"
                      color="blue"
                      ribbon="right"
                      style={{ boxShadow: "none" }}
                    >
                      {data?.Type.toUpperCase()}
                    </Label> */}
                    {isOpen && (
                      <Confirm
                        open={open}
                        onCancel={close}
                        onConfirm={() => deleteReview(data?.id)}
                      />
                    )}
                    <Card.Content fluid style={{ boxShadow: "none" }}>
                      <Card.Header>{data?.Title}</Card.Header>
                      <Card.Meta>{data?.Year}</Card.Meta>
                      <Label.Group tag>
                        <Card.Meta>
                          {" "}
                          Genre <Icon name="tags" size="small" />{" "}
                          {data?.genreArray?.map((item) => (
                            <Label as="a" color="grey">
                              {item}
                            </Label>
                          ))}
                        </Card.Meta>
                      </Label.Group>
                      {/* <Label.Group >
                                {data?.Actors.split(',')?.map((item => <Label as='a' image> <img src={`avatars.dicebear.com/v2/avataaars/${item}.svg?options%5bmood%5d%5b%5d=sad`} />{item}</Label>))}
                                </Label.Group> */}
                      <Tab
                        positive
                        menu={{ secondary: true, pointing: true }}
                        panes={panes(data)}
                      />
                      <Card.Description>
                        Plot : {data?.review} <br />
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      Rating:{" "}
                      <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        size="large"
                        value={0 + data?.Rating}
                        precision={0.5}
                        readOnly
                      />
                      <br />
                      <Header as="h2">
                        <a href={`https://imdb.com/title/${data?.id}`}>
                          <Icon name="imdb" color="yellow" size="big" />
                        </a>
                        <Header.Content>
                          <Rating
                            name="half-rating-read"
                            defaultValue={1}
                            size="large"
                            max={1}
                            precision={0.5}
                            readOnly
                          />
                          {data?.imdbRating}
                          <Header.Subheader>
                            {" "}
                            <Icon name="users" />
                            {data?.imdbVotes}
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                      {/* Number of votes: {data?.imdbVotes} */}
                      <Button floated="right" onClick={open} negative>
                        Delete review <Icon name="trash" size="small" />
                      </Button>
                    </Card.Content>

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

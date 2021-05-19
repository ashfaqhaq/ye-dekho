/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Icon, Header } from "semantic-ui-react";
import Rating from "@material-ui/lab/Rating";
import {
    Grid,
    Image,
    Label,
    Dimmer,
    Confirm,
    Button,
    Tab,
  } from "semantic-ui-react";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";



function ReviewCard(props) {
  const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props]);
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [ID, setID] = useState();

  const open = async (id) => {
    setID(id);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  function showSpoiler(id) {
    let copy = [...data];

    setData(
      copy.map((c) => (c.id === id ? { ...c, isSpoiler: !c.isSpoiler } : c))
    );
  }

  const handleShow = () => setIsSpoiler(true);
  const handleHide = () => setIsSpoiler(false);

  function deleteReview(id) {
    const notesRef = db.collection("users").doc(currentUser.displayName);
    notesRef.collection("reviews").doc(id).delete();
    close();
  }
  const panes = (data) => [
    {
      menuItem: "Review",
      render: () => (
        <Tab.Pane style={{ boxShadow: "none" }} as="h3">
          {" "}
          <h3>
          <Dimmer.Dimmable  blurring dimmed={data.isSpoiler}>
            <Dimmer active={data.isSpoiler} onClickOutside={handleHide} />
            <Card.Description style={{ boxShadow: "none", wordBreak: 'break-all'}}>
              {data?.review}{" "}
            </Card.Description>
          </Dimmer.Dimmable>
          </h3>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Plot",
      render: () => (
        <Tab.Pane style={{ boxShadow: "none" }} as="h3">
          {" "}
          <h3>
          <Card.Description style={{ boxShadow: "none" }}>
            {" "}
            {data?.Plot}{" "}
          </Card.Description>
          </h3>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Grid celled>
      {data &&
        data.map((data) => {
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
                  {data?.isSpoiler && (
                    <Button onClick={() => showSpoiler(data.id)}>
                      {" "}
                      show spoiler
                    </Button>
                  )}
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
                      onConfirm={() => deleteReview(ID)}
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

                    <Tab
                      positive
                      menu={{ secondary: true, pointing: true }}
                      panes={panes(data)}
                    />
                    <Card.Description></Card.Description>
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
                    <Button
                      floated="right"
                      onClick={() => open(data.id)}
                      negative
                    >
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
  );
}
export default ReviewCard;

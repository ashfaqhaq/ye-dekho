import React, { useState } from "react";
import { db } from "../firebase/firebase";

import {
  Button,
  Image,
  Icon,
  Modal,
  Header,
  Form,
  Checkbox,
} from "semantic-ui-react";
import Rating from "@material-ui/lab/Rating";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function ModalComponent({ data }) {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const [isSpoiler, setIsSpoiler] = useState(false);
  const [review, setReview] = React.useState("");

  async function handleSubmit() {
    const userRef = await db
      .collection("users")
      .doc(currentUser.displayName)
      .collection("reviews");

    userRef.doc(data.imdbID).set({
      Plot: data.Plot || "",
      Title: data.Title || "",
      Rating: data?.imdbRating || "",
      Runtime: data?.Runtime || "",
      Type: data?.Type || "",
      Writer: data?.Writer || "",
      Poster: data?.Poster || "",
      Year: data?.Year || "",
      imdbID: data?.imdbRating || "",
      imdbRating: data?.imdbRating || "",
      imdbVotes: data?.imdbVotes || "",
      "no-value": data?.none || "",
      genreArray: data?.Genre.split(",") || "",
      isSpoiler: isSpoiler || false,
      review: review || "",
    });
    setOpen(false);
    history.push("/");
  }

  const labels = {
    0.5: "Useless",
    1: "Bad",
    1.5: "Poor",
    2: "Below Average",
    2.5: "Average",
    3: "Ok",
    3.5: "Good",
    4: "Better",
    4.5: "Excellent",
    5: "Fantastic",
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button floated="right" color="green">
            <Icon name="write square" /> Write a review
          </Button>
        }
      >
        <Modal.Header>{data?.Title}</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={data?.Poster} wrapped />
          <Modal.Description>
            <Form fluid>
              <Header>Write a Review </Header>

              <h3> Describe your opinion of the movie and provide a rating </h3>

              <Form.Field
                control="textarea"
                rows="3"
                value={review}
                onChange={(event) => {
                  setReview(event.target.value);
                }}
                label="Review"
                placeholder="Tell us.. ."
                autoFocus
              />
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && (
                <span mb={2}>{labels[hover !== -1 ? hover : value]}</span>
              )}
              <Form.Field>
                <Checkbox
                  label="My review contains spoilers"
                  onChange={(event, newValue) => {
                    setIsSpoiler(newValue.checked);
                  }}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, Publish it"
            labelPosition="right"
            icon="checkmark"
            disabled={!(value && review)}
            onClick={() => handleSubmit()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalComponent;

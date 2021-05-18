import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Rating from "@material-ui/lab/Rating";
import {
  Grid,
  Image,
  Icon,
  Card,
  Label,
  Segment,
  Header,
} from "semantic-ui-react";
import Modal from "../components/Modal";
import Skeleton from "../components/Skeleton";
import SearchBar from "../components/SearchBar";

function Search() {
  const [data, setData] = useState();
  const [response, setResponse] = useState();

  const parsed = queryString.parse(window.location.search);
  const search = parsed.search;
  // const type = parsed.type || '';

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?t=${search}&apikey=1a35b852`)
      .then((resp) => resp.json())
      .then((json) => {
        if (json.Response === "True") {
          setData(json);
          setResponse(true);
        }
      })
      .catch((err) => console.log(err));
  }, [search]);

  console.log(data);

  return (
    <div>
      <SearchBar />
      {response ? (
        <Grid celled>
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
              <Segment raised floated="right">
                <Label as="a" color="red" ribbon="right">
                  {data?.Type.toUpperCase()}
                </Label>
                <Card fluid style={{ boxShadow: "none" }}>
                  <Card.Content>
                    <Header as="h2">
                      <a href={`https://imdb.com/title/${data?.imdbID}`}>
                        <Icon name="imdb" color="yellow" size="big" />
                      </a>
                      <Header.Content>
                        {data?.Title}
                        <Header.Subheader>{data?.Year}</Header.Subheader>
                      </Header.Content>
                    </Header>
                    {/* <Card.Header floated='left' ></Card.Header>
                       <Card.Meta floated='left'></Card.Meta> */}

                    <Label.Group tag>
                      Genre:{" "}
                      {data?.Genre.split(",")?.map((item) => (
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
                      Plot : {data?.Plot} <br />
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
                    {data && <Modal data={data} />}
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default Search;

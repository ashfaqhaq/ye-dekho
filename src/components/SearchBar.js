import React, { useState } from "react";
import { Input } from "semantic-ui-react";

import { Button, Form, Grid } from "semantic-ui-react";

import { useHistory } from "react-router";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [showInput, setShowInput] = useState("");

  // const [type, setType] = useState("")
  const history = useHistory();
  function onChange(e) {
    setSearchInput(e.target.value);
  }
  async function searchMovie(e) {
    e.preventDefault();

    history.push({
      pathname: "/search",
      search: `?search=${searchInput}`,
      // &type=${type}
    });
    setShowInput(searchInput)
    setSearchInput("");
  }
  return (
    <>
    <Form onSubmit={searchMovie}>
      <Grid columns="equal">
        <Grid.Row style={{ marginTop: "1rem" }}>
          <Grid.Column columns={10} >
           
          <Input
          centered
          autoFocus 
            fluid
            icon="search"
            placeholder="Search..."
            onChange={onChange}
            value={searchInput}
            
            // error={error ? true : false}
          />
        </Grid.Column>
        <Grid.Column columns={10}>
          <Button type="submit" color="teal">
            Search
          </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
    <h1> Search result for : {showInput} </h1>
    </>

  );
}

export default Search;

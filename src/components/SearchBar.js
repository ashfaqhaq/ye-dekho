import React, { useState } from "react";
import { Input } from "semantic-ui-react";

import { Button, Form, Grid } from "semantic-ui-react";

import { useHistory } from "react-router";

function Search() {
  const [searchInput, setSearchInput] = useState("");

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

    setSearchInput("");
  }
  return (
    <Form onSubmit={searchMovie}>
      <Grid columns="equal">
        <Grid.Row columns={2}>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={onChange}
            value={searchInput}
            style={{ marginTop: "1rem" }}
            // error={error ? true : false}
          />

          <Button type="submit" color="teal">
            Submit
          </Button>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

export default Search;

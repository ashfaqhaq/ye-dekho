import React from "react";
import { Placeholder, Grid } from "semantic-ui-react";

const Skeleton = () => (
  <Grid style={{ marginTop: "1rem" }}>
    <Grid.Column width={4}>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
    </Grid.Column>
    <Grid.Column width={12}>
      <Placeholder>
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />

        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />

        <Placeholder.Line length="full" />
        <Placeholder.Line length="full" />
      </Placeholder>
    </Grid.Column>
    <Grid.Column width={3}></Grid.Column>
  </Grid>
);

export default Skeleton;

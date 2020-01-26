import React from "react";
import { makeStyles, Container, Box, Grid } from "@material-ui/core";

import HouseBanner from "./Components/HouseBanner";
import Waiting from "./Components/Waiting";
import WizardList from "./Components/WizardList";

const useStyles = makeStyles(theme => ({
  app: {
    textAlign: "center"
  },
  title: {
    color: theme.palette.primary.main,
    margin: "10px 0"
  }
}));

const App = props => {
  const classes = useStyles();
  return (
    <Container className={classes.app} maxWidth="lg">
      <Waiting />
      <Box>
        <Grid container>
          <Grid item xs={6} sm={3}>
            <HouseBanner id={0} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <HouseBanner id={1} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <HouseBanner id={2} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <HouseBanner id={3} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <WizardList isProfessor={true} />
        <br /> a <br />
        <WizardList isProfessor={false} />
      </Box>
    </Container>
  );
};

export default App;

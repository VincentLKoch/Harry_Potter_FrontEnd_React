import React from "react";
import { connect } from "react-redux";
import { addPointsAction, updateValueAction } from "../actions/addPointsAction";
import { makeStyles, Paper, TextField, Button } from "@material-ui/core";

//In case we want to change images / houses latter
const housesImages = [
  "Gryffindor.png",
  "Hufflepuff.png",
  "Ravenclaw.png",
  "Slytherin.png"
];

const getImageLink = id => "./images/".concat(housesImages[id]);

const makeClasses = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(2)
    },
    flexDirection: "column",
    alignContent: "center"
  }
}));

const houseBanner = props => {
  const classes = makeClasses();

  const addPoints = props.selectedIsProfessor ? (
    <div>
      <TextField
        id="outlined-number"
        label="Adding Points"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
        value={props.houseInputValue}
        onChange={e => props.handleOnChange(e.target.value, props.houseID - 1)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          props.addPoints(
            props.houseInputValue,
            props.selectedId,
            props.houseID
          )
        }
      >
        Validate
      </Button>
    </div>
  ) : (
    <React.Fragment />
  );

  return (
    <React.Fragment>
      <img src={getImageLink(props.houseID - 1)} alt={props.houseName} />
      <div className={classes.paper}>
        <Paper variant="outlined" elevation={3}>
          {props.housePoint}
        </Paper>
      </div>
      {addPoints}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownprops) => {
  return {
    houseID: state.houses[ownprops.id].id,
    houseInputValue: state.houses[ownprops.id].inputValue,
    houseName: state.houses[ownprops.id].name,
    housePoint: state.houses[ownprops.id].point,

    selectedId: state.wizards.selected.id,
    selectedIsProfessor: state.wizards.selected.isProfessor
  };
};

const mapDispatchToProps = dispatch => ({
  addPoints: (nbPoints, professorID, houseID) => {
    return dispatch(addPointsAction(nbPoints, professorID, houseID));
  },
  handleOnChange: (input, id) => {
    if (!isNaN(input)) {
      //if input is a number
      dispatch(updateValueAction(input, +id));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(houseBanner);

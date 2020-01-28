import React, { useState } from "react";
import { connect } from "react-redux";

import {
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
  TextField,
  ButtonGroup,
  Container
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import { selectWizardAction } from "../actions/selectWizardAction";
import { addWizardAction } from "../actions/addWizardAction";
import { removeWizardAction } from "../actions/removeWizardAction";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
    height: "200px"
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "x-large",
    lineHeight: "normal"
  },
  item: {
    maxWidth: "150px",
    maxHeight: "200px"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(53, 53, 53, 0.1) 0%, rgba(201, 201, 201, 0.8) 50%, rgba(83, 83, 83, 0.5) 100%)"
  }
}));

const getImageLink = gender =>
  gender === "M" ? "./images/Male.png" : "./images/Female.png";

const getButton = (isSelected, classStyle) =>
  isSelected ? (
    <CheckBoxIcon className={classStyle} />
  ) : (
    <CheckBoxOutlineBlankIcon className={classStyle} />
  );

const WizardList = props => {
  const classes = useStyles();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("M");
  const [houseID, setHouseID] = useState(undefined);

  const houseForm = () => {
    if (!props.isProfessor) {
      return (
        <ButtonGroup
          variant="contained"
          size="small"
          aria-label="large contained secondary button group"
        >
          <Button onClick={() => setHouseID(undefined)}>Sorting Hat</Button>
          <Button color="secondary" onClick={() => setHouseID(1)}>
            Gryffindor
          </Button>
          <Button color="primary" onClick={() => setHouseID(2)}>
            Hufflepuff
          </Button>
          <Button onClick={() => setHouseID(3)}>Ravenclaw</Button>
          <Button color="secondary" onClick={() => setHouseID(4)}>
            Slytherin
          </Button>
        </ButtonGroup>
      );
    }
    return <React.Fragment />;
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.listOfWizards.map(wizard => (
          <GridListTile key={wizard.id}>
            <img
              src={getImageLink(wizard.gender)}
              alt=""
              className={classes.item}
            />
            <GridListTileBar
              title={wizard.firstname.concat(" ", wizard.lastname)}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton
                  onClick={() =>
                    props.toggleSelect(wizard.id, props.isProfessor)
                  }
                >
                  {getButton(
                    props.selected.id === wizard.id &&
                      props.selected.isProfessor === props.isProfessor,
                    classes.title
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Container>
        <div style={{ margin: "10px" }}>
          <ButtonGroup
            variant="contained"
            size="large"
            aria-label="large contained secondary button group"
          >
            <Button onClick={() => setGender("M")}>M</Button>
            <Button onClick={() => setGender("F")}>F</Button>
          </ButtonGroup>

          <TextField
            id="First_Name"
            label="First Name"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={e => setFName(e.target.value)}
            value={fName}
          />
          <TextField
            id="Last_Name"
            label="Last Name"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={e => setLName(e.target.value)}
            value={lName}
          />

          {houseForm()}
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              props.addingWizard(
                fName,
                lName,
                gender,
                houseID,
                props.isProfessor
              );
            }}
          >
            Add
          </Button>
        </div>
      </Container>
      <Container>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            if (props.selected.id !== -1) props.removeWizard(props.selected);
          }}
        >
          Remove Selected Wizard
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownprops) => ({
  listOfWizards: ownprops.isProfessor
    ? [...state.wizards.professors]
    : [...state.wizards.students],
  isProfessor: ownprops.isProfessor,
  selected: state.wizards.selected
});

const mapDispatchToProps = dispatch => ({
  toggleSelect: (id, isProfessor) => {
    return dispatch(selectWizardAction(id, isProfessor));
  },
  addingWizard: (fName, lName, gender, houseID, isProf) => {
    return dispatch(addWizardAction(fName, lName, gender, houseID, isProf));
  },
  removeWizard: selected => {
    return dispatch(removeWizardAction(selected.id, selected.isProfessor));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardList);

import React from "react";
import { connect } from "react-redux";

import {
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import { selectWizardAction } from "../actions/selectWizardAction";

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
    transform: "translateZ(0)"
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

const getImageLink = genre =>
  genre === "M" ? "./images/Male.png" : "./images/Female.png";

const getButton = (isSelected, classStyle) =>
  isSelected ? (
    <CheckBoxIcon className={classStyle} />
  ) : (
    <CheckBoxOutlineBlankIcon className={classStyle} />
  );

const WizardList = props => {
  const classes = useStyles();

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
    </div>
  );
};

const mapStateToProps = (state, ownprops) => ({
  listOfWizards: ownprops.isProfessor
    ? state.wizards.professors
    : state.wizards.students,
  isProfessor: ownprops.isProfessor,
  selected: state.wizards.selected
});

const mapDispatchToProps = dispatch => ({
  toggleSelect: (id, isProfessor) => {
    console.log("toggleSelect:\n", id, isProfessor);
    return dispatch(selectWizardAction(id, isProfessor));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardList);

import React from "react";
import { connect } from "react-redux";

//In case we want to change images / houses latter
const housesImages = [
  "Gryffindor.png",
  "Hufflepuff.png",
  "Ravenclaw.png",
  "Slytherin.png"
];

const getImageLink = id => "./images/".concat(housesImages[id]);

const addingInput = selected =>
  selected.isProfessor ? <button>button</button> : <React.Fragment />;

const houseBanner = props => {
  return (
    <React.Fragment>
      <img src={getImageLink(props.house.id - 1)} alt="" />
      {props.house.point}
      <br />
      {addingInput(props.selected)}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownprops) => {
  return {
    house: state.houses[ownprops.id],
    selected: state.wizards.selected
  };
};

export default connect(mapStateToProps)(houseBanner);

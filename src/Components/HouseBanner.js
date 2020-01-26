import React from "react";
import { connect } from "react-redux";

const AddingButton = selected =>
  selected.isProfessor ? <button>button</button> : <React.Fragment />;

const houseBanner = props => {
  return (
    <React.Fragment>
      {props.house.name}
      {AddingButton(props.selected)}
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

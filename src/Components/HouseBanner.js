import React from "react";
import { connect } from "react-redux";

const houseBanner = props => {
  return <React.Fragment>{props.house.name}</React.Fragment>;
};

const mapStateToProps = (state, ownprops) => {
  console.log("ownprops:\n", ownprops);
  return {
    house: state.houses[ownprops.id]
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(houseBanner);

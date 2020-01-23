import React from "react";
import { connect } from "react-redux";

const App = props => {
  if (!props.isInit) {
    props.initHouses();
  }
  return <div className="App">a</div>;
};

const mapStateToProps = state => {
  return {
    isInit: state.houses.isInit,
    isWaiting: state.houses.isWaiting,
    houses: state.houses.houses
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

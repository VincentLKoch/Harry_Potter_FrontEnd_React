import React from "react";
import { connect } from "react-redux";
import HouseBanner from "./Components/HouseBanner";

const App = props => {
  return (
    <div className="App">
      a
      <br />
      <HouseBanner id={0} />
      <br />
      <HouseBanner id={1} />
      <br />
      <HouseBanner id={2} />
      <br />
      <HouseBanner id={3} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    houses: state.houses
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

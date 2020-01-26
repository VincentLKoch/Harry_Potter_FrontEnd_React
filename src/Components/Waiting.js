import React from "react";
import { connect } from "react-redux";
import { makeStyles, CircularProgress } from "@material-ui/core";

const style = makeStyles(theme => ({
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "fixed",
    zIndex: "1",
    top: "0",
    left: "0",
    backgroundColor: "rgba(0,0,0, 0.2)",
    overflowX: "hidden",
    transition: "0.25s"
  }
}));

const Waiting = props => {
  const classes = style();
  if (props.isWaiting) {
    return (
      <div className={classes.overlay}>
        <CircularProgress />
      </div>
    );
  }
  return <React.Fragment />;
};

const mapStateToProps = state => {
  return {
    isWaiting: state.wait
  };
};

export default connect(mapStateToProps)(Waiting);

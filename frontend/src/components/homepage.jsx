import React from "react";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import Report from "./report";
import InfectedButton from "./infectedButton";

class Homepage extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Report className="is-full is-half-tablet"></Report>
        <InfectedButton className="is-full is-half-tablet"></InfectedButton>
      </React.Fragment>
    );
  }
}

export default Homepage;

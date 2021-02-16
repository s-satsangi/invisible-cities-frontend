import React from "react";

export default function SearchResults(props) {
  return (
    <div>
      {props.resultsUsername}
      <br /> {props.resultsBio}{" "}
    </div>
  );
}

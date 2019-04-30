import React, { useContext, } from "react";
import styled from "styled-components";
import { FlashContext, } from "../providers/FlashProvider";

const FlashMessage = (props) => {
  const { flash, fadeFlash, setFlash, } = useContext(FlashContext);
  
  if (flash.message) {
    window.scrollTo(0, 0);
    return (
      <FlashContainer 
        color={flash.color}
        onClick={setFlash}
      >
        { flash.message }
        { fadeFlash() }
      </FlashContainer>
    );
  };
  return null;
};

const FlashContainer = styled.div`
  margin-top: 25px;
  padding: 15px;
  margin-right: 10%;
  margin-left: 10%;
  /* TODO: Refactor this to be better */
  background: ${ props => backgroundColors(props.color) };
  border: ${ props => `1px solid ${borderColors(props.color)}` };
  color: ${ props => textColors(props.color) };
  font-weight: bold;
  border-radius: 2px;
  box-shadow: 1px 1px 10px #00000026;
  position: absolute;
  width: 80%;
  z-index: 999;
  cursor: pointer;
`;

const backgroundColors = (color) => {
  switch (color) {
    case "blue":
      return "#dcedf5";
    case "green":
      return "#e4f5dc";
    case "red":
      return "#f5dcdc";
    default:
      return "#dcedf5";
  };
};

const textColors = (color) => {
  switch (color) {
    case "blue":
      return "#4d687d";
    case "green":
      return "#5d7d4d";
    case "red":
      return "#7d4d4d";
    default:
      return "#4d687d";
  };
};

const borderColors = (color) => {
  switch (color) {
    case "blue":
      return "#5f8db1";
    case "green":
      return "#70b15f";
    case "red":
      return "#b15f5f";
    default:
      return "#5f8db1";
  };
};

export default FlashMessage;

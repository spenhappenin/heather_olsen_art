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
  let c;
  switch (color) {
    case "blue":
      c = "#dcedf5";
      break;
    case "green":
      c = "#e4f5dc";
      break;
    case "red":
      c = "#f5dcdc";
      break;
    default:
      c = "#dcedf5";
      break;
  };
  return c;
};

const textColors = (color) => {
  let c;
  switch (color) {
    case "blue":
      c = "#4d687d";
      break;
    case "green":
      c = "#5d7d4d";
      break;
    case "red":
      c = "#7d4d4d";
      break;
    default:
      c = "#4d687d";
      break;
  };
  return c;
};

const borderColors = (color) => {
  let c;
  switch (color) {
    case "blue":
      c = "#5f8db1";
      break;
    case "green":
      c = "#70b15f";
      break;
    case "red":
      c = "#b15f5f";
      break;
    default:
      c = "#5f8db1";
      break;
  };
  return c;
};

export default FlashMessage;

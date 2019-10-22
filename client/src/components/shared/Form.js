import React, { useState, useEffect, } from "react";
import styled from "styled-components";
import arrow from  "../../images/sort-down.svg";

// Core Components

export const Form = styled.form`
  position: relative;
  max-width: 100%;
  font-size: 1rem;
  margin-top: 0em;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: ${ props => props.windowWidth >= 675 ? "row" : "column"};
`;

export const TextField = ({ type, name, label, required, placeholder, onChange: handleChange, value, }) => (
  <InputContainer>
    <MyLabel htmlFor={name}>{label}</MyLabel>
    {
      handleChange ?
        <InputField
          type={type}
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}
          value={value}            
          onChange={(e) => handleChange(e.target.value)}
        /> 
      :
        <InputField
          type={type}
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}                        
        /> 
    }
  </InputContainer>
);

export const TextArea = ({ type, name, label, required, height, placeholder, onChange: handleChange, value }) => (
  <InputContainer>
    <MyLabel htmlFor={name}>{label}</MyLabel>
    { 
      handleChange ? 
        <TextAreaField
          type={type}
          name={name}
          id={name}
          required={required}
          height={height}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      :
        <TextAreaField
          type={type}
          name={name}
          id={name}
          required={required}
          height={height}
          placeholder={placeholder}
        />
    }
  </InputContainer>
);

// Styled Components

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  width: 100%;
  flex: 1 1 auto;
  padding-left: .5em;
  padding-right: .5em;
`;

const MyLabel = styled.label`
  margin-bottom: 5px;
  font-size: .92857143em;
  font-weight: bold;
  text-transform: none;
`;

const InputField = styled.input`
  padding: .67857143em 1em;
  border: 1px solid rgba(34,36,38,.15);
  color: rgba(0,0,0,.87);
  border-radius: .28571429rem;
  line-height: 1.21428571em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin: 0;
  box-shadow: 0 0 0 0 transparent inset;
  font-size: 1em;
  outline: none !important;
`;

const TextAreaField = styled.textarea`
  padding: .67857143em 1em;
  border: 1px solid rgba(34,36,38,.15);
  color: rgba(0,0,0,.87);
  border-radius: .28571429rem;
  line-height: 1.21428571em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin: 0;
  box-shadow: 0 0 0 0 transparent inset;
  font-size: 1em;
  outline: none !important;
  resize: vertical;
  height: ${ props => `${props.height}px`};
`;

export const Dropdown = ({ type, name, label, required, height, placeholder, options, onChange, }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    setValue(e.target.innerText);
    setOpen(!open);
  };

  useEffect( () => {
    onChange(value);
  }, [value]);

  return (
    <InputContainer>
      <MyLabel htmlFor={name}>{label}</MyLabel>
      <DropdownField
        type={type}
        name={name}
        id={name}
        required={required}
        height={height}
        placeholder={placeholder}
        onClick={() => setOpen(!open)}
        hasValue={value !== ""}
        isOpen={open}
      >
        <Placeholder>{ value === "" ? placeholder : value }</Placeholder>
        <DropdownIcon src={arrow} />
      </DropdownField>
      { open && 
        <DropdownMenu>
          {
            options.map( o => (
              <MenuOption onClick={handleClick} onMatch={o.text === value}>
                { o.text }
              </MenuOption>
            ))
          }
        </DropdownMenu>
      }
    </InputContainer>
  );
};

const DropdownIcon = styled.img`
  height: 7px;
`;

const DropdownField = styled.div`
  padding: .67857143em 1em;
  border: 1px solid rgba(34,36,38,.15);
  border-bottom: ${ props => props.isOpen ? "none" : "1px solid rgba(34,36,38,.15)" };
  color: ${ props => props.hasValue ? "rgba(0,0,0,.87)" : "rgba(191,191,191,.87)" };
  border-top-left-radius: .28571429rem;
  border-top-right-radius: .28571429rem;
  border-bottom-left-radius: ${ props => props.isOpen ? "none" : ".28571429rem" };
  border-bottom-right-radius: ${ props => props.isOpen ? "none" : ".28571429rem" };
  line-height: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin: 0;
  box-shadow: 0 0 0 0 transparent inset;
  font-size: 1em;
  outline: none !important;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
  transform: rotateZ(0);
  min-width: 14em;
  min-height: 2.71428571em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownMenu = styled.div`
  border-color: #96c8da;
  /* box-shadow: 0 2px 3px 0 rgba(34,36,38,.15); */
  border: 1px solid rgba(34,36,38,.15);
  max-height: 16.02857143rem;
  overflow-x: hidden;
  overflow-y: auto;
  backface-visibility: hidden;
  border-top-width: 0!important;
  outline: 0;
  margin: 0;
  min-width: calc(100% + 2px);
  width: calc(100% + 2px);
  border-radius: 0 0 .28571429rem .28571429rem;
  transition: opacity .1s ease;


  /* left: 0; */
  /* position: absolute;
  top: 62px;
  z-index: 11;
  will-change: transform,opacity; */

  /* ------   keep menus position stag   ------ */
  /* margin-top: 38px;
  position: absolute;
  z-index: 999; */
`;

const MenuOption = styled.div`
    border-top: 1px solid #fafafa;
    padding: .78571429rem 1.14285714rem!important;
    white-space: normal;
    word-wrap: normal;
    pointer-events: all;
    position: relative;
    cursor: pointer;
    display: block;
    height: auto;
    text-align: left;
    line-height: 1em;
    color: rgba(0,0,0,.87);
    padding: .78571429rem 1.14285714rem!important;
    font-size: 1rem;
    text-transform: none;
    font-weight: 400;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-touch-callout: none;
    background: ${ props => props.onMatch ? "#f8f8f8" : "#fff" };
    font-weight: ${ props => props.onMatch ? "bolder" : "none" };
    z-index: 11;

    &:hover {
      background: rgba(0,0,0,.05);
    }
`;

const Placeholder = styled.span`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

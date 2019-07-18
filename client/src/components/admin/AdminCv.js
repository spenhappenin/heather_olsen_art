import React, { useContext, useState, } from 'react';
import axios from 'axios';
import CvEditForm from './CvEditForm';
import moment from 'moment';
import styled from 'styled-components';
import { FlashContext, } from "../../providers/FlashProvider";

const AdminCv = (props) => {
  const [editing, setEditing] = useState(false);
  
  const { setFlash, } = useContext(FlashContext);

  const displayButtons = (id) => (
    <ButtonContainer>
      <CvButton onClick={() => setEditing(!editing)}>Edit</CvButton>
      <CvButton onClick={() => handleDelete(id)}>Delete</CvButton>
    </ButtonContainer>
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      axios.delete(`/api/cvs/${id}`)
        .then( res => {
          setFlash(`${res.data.title} Deleted`, "green");
          props.delete(id);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  };

  const displayCv = () => {
    const { cv_date, cv_type, location, id, title, } = props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');

    switch (cv_type) {
      case 'current_rep':
        return editing ?
          <CvEditForm
            id={id}
            title={title}
            toggleEdit={() => setEditing(!editing)}
            type='one'
            update={props.update}
          />
        :
          <CvContainer>
            <div>{ title }</div>
            { displayButtons(id) }
          </CvContainer>
      case 'education':
        return editing ?
          <CvEditForm
            date={cv_date}
            id={id}
            title={title}
            toggleEdit={() => setEditing(!editing)}
            type='two'
            update={props.update}
          />
        :
          <CvContainer>
            <div>{title}, {justYear}</div>
            { displayButtons(id) }
          </CvContainer>
      default:
        return editing ?
          <CvEditForm
            date={cv_date}
            id={id}
            location={location}
            title={title}
            toggleEdit={() => setEditing(!editing)}
            type='three'
            update={props.update}
          />
          :
          <CvContainer>
            <div>{formattedDate} - {title} - {location}</div>
            { displayButtons(id) }
          </CvContainer>
    };
  };

  return (
    <div>
      { displayCv() }
    </div>
  );
};

const CvContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  margin-left: 10px;
`;

const CvButton = styled.button`
  background-color: #272727;
  border-color: #272727;
  color: #fff;
  cursor: pointer;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: 15px;
  padding: 10px 15px 10px 15px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #595959;
    transition: background-color 0.3s ease;
  }
`;

export default AdminCv;

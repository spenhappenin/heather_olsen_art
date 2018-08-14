import React from 'react';
import axios from 'axios';
import CvEditForm from './CvEditForm';
import moment from 'moment';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { setFlash, } from '../../actions/flash';
import { setHeaders, } from '../../actions/headers';

class AdminCv extends React.Component {
  state = { editing: false, };

  toggleEdit = () => this.setState({ editing: !this.state.editing, });

  displayButtons = (id) => (
    <ButtonContainer>
      <CvButton onClick={this.toggleEdit}>Edit</CvButton>
      <CvButton onClick={() => this.handleDelete(id)}>Delete</CvButton>
    </ButtonContainer>
  );

  handleDelete = (id) => {
    const { dispatch, } = this.props;

    if (window.confirm("Are you sure you want to delete?"))
      axios.delete(`/api/cvs/${id}`)
        .then( res => {
          const { headers, } = res;
          dispatch(setHeaders(headers));
          dispatch(setFlash('Cv Record Successfully Deleted!', 'green'));
          this.props.delete(id);
        }) 
        .catch( err => {
          const { response: { headers, }, } = err;
          dispatch(setHeaders(headers));
          dispatch(setFlash('Failed to delete CV record at this time. Please try again later.', 'red'));
        })
  };

  displayCv = () => {
    const { cv_date, cv_type, location, id, title, } = this.props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');

    switch (cv_type) {
      case 'current_rep':
        return this.state.editing ?
          <CvEditForm 
            id={id} 
            title={title} 
            toggleEdit={this.toggleEdit} 
            type='one' 
            update={this.props.update} 
          />
        :
          <CvContainer>
            <div>{title}</div>
            { this.displayButtons(id) }
          </CvContainer>
      case 'education':
        return this.state.editing ? 
          <CvEditForm 
            date={cv_date} 
            id={id} 
            title={title} 
            toggleEdit={this.toggleEdit} 
            type='two' 
            update={this.props.update} 
          />
        :
          <CvContainer>
            <div>{title}, {justYear}</div>
            { this.displayButtons(id) }
          </CvContainer>
      default:
        return this.state.editing ? 
          <CvEditForm 
            date={cv_date} 
            id={id} 
            location={location} 
            title={title} 
            toggleEdit={this.toggleEdit} 
            type='three' 
            update={this.props.update} 
          />
        : 
          <CvContainer>
            <div>{formattedDate} - {title} - {location}</div>
            { this.displayButtons(id) }
          </CvContainer>
    };
  };

  render() {
    return (
      <div>
        { this.displayCv() }
      </div>
    );
  };
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
  color: #fff;
  transition: background-color 0.3s ease;
  background-color: #272727;
  border-color: #272727;
  padding: 10px 15px 10px 15px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 8px;
  cursor: pointer;
  margin-right: 15px;

  &:focus {
    outline: 0;
  }
  &:hover {
    transition: background-color 0.3s ease;
    background-color: #595959;
  }
`;

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(AdminCv);

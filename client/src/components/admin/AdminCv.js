import React from 'react';
import axios from 'axios';
import CvEditForm from './CvEditForm';
import moment from 'moment';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { setHeaders, } from '../../actions/headers';
import { setFlash, } from '../../actions/flash';

class AdminCv extends React.Component {
  state = { editing: false, };

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  displayButtons = (id) => (
    <ButtonContainer>
      <CvButton onClick={this.toggleEdit}>Edit</CvButton>
      <CvButton onClick={() => this.handleDelete(id)}>Delete</CvButton>
    </ButtonContainer>
  );

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      axios.delete(`/api/cvs/${id}`)
        .then( res => {
          const { dispatch, } = this.props;
          dispatch(setHeaders(res.headers));
          dispatch(setFlash('CV Deleted!', 'green'));
          this.props.delete(id);
        })
        .catch( err => {
          this.props.dispatch(setHeaders(err.headers));
          this.props.dispatch(setFlash(err.response, 'red'));
        })
  };

  displayCv = () => {
    const { cv_date, cv_type, location, id, title, } = this.props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');

    switch (cv_type) {
      case 'current_rep':
        return this.state.editing ?
          <CvEditForm type='one' id={id} title={title} toggleEdit={this.toggleEdit}/>
        :
          <CvContainer>
            <div>{title}</div>
            { this.displayButtons(id) }
          </CvContainer>
      case 'education':
        return this.state.editing ? 
          <CvEditForm type='two' id={id} title={title} date={cv_date} toggleEdit={this.toggleEdit} />
        :
          <CvContainer>
            <div>{title}, {justYear}</div>
            { this.displayButtons(id) }
          </CvContainer>
      default:
        return this.state.editing ? 
          <CvEditForm type='three' id={id} title={title} date={cv_date} location={location} toggleEdit={this.toggleEdit} />
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

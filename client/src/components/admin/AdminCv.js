import React from 'react';
import CvEditForm from './CvEditForm';
import DeleteCvModal from './DeleteCvModal';
import moment from 'moment';
import styled from 'styled-components';
import { connect, } from 'react-redux';

class AdminCv extends React.Component {
  state = { editing: false, open: false, };

  close = () => this.setState({ open: false });

  show = () => () => this.setState({ open: true });

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  displayButtons = (title, id, open, close) => (
    <ButtonContainer>
      <CvButton onClick={this.toggleEdit}>Edit</CvButton>
      <CvButton onClick={this.show()}>Delete</CvButton>
      <DeleteCvModal cv_title={title} cv_id={id} open={open} onClose={this.close} />
    </ButtonContainer>
  );

  displayCv = () => {
    const { cv_date, cv_type, location, id, title, } = this.props.cv;
    const { open, } = this.state;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');

    switch (cv_type) {
      case 'current_rep':
        return this.state.editing ?
          <CvEditForm type='one' id={id} title={title} toggleEdit={this.toggleEdit}/>
        :
          <CvContainer>
            <div>{title}</div>
            { this.displayButtons(title, id, open, this.close) }
          </CvContainer>
      case 'education':
        return this.state.editing ? 
          <CvEditForm type='two' id={id} title={title} date={cv_date} toggleEdit={this.toggleEdit} />
        :
          <CvContainer>
            <div>{title}, {justYear}</div>
            { this.displayButtons(title, id, open, this.close) }
          </CvContainer>
      default:
        return this.state.editing ? 
          <CvEditForm type='three' id={id} title={title} date={cv_date} location={location} toggleEdit={this.toggleEdit} />
        : 
          <CvContainer>
            <div>{formattedDate} - {title} - {location}</div>
            { this.displayButtons(title, id, open, this.close) }
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

import React from 'react';
import moment from 'moment';
import { connect, } from 'react-redux';
import { CvItem, } from '../../styles/cv';

class Cv extends React.Component {

  displayCv = () => {
    const { cv_date, cv_type, location, title } = this.props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM').toUpperCase();
    const justYear = moment(cv_date).format('YYYY');
    switch (cv_type) {
      case 'current_rep':
        return <CvItem>{title}</CvItem>
      case 'education':
        return <CvItem>{title}, {justYear}</CvItem>
      default:
        return <CvItem>{formattedDate} - {title} - {location}</CvItem>
    }
  }

  render() {
    return(
      <div>
        { this.displayCv() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Cv);
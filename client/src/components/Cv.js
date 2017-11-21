import React from 'react';
import moment from 'moment';

class Cv extends React.Component {

  displayCv = () => {
    const { cv_date, cv_type, location, title } = this.props.cv;
    const formattedDate = moment(cv_date).format('YYYY MMM');
    const justYear = moment(cv_date).format('YYYY');
    switch (cv_type) {
      case 'current_rep':
        return <p>{title}</p>
      case 'education':
        return <p>{title}, {justYear}</p>
      default:
        return <p>{formattedDate} - {title} - {location}</p>
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

export default Cv;
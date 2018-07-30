import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Cv = ({ cv }) => <div>{ displayCv(cv) }</div>;

const displayCv = (cv) => {
  const { cv_date, cv_type, location, title } = cv;
  const formattedDate = moment(cv_date).format('YYYY MMM').toUpperCase();
  const justYear = moment(cv_date).format('YYYY');
  switch (cv_type) {
    case 'current_rep':
      return <CvItem>{title}</CvItem>
    case 'education':
      return <CvItem>{title}, {justYear}</CvItem>
    default:
      return <CvItem>{formattedDate} - {title} - {location}</CvItem>
  };
};

const CvItem = styled.p`
  margin-bottom: 5px !important;
  font-weight: 100 !important;
  color: #4f4f4f !important;
`;

export default Cv;

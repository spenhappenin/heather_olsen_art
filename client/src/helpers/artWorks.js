import React from 'react';
import moment from 'moment';

// TODO: Update this..

const displayStatus = (status, price) => {
  switch(status) {
    case 'for sale':
      return `$${price}`;
    case 'nfs':
      return 'NFS';
    case 'sold':
      return 'Sold';
    default: 
      return '';
  }
};

export const formatArt = (work) => {
  const { id, type_of, title, dimensions, surface, medium, date_complete, url, price, status } = work;
  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${moment(date_complete).format('YYYY')} - ${displayStatus(status, price)}`;
  return { id, src: url, caption, type: type_of, title, medium, dimensions, dateComplete: date_complete, surface, price, status }
};

export const getUrlType = (baseUrl) => {
  const url = baseUrl.split('/')[1];
  const url2 = url.split('admin-')[1];
  const url3 = url2.charAt(0).toUpperCase() + url2.slice(1);
  return <h1>New {url3} Form</h1>
};

export const getCategoryTitle = (category) => {
  return category.replace(new RegExp("\\-"), ' ');
};

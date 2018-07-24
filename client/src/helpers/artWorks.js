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
  const { 
    id, 
    title,
    dimensions, 
    surface, 
    medium, 
    date_complete, 
    url, 
    url_thumbnail, 
    url_mobile, 
    price, 
    status 
  } = work;

  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${moment(date_complete).format('YYYY')} - ${displayStatus(status, price)}`;
  return { 
    id, 
    srcSet: [`${url} 1024w`, `${url_mobile} 750w`],
    url_mobile,
    url_thumbnail,
    caption, 
    title, 
    medium, 
    dimensions, 
    dateComplete: date_complete, 
    surface, 
    price, 
    status,
  }
};

// As an admin, gets the title of the category without the `admin-` attached on front
export const getCategoryTitle = (category) => {
  // TODO: need to split `category` and cut off the `admin-` from the beginning.
  // let c = category.split('-');
  // let discard = c.shift();
  return category.replace(new RegExp("\\-"), ' ');
};

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
}
export const formatArt = (work) => {
  const { id, type_of, title, dimensions, surface, medium, date_complete, url, price, status } = work;
  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${moment(date_complete).format('YYYY')} - ${displayStatus(status, price)}`;
  return { id, src: url, caption, type: type_of, title, medium, dimensions, dateComplete: date_complete, surface, price, status }
}
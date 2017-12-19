import moment from 'moment';

// TODO: Update this..

const displayStatus = (status, price) => {
  switch(status) {
    case 'for sale':
      return `$${price}`;
      break;
    case 'nfs':
      return 'NFS';
      break;
    case 'sold':
      return 'Sold';
      break;
  }
}
export const formatArt = (work) => {
  const { id, type_of, title, dimensions, surface, medium, date_complete, url, price, status } = work;
  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${moment(date_complete).format('YYYY')} - ${displayStatus(status, price)}`;
  return { id, src: url, caption, type: type_of, title, medium, dimensions, dateComplete: date_complete, surface, price }
}
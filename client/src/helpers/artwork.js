import moment from "moment";

// TODO: Update this..
const displayStatus = (status, price) => {
  switch(status) {    
    case "available":
      return `$${price}`;
    case "nfs":
      return "NFS";
    case "sold":
      return "Sold";
    default: 
      return "";
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
    price, 
    status 
  } = work;

  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${moment(date_complete).format('YYYY')} - ${displayStatus(status, price)}`;
  return { 
    id, 
    srcSet: [`${generateImageUrl(url, 1100)} 1024w`, `${generateImageUrl(url, 750)} 750w`],
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

export const generateImageUrl = (url, size) => {
  let newUrl = url.split("/");
  newUrl.splice(6, 0, `c_scale,w_${size}`);
  return newUrl.join("/");  
};

// As an admin, gets the title of the category without the `admin-` attached on front
export const getCategoryTitle = (category) => {
  // TODO: need to split `category` and cut off the `admin-` from the beginning.
  // let c = category.split("-");
  // let discard = c.shift();
  return category.replace(new RegExp("\\-"), " ");
};

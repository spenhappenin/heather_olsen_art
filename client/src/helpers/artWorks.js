// TODO: Update this..
export const formatArt = (work) => {
  const { id, type_of, title, dimensions, surface, medium, date_complete, url, price } = work;
  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${date_complete}`;
  return { id, src: url, caption, type: type_of, title, medium, dimensions, dateComplete: date_complete, surface, price }
}

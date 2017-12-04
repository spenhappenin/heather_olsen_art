// TODO: Update this..
export const formatArt = (work) => {
  const { title, dimensions, surface, medium, date_complete, url } = work;
  const caption = `${title} - ${dimensions} - ${medium} on ${surface} - ${date_complete}`;
  return { src: url, caption }
}

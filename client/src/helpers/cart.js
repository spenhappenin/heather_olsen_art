export const formatPrice = (p) => {
  let price = Number.parseFloat(p).toFixed(2);
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

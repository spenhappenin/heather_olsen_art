category = Category.create(title: "butterflies", published: false, route: 'butterflies', display_image: "https://res.cloudinary.com/dkrn2wmhn/image/upload/c_scale,w_1100/v1585776575/Charaxes%20Candiope.jpg")

butterflies = [
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587613977/Butterfly%20No.%202.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587613768/Butterfly%20No.%201.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587614077/Butterfly%20No.%203.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587614140/Butterfly%20No.%204.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587614400/Butterfly%20No.%205.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786547/Butterfly%20No.%207.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786480/Butterfly%20No.%206.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786701/Butterfly%20No.%209.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786625/Butterfly%20No.%208.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786877/Butterfly%20No.%2012.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786823/Butterfly%20No.%2011.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786765/Butterfly%20No.%2010.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587787043/Butterfly%20No.%2014.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587787098/Butterfly%20No.%2015.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587786972/Butterfly%20No.%2013.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587787243/Butterfly%20No.%2016.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587787308/Butterfly%20No.%2017.jpg",
  "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1587787374/Butterfly%20No.%2018.jpg"
]

butterflies.each_with_index do |url, i|
  category.artworks.create(
    title: "Butterfly #{i + 1}",
    url: url,
    medium: "oil",
    surface: "panel",
    dimensions: "8 x 8",
    price: 5000,
    date_complete: Date.today,
    status: "available",
    shipping_cost: 0.00
  )
end

puts "Butterflies Seeded"

category = Category.create(title: "butterflies", published: false)

butterflies = [
  { title: "Butterfly 1", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/c_scale,w_1100/v1585776575/Charaxes%20Candiope.jpg", medium: "oil", surface: "panel", dimensions: "8 x 8", price: 50.00, date_complete: Date.today, status: "available", shipping_cost: 0.00 },
  { title: "Butterfly 2", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/c_scale,w_1100/v1558072199/Yellow%20Swallowtail.jpg", medium: "oil", surface: "panel", dimensions: "8 x 8", price: 50.00, date_complete: Date.today, status: "available", shipping_cost: 0.00 },
  { title: "Butterfly 3", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/c_scale,w_1100/v1529965990/Butterfly%20Study%20No.%202.jpg", medium: "oil", surface: "panel", dimensions: "8 x 8", price: 50.00, date_complete: Date.today, status: "available", shipping_cost: 0.00 },
  { title: "Butterfly 4", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/c_scale,w_1100/v1586365148/Green%20Butterflies%20on%20Purple%20Orchids.jpg", medium: "oil", surface: "panel", dimensions: "8 x 8", price: 50.00, date_complete: Date.today, status: "available", shipping_cost: 0.00 }
]

butterflies.each do |b, i|
  category.artworks.create_with(b).find_or_create_by(title: b[:title])
end

puts "Butterflies Seeded"

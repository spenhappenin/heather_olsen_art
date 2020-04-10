
###########################
#####     ARTWORK     #####
###########################

artworks_1 = [
  { title: "Charaxes Candiope", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1585776575/Charaxes%20Candiope.jpg", medium: "oil", surface: "panel", dimensions: "10 x 12", price: 250.00, date_complete: Time.now, status: "" },
  { title: "Great Horned Owl", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1585350227/Great%20Horned%20Owl.jpg", medium: "oil", surface: "canvas", dimensions: "16 x 20", price: 500.00, date_complete: Time.now, status: "" },
  { title: "Hannah", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1558020608/Hannah.jpg", medium: "oil", surface: "canvas", dimensions: "15 x 15", price: 100.00, date_complete: Time.now, status: "" },
  { title: "The Marketplace", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1586363693/The%20Marketplace.jpg", medium: "oil", surface: "canvas", dimensions: "12 x 12", price: 200.00, date_complete: Time.now, status: "" },
  { title: "The Queen", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1573779787/The%20Queen.jpg", medium: "oil", surface: "paper", dimensions: "9 x 12", price: 200.00, date_complete: Time.now, status: "" }
]

artworks_2 = [
  { title: "Winged Victory", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1518753975/Winged%20Victory.jpg", medium: "oil", surface: "canvas", dimensions: "30 x 30", price: 150.00, date_complete: Time.now, status: "" },
  { title: "Midnight Smoke", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517895361/Midnight%20Smoke.jpg", medium: "oil", surface: "canvas", dimensions: "16 x 20", price: 0.00, date_complete: Time.now, status: "" },
  { title: "Wildflower", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517891268/Wildflower.jpg", medium: "oil", surface: "canvas", dimensions: "15 x 15", price: 1000.00, date_complete: Time.now, status: "" },
  { title: "Hank and Kirby", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1540318732/Hank%20and%20Kirby.jpg", medium: "oil", surface: "canvas", dimensions: "16 x 20", price: 0.00, date_complete: Time.now, status: "" },
  { title: "Grapes of Wrath", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1519773180/Grapes%20of%20Wrath.jpg", medium: "oil", surface: "paper", dimensions: "9 x 12", price: 200.00, date_complete: Time.now, status: "" }
]

artworks_3 = [
  { title: "Hank", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1562699530/Hank.jpg", medium: "oil", surface: "canvas", dimensions: "10 x 14", price: 0.00, date_complete: Time.now, status: "" },
  { title: "Bright Red Tomato", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1585862557/Bright%20Red%20Tomato.jpg", medium: "oil", surface: "panel", dimensions: "8 x 10", price: 135.00, date_complete: Time.now, status: "" },
  { title: "Franklin", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1586365467/Franklin.jpg", medium: "watercolor", surface: "paper", dimensions: "5 x 8", price: 250.00, date_complete: Time.now, status: "" },
  { title: "Pretty Penny", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1515719831/Pretty%20Penny.jpg", medium: "charcoal", surface: "paper", dimensions: "15 x 15", price: 200.00, date_complete: Time.now, status: "" },
  { title: "Remembering Dad", url: "https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517890082/Remembering%20Dad.jpg", medium: "oil", surface: "canvas", dimensions: "10 x 16", price: 800.00, date_complete: Time.now, status: "" }
]

status = ['available', 'nfs', 'sold']


#############################
#####     AVAILABLE     #####
#############################

available = Category.create(title: 'available', route: 'available', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967241/Blonde%20with%20Glasses.jpg', published: true)
artworks_1.each do |artwork|
  artwork[:status] = "available"
  a = Artwork.create_with(artwork).find_or_create_by(title: artwork[:title])
  a.save
  ArtworkCategory.create(category_id: available.id, artwork_id: a.id)
end


###########################
#####     ANIMALS     #####
###########################

animals = Category.create(title: 'animals', route: 'animals', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967631/Hare%20Study.jpg', published: true)
artworks_2.each do |artwork|
  artwork[:status] = status.sample
  a = Artwork.create_with(artwork).find_or_create_by(title: artwork[:title])
  a.save
  ArtworkCategory.create(category_id: animals.id, artwork_id: a.id)
end


##############################
#####     COMISSIONS     #####
##############################

comissions = Category.create(title: 'comissions', route: 'comissions', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517895361/Midnight%20Smoke.jpg',  published: true)
artworks_3.each do |artwork|
  artwork[:status] = status.sample
  a = Artwork.create_with(artwork).find_or_create_by(title: artwork[:title])
  a.save
  ArtworkCategory.create(category_id: comissions.id, artwork_id: a.id)
end

puts "3 Categories with 5 Artworks Each Created"

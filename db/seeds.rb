User.create(name: 'Heather Olsen', email: 'test@test.com', password: 'password', password_confirmation: 'password')
p 'Test User Created - email: "test@test.com, password: "password"'

status = ['for sale', 'nfs', 'sold']

# --- Create Available ---
available = Category.create(title: 'available', route: 'available', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967241/Blonde%20with%20Glasses.jpg')
25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img, 
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: available.id, artwork_id: artwork.id)
end
p 'Available Category, ArtWorks, and ArtworkCategories seeded!'

# --- Create Figures ---
figures = Category.create(title: 'figures', route: 'figures',display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1518756176/Pucker%20Up%20%28diptych%201%29.jpg')

25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img, 
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: figures.id, artwork_id: artwork.id)
end
p 'Figures Category, ArtWorks, and ArtworkCategories seeded!'

# --- Create Still Life ---
still_life = Category.create(title: 'still life', route: 'still-life', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1519773180/Grapes%20of%20Wrath.jpg')

25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img,  
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: still_life.id, artwork_id: artwork.id)
end
p 'Still Life Category, ArtWorks, and ArtworkCategories seeded!'

# --- Create Animals ---
animals = Category.create(title: 'animals', route: 'animals', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967631/Hare%20Study.jpg')

25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img, 
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: animals.id, artwork_id: artwork.id)
end
p 'Animals Category, ArtWorks, and ArtworkCategories seeded!'

# --- Create Drawings ---
drawings = Category.create(title: 'drawings', route: 'drawings', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1515719879/Female%20Portrait%20Etude.jpg')

25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img, 
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: drawings.id, artwork_id: artwork.id)
end
p 'Drawings Category, ArtWorks, and ArtworkCategories seeded!'
  
# --- Create Comissions ---
comissions = Category.create(title: 'comissions', route: 'comissions', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517895361/Midnight%20Smoke.jpg')

25.times do |i|
  img = Faker::Avatar.image
  artwork = Artwork.create(
    title: Faker::Seinfeld.character, 
    url: img, 
    url_thumbnail: img, 
    url_mobile: img, 
    medium: 'oil', 
    surface: 'canvas', 
    dimensions: '15 x 15', 
    price: 250.00, 
    date_complete: Time.now, 
    status: status.sample
  )
  ArtworkCategory.create(category_id: comissions.id, artwork_id: artwork.id)
end
p 'Comissions Category, ArtWorks, and ArtworkCategories seeded!'

3.times do 
  Cv.create(title: '“President’s Show”', cv_type: 'exhibition', cv_date: Time.now, location: 'SLCC Media Center, SLC, UT')
end

3.times do 
  Cv.create(title: '“Urban Arts Festival”', cv_type: 'festival', cv_date: Time.now, location: 'Gallivan Center SLC, UT')
end

3.times do 
  Cv.create(title: '"1 st Place People’s Choice Award – “Connect”,', cv_type: 'award', cv_date: Time.now, location: 'Urban Arts Gallery, SLC, UT')
end

3.times do 
  Cv.create(title: 'Arts of the World Gallery', cv_type: 'current_rep', cv_date: nil)
end

3.times do 
  Cv.create(title: 'University of Utah', cv_type: 'education', cv_date: Time.now)
end

p 'Cvs seeded!'

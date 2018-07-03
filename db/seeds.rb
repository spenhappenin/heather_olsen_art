
User.create(name: 'Heather Olsen', email: 'test@test.com', password: 'password', password_confirmation: 'password')
puts 'Test User Created!'

status = ['for sale', 'nfs', 'sold']

# --- Create Categories
Category.create(title: 'still life', route: 'still-life', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1519773180/Grapes%20of%20Wrath.jpg')
Category.create(title: 'animals', route: 'animals', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967631/Hare%20Study.jpg')
Category.create(title: 'figures', route: 'figures',display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1518756176/Pucker%20Up%20%28diptych%201%29.jpg')
Category.create(title: 'drawings', route: 'drawings', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1515719879/Female%20Portrait%20Etude.jpg')
Category.create(title: 'comissions', route: 'comissions', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1517895361/Midnight%20Smoke.jpg')
Category.create(title: 'available', route: 'available', display_image: 'https://res.cloudinary.com/dkrn2wmhn/image/upload/v1529967241/Blonde%20with%20Glasses.jpg')

p 'Categories seeded!'

# --- Create Drawings ----
25.times do |i|
  ArtWork.create(title: Faker::Seinfeld.character, url: Faker::Avatar.image, 
                    type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now, status: status.sample)
end

puts 'Drawings seeded!'


# --- Create Comissions ----
25.times do |i|
  ArtWork.create(title: Faker::Seinfeld.character, url: Faker::Avatar.image, 
                    type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now, status: status.sample)
end
puts 'Comissions seeded!'


# --- Create Paintings ----
25.times do |i|
  ArtWork.create(title: Faker::GameOfThrones.character, url: Faker::Avatar.image, 
                    type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now, status: status.sample)
end
                
puts 'Paintings seeded!'

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

puts 'Cvs seeded!'
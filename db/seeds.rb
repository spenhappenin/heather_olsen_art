
User.create(name: 'Heather Olsen', email: 'test@test.com', password: 'password', password_confirmation: 'password')
puts 'Test User Created!'

status = ['for sale', 'nfs', 'sold']


# --- Create Drawings ----
5.times do |i|
  ArtWork.create(title: "LD #{i}", url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1517878603/ld.jpg', 
                    type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now, status: status.sample)
end

puts 'Drawings seeded!'


# --- Create Comissions ----
5.times do |i|
  ArtWork.create(title: "LD #{i + 10}", url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1517878603/ld.jpg', 
                    type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now, status: status.sample)
end    
puts 'Comissions seeded!'


# --- Create Paintings ----
5.times do |i|
  ArtWork.create(title: "LD #{i + 20}", url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1517878603/ld.jpg', 
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
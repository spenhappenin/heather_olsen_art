
User.create(name: 'Heather Olsen', email: 'test@test.com', password: 'password', password_confirmation: 'password')
puts 'Test User Created!'

5.times do 
  ArtWork.create(title: 'Test Name', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511038352/hoa_drawing_tq2vga.jpg',
                  type_of: 'drawing', medium: 'charcoal', surface: 'paper', dimensions: '20 x 20', price: 100.00, date_complete: Time.now)
end
puts 'Drawings seeded!'

5.times do 
  ArtWork.create(title: 'Test Name', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511038369/8x10_300_dpi_jtgek1.jpg',
                  type_of: 'comission', medium: 'oil', surface: 'panel', dimensions: '20 x 30', price: 340.00, date_complete: Time.now)
end
puts 'Comissions seeded!'

5.times do 
  ArtWork.create(title: 'Test Name', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511038401/10x10_300_dpi_lk5spb.jpg',
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '25 x 20', price: 250.00, date_complete: Time.now)
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
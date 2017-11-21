
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
  Cv.create(title: 'Bridge Academy of Art', cv_type: 'education', cv_year: 2015)
end

3.times do 
  Cv.create(title: 'Featured Artist Exhibition, SugarHouse Gallery Stroll', cv_type: 'experience', cv_year: 2015)
end

3.times do 
  Cv.create(title: 'Featured Artist at Sundance Film Festival', cv_type: 'awards', cv_year: 2015)
end

3.times do 
  Cv.create(title: 'Vango Art Gallery', cv_type: 'current_rep', cv_year: nil)
end

puts 'Cvs seeded!'
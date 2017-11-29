
User.create(name: 'Heather Olsen', email: 'test@test.com', password: 'password', password_confirmation: 'password')
puts 'Test User Created!'


# --- Create Drawings ----

ArtWork.create(title: 'Orange', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974869/wr0h7nhytaujlfslfocl.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)

ArtWork.create(title: 'Dream,', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974184/nmf21kslu0hsn9vwpota.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                                                    
                  
ArtWork.create(title: 'Rose', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511977449/y6raia1vxeady1l8srec.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                                    
                  
ArtWork.create(title: 'Dane', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978091/HeatherOlsen_Image1_dt68yc.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                   
                  
ArtWork.create(title: 'Fish', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511975932/mcynxh7t8bctvtxy1vpy.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Girl', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978062/1_Wildflower_12x16_300_dpi_uzt9x4.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Flower Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978118/3_Skulls_and_Roses_lqanro.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Cry', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978126/Olsen_Dysphoria_3_qiarsm.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 

ArtWork.create(title: 'Candle', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974495/g4yse8mdithcdr7zanum.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                                                     
                  
ArtWork.create(title: 'Bike', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978069/bike8x10_300_dpi_oqgta8.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 

ArtWork.create(title: 'Pineapple', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978097/IMG_8944_sw1wdp.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 

ArtWork.create(title: 'Bird', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974363/grdgdxeiv1wnqa86twad.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  
                                    
ArtWork.create(title: 'Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978084/5_Skull_12x16_300dpi_pfcs4k.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                   
                  
ArtWork.create(title: 'Limes', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974589/buvoavuhrafts9afat3l.jpg', 
                  type_of: 'drawing', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  

puts 'Drawings seeded!'


# --- Create Comissions ----

ArtWork.create(title: 'Limes', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974589/buvoavuhrafts9afat3l.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Dane', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978091/HeatherOlsen_Image1_dt68yc.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  
                
ArtWork.create(title: 'Bird', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974363/grdgdxeiv1wnqa86twad.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Rose', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511977449/y6raia1vxeady1l8srec.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  
                  
ArtWork.create(title: 'Candle', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974495/g4yse8mdithcdr7zanum.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                
                  
ArtWork.create(title: 'Fish', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511975932/mcynxh7t8bctvtxy1vpy.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Girl', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978062/1_Wildflower_12x16_300_dpi_uzt9x4.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Flower Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978118/3_Skulls_and_Roses_lqanro.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Cry', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978126/Olsen_Dysphoria_3_qiarsm.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Orange', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974869/wr0h7nhytaujlfslfocl.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)

ArtWork.create(title: 'Dream,', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974184/nmf21kslu0hsn9vwpota.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  
                  
ArtWork.create(title: 'Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978084/5_Skull_12x16_300dpi_pfcs4k.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)  
                  
ArtWork.create(title: 'Bike', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978069/bike8x10_300_dpi_oqgta8.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 

ArtWork.create(title: 'Pineapple', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978097/IMG_8944_sw1wdp.jpg', 
                  type_of: 'comission', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                  

puts 'Comissions seeded!'


# --- Create Paintings ----

ArtWork.create(title: 'Orange', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974869/wr0h7nhytaujlfslfocl.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                
ArtWork.create(title: 'Bird', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974363/grdgdxeiv1wnqa86twad.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Rose', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511977449/y6raia1vxeady1l8srec.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Dream,', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974184/nmf21kslu0hsn9vwpota.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Candle', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974495/g4yse8mdithcdr7zanum.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Limes', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511974589/buvoavuhrafts9afat3l.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Fish', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511975932/mcynxh7t8bctvtxy1vpy.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)
                  
ArtWork.create(title: 'Girl', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978062/1_Wildflower_12x16_300_dpi_uzt9x4.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Flower Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978118/3_Skulls_and_Roses_lqanro.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Cry', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978126/Olsen_Dysphoria_3_qiarsm.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Pineapple', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978097/IMG_8944_sw1wdp.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Dane', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978091/HeatherOlsen_Image1_dt68yc.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now) 
                  
ArtWork.create(title: 'Skull', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978084/5_Skull_12x16_300dpi_pfcs4k.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)  
                  
ArtWork.create(title: 'Bike', url: 'http://res.cloudinary.com/dkrn2wmhn/image/upload/v1511978069/bike8x10_300_dpi_oqgta8.jpg', 
                  type_of: 'painting', medium: 'oil', surface: 'canvas', dimensions: '15 x 15', price: 250.00, date_complete: Time.now)                    

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
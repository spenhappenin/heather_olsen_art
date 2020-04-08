
##########################
#####     VIDEOS     #####
##########################

videos = [
  { title: "", url: "https://youtu.be/CbdRGKlnxX0", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt ante et eros bibendum, eget dignissim sem gravida. Fusce interdum quis felis non commodo. Phasellus porta odio non scelerisque fermentum. Praesent sit amet dignissim nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque tempor lacus vel vehicula tempus. Curabitur ac eros id tortor convallis molestie ultrices ac tortor. Ut finibus, augue eu ultricies tincidunt, dui purus laoreet mauris, nec semper odio elit nec mi." },
  { title: "", url: "https://youtu.be/HJHFiBB7AH4", body: "Aliquam elementum dolor non leo volutpat, vitae elementum velit ultricies. Quisque iaculis ante vitae nisi consequat faucibus. Phasellus scelerisque nibh nisi, ac eleifend ante ultrices sed. Cras luctus ante sit amet nisl venenatis maximus. Quisque id nulla vehicula, pretium libero sit amet, ultricies velit. Aenean sodales volutpat lectus. Donec aliquam, nulla at interdum consequat, sem leo maximus lorem, id faucibus mauris nibh eget eros." },
  { title: "", url: "https://youtu.be/W86cTIoMv2U", body: "In ultrices posuere quam, at fermentum sapien bibendum eleifend. Nulla facilisi. Duis lectus neque, laoreet sit amet mattis id, venenatis eu risus. Sed a pharetra arcu, id eleifend est. Praesent ac fermentum dui, quis mollis erat. Duis non nisl id tellus porta ornare. Proin ornare non lorem in fermentum. Praesent sed commodo ipsum, non scelerisque sem. In dignissim ligula dignissim nunc pulvinar lobortis. Aenean ac diam dolor. Mauris id felis felis." },
]

videos.each_with_index do |video, i|
  Video.create_with(video).find_or_create_by(title: "Video #{i + 1}")
end

puts "#{videos.count} Videos Seeded"

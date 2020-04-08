
#########################
#####     USERS     #####
#########################

User.create(
  name: "Heather Olsen",
  email: "test@test.com",
  password: "password",
  password_confirmation: "password",
  admin: true,
  image: "https://res.cloudinary.com/dtb6lx1s4/image/upload/v1547009309/art.JPG.jpg",
  bio: "<p class=\"ql-align-justify\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ipsum erat, feugiat vel egestas hendrerit, molestie at nibh. Etiam at nisi hendrerit, vehicula ex id, vulputate sapien. Pellentesque iaculis, purus ac hendrerit consectetur, diam enim dictum justo, et consequat orci eros at massa. Cras faucibus pulvinar elit at molestie. Integer in venenatis lectus, et porttitor quam. Cras sed tincidunt turpis. Curabitur nisl felis, viverra ac vulputate et, semper id urna. Suspendisse massa neque, maximus quis urna vel, aliquet fermentum mauris. Aenean condimentum varius lorem volutpat accumsan. Morbi sit amet sollicitudin diam. Aenean a ultricies nisl, eu molestie sapien. Pellentesque consectetur ultrices neque, at feugiat ipsum laoreet sed. Duis at neque enim. Ut facilisis lectus ut dui sagittis, a vestibulum justo euismod. Ut a velit massa. Aliquam blandit consequat lacus a posuere.</p><p class=\"ql-align-justify\">Suspendisse faucibus sed ex rutrum pretium. Maecenas non est euismod, eleifend sapien egestas, varius ligula. Sed vehicula nunc non semper consequat. Maecenas at pretium sem, nec pulvinar nunc. Vestibulum tristique posuere neque ac sodales. Cras rutrum magna nec lobortis volutpat. Nulla viverra id turpis ac tempus. Proin nec faucibus dolor, et laoreet arcu. Maecenas sagittis urna vel ante ornare, a laoreet arcu scelerisque. Ut ultrices libero ante, vel egestas justo egestas sit amet. Proin cursus malesuada augue. Ut scelerisque sapien justo, sit amet eleifend mauris accumsan quis. Nullam lorem ante, commodo ut purus vel, rutrum aliquam lacus. Proin iaculis ipsum ac mauris placerat porta. Aliquam erat volutpat. Nam pellentesque orci vitae urna eleifend elementum.</p><p class=\"ql-align-justify\">Maecenas a pharetra ex, at convallis erat. Vivamus at ipsum massa. Praesent vel imperdiet diam. Proin sit amet luctus ex. Vestibulum venenatis a mi sed aliquet. Vestibulum sed consequat sapien. In volutpat massa sit amet dui ultrices tincidunt. Quisque quis enim vitae turpis feugiat malesuada vitae id lorem.</p><p class=\"ql-align-justify\">Maecenas non sem elementum, sollicitudin quam a, molestie lectus. Suspendisse sed euismod dui. Aliquam ac tellus ante. Donec dolor justo, pretium ac lacus a, vehicula bibendum ante. Sed semper risus non quam gravida, sed consectetur urna accumsan. Ut dictum quam laoreet nisi posuere, ac consectetur mi porta. Vivamus et mollis leo. Nulla facilisi. Proin volutpat pulvinar nisl, imperdiet vulputate ex tincidunt sit amet. Nunc eget sodales lacus. Nunc mollis laoreet arcu id dictum. Cras eu sapien cursus, congue tellus at, pulvinar ligula. Nullam consectetur varius lorem, a ultrices urna ultricies nec. Donec vel aliquam mi. Donec consectetur aliquam vulputate.</p><p class=\"ql-align-justify\">Ut ut nulla ante. In ut mattis elit, vitae fringilla velit. Nulla facilisi. Duis quis tempus dui. Aliquam at velit lacinia sapien pretium interdum. Suspendisse potenti. Ut quis ex eu nisi dignissim ornare eget eleifend nisl. Etiam vel rhoncus odio. Proin eu accumsan ante, ac ullamcorper felis. Mauris vestibulum ac lectus id eleifend. Duis non egestas lectus, ac suscipit elit. Integer sagittis nibh mauris, in ornare eros congue id. Quisque nec semper risus, id elementum nunc. Nulla facilisi. Suspendisse sed lectus risus. Donec ac aliquet nunc, quis vulputate libero.</p><p><br></p>",
  artist_statement: "<p><span style=\"color: rgb(0, 0, 0);\">Donec posuere, elit tempus tempus pulvinar, augue nulla accumsan sem, sit amet ultrices purus risus non lorem. Praesent aliquet porta tortor, non porta quam venenatis eget. Phasellus porta accumsan ex, faucibus sodales lorem vehicula sed. Quisque mollis a augue et suscipit. Cras in tincidunt felis, non tincidunt erat. Vestibulum non mattis est, non vulputate neque. Morbi malesuada velit quis nibh vehicula, non auctor lorem consequat. Etiam tempor dui in purus cursus, sit amet dapibus libero maximus. Cras vitae mattis lorem.</span></p>"
)

puts "Test User Created - email: 'test@test.com', password: 'password'"
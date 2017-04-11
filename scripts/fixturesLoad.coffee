fixtures = require('pow-mongodb-fixtures').connect 'nodepop'
faker = require 'faker'

# Generate random data
users = []
for i in [1..10]
  users.push
    nombre: faker.name.lastName()
    email: faker.internet.email();

articulos = [ '', 'Smartwatch', 'Audi A4', 'Iphone 4', 'Martillo', 'Nike running', 'Yamaha 125cc', 'Nokia 3310', 'Mesa de oficina', 'Mosquetones escalada','Crimpadora']
tags = [ '', 'lifestyle', 'motor', 'mobile', 'work', 'lifestyle', 'motor', 'mobile', 'work', 'lifestyle','work']
compraventa = [false, true, false]

# Generate random data
anuncios = []
for i in [1..10]
  anuncios.push
    nombre: articulos[i]
    venta: compraventa[Math.round(Math.random() * (2 - 1) + 1)]
    precio: Math.round(Math.random() * (500 - 10) + 10)
    foto: '/public/images/gameboy.png'
    tags: tags[i];

# Record these data in the 'myCollectionName' collection
fixtures.clearAndLoad {Usuario: users}, (err) ->
  throw err if err
  console.log '10 users have been recorded!'
  fixtures.close ->
    return

# Record these data in the 'myCollectionName' collection
fixtures.clearAndLoad {anuncios: anuncios}, (err) ->
  throw err if err
  console.log '10 anuncios have been recorded!'
  fixtures.close ->
    process.exit()
    return



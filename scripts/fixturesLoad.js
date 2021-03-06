// Generated by CoffeeScript 1.12.4
(function() {
  var anuncios, articulos, compraventa, faker, fixtures, i, j, k, tags, users;

  fixtures = require('pow-mongodb-fixtures').connect('nodepop');

  faker = require('faker');

  users = [];

  for (i = j = 1; j <= 10; i = ++j) {
    users.push({
      nombre: faker.name.lastName(),
      email: faker.internet.email()
    });
  }

  articulos = ['', 'Smartwatch', 'Audi A4', 'Iphone 4', 'Martillo', 'Nike running', 'Yamaha 125cc', 'Nokia 3310', 'Mesa de oficina', 'Mosquetones escalada', 'Crimpadora'];

  tags = ['', 'lifestyle', 'motor', 'mobile', 'work', 'lifestyle', 'motor', 'mobile', 'work', 'lifestyle', 'work'];

  compraventa = [false, true, false];

  anuncios = [];

  for (i = k = 1; k <= 10; i = ++k) {
    anuncios.push({
      nombre: articulos[i],
      venta: compraventa[Math.round(Math.random() * (2 - 1) + 1)],
      precio: Math.round(Math.random() * (500 - 10) + 10),
      foto: '/public/images/gameboy.png',
      tags: tags[i]
    });
  }

  fixtures.clearAndLoad({
    Usuario: users
  }, function(err) {
    if (err) {
      throw err;
    }
    console.log('10 users have been recorded!');
    return fixtures.close(function() {});
  });

  fixtures.clearAndLoad({
    anuncios: anuncios
  }, function(err) {
    if (err) {
      throw err;
    }
    console.log('10 anuncios have been recorded!');
    return fixtures.close(function() {
      process.exit();
    });
  });

}).call(this);

//# sourceMappingURL=fixturesLoad.js.map

var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');

/**
 * Listar todos los datos de las mascotas
 */
router.get('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM pType NATURAL JOIN pet NATURAL JOIN toy;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });

})

/**
 * Buscar una mascota dado su pid
 */
router.get('/:id', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM pet WHERE pid=${req.params.pid};`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows[0]));
    });
  });

})

/**
 * Crear una mascota dados los datos que se requieren.
 * !Antes de crearlo debería verificar si ya existe.
 */
router.post('/', function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO  pType(pType, breed, pdescription) VALUES ('${req.body.pType}', '${req.body.breed}', '${req.body.pdescription}');
                  INSERT INTO  pet(pname, age, tyid) VALUES ('${req.body.pname}', '${req.body.age}', (SELECT MAX(tyid) FROM pType));
                  INSERT INTO  toy(tname, color, pid) VALUES ('${req.body.tname}', '${req.body.color}', (SELECT MAX(pid) FROM pet));`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });

})

module.exports = router;
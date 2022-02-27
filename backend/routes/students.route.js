
//creazione API RESTful utilizzare mongoose

const express = require('express');
const app = express();
const studentRoute = express.Router();

// Students model database
let student = require('../models/Students');

// Aggiungere uno studente
studentRoute.route('/create').post((req, res, next) => {
  student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Prelevare tutti gli studenti
studentRoute.route('/').get((req, res) => {
  student.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Prelevare un singolo studente
studentRoute.route('/read/:id').get((req, res) => {
  student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Aggiornare uno studente
studentRoute.route('/update/:id').put((req, res, next) => {
  student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Dati aggiornati correttamente')
    }
  })
})

// Eliminare uno studente
studentRoute.route('/delete/:id').delete((req, res, next) => {
  student.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = studentRoute;
let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),  //e' un modo per scambiare le risorse fra due domini differenti
   bodyParser = require('body-parser'),
   dbConfig = require('./database/database');

// Connessione con Database Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database connesso con successo')  //viene allegata callback per la risoluzione o il rifiuto della promise
   },
   error => {
      console.log('Il Database non può connettersi: ' + error)
   }
)

// Settaggio porte con express js
const studentsRoute = require('../backend/routes/students.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/students-app')));
app.use('/', express.static(path.join(__dirname, 'dist/students-app')));
app.use('/api', studentsRoute)

// Creazione porta 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Errore 404 e passaggio al gestore degli errori
app.use((req, res, next) => {
   next(createError(404));
});

// gestore errori
app.use(function (err, req, res, next) {
  console.error(err.message); // messaggio errore nella server console
  if (!err.statusCode) err.statusCode = 500; // Se l'errore  di status code non e' specificato imposta lo status  code come codice interno del server 500'
  res.status(err.statusCode).send(err.message); // Tutte le richieste HTTP devono avere una risposta, quindi inviamo un errore con il suo codice di stato e messaggio'

});




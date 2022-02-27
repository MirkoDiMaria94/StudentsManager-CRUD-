const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definizione schema Database
let Student = new Schema({
   name: {
      type: String
   },
   surname:{
       type: String
   },
   email: {
      type: String
   },

   fieldOfStudy: {
      type: String
   },
   
   dateOfBirth: {
      type: Date
   },

   phoneNumber: {
      type: Number
   }
}, {
   collection: 'students'
})

module.exports = mongoose.model('Student', Student)
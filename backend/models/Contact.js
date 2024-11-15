const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: {
         type: String, 
         required: true,
         unique: true
         },
    lastName: {
         type: String,
        //   required: true 
         },
    email: { 
        type: String 
        // required: true, 
        // unique: true
     },
    phoneNumber: {
         type: String, 
         required: true,
         unique: true
        },
    company: { 
        type: String,
        //  required: true 
        },
    jobTitle: { 
        type: String, 
        // required: true
     }
});
module.exports = mongoose.model('Contact', contactSchema);




// const mongoose = require('mongoose');

// const contactSchema = new mongoose.Schema({
//     firstName: { type: String, required: [true, 'First name is required'] },
//     lastName: { type: String },
//     email: { type: String  },
//     phoneNumber: { type: String, required: [true, 'Phone number is required'] },
//     company: { type: String },
//     jobTitle: { type: String }
// });

// module.exports = mongoose.model('Contact', contactSchema);

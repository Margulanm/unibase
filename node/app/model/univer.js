const mongoose = require('mongoose');

const univerShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    namerus: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        default: '/img/defaultUniver.jpg'
    },
    country: {
        type: String,
        required: true
    },
    tips: {
        type: [{
            title: String,
            text: String
        }]
    },
    requirements: {
        type: [{
            title: String,
            text: String
        }]
    },
    grants: {
        type: [{
            title: String,
            text: String,
        }
    ],
    },
    pol:String,
    pollink:String,
   
    
    faculties: {
        type: [{
            name: String,
            subjects: [String] 
        }]
    },

    price: String,
     pricepol: String,
    location: String,
    phone: String,
    email: String,
    address: String,
    website: String,

});

const Univer = mongoose.model('Univer', univerShema);

module.exports = Univer;

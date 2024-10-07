const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tax: { type: Number, required: true },
    code: { type: String, required: true, unique: true } // Make code a unique field
});

module.exports = mongoose.model('Item', ItemSchema);


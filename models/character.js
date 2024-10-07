const mongoose = require('mongoose');

// Reference to the Item model with quantity
const InventoryItemSchema = new mongoose.Schema({
    itemCode: { type: String, required: true }, // Reference to the item code
    quantity: { type: Number, default: 1 } // Quantity of the item in inventory
});

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true, default: 100 },
    level: { type: Number, required: true },
    experience: { type: Number, required: true },
    stats: {
        str: { type: Number, required: true },
        dex: { type: Number, required: true },
        con: { type: Number, required: true },
        int: { type: Number, required: true },
        wis: { type: Number, required: true },
        cha: { type: Number, required: true }
    },
    elementalAffinity: { type: String, required: true },
    inventory: [InventoryItemSchema] // Inventory contains itemCode and quantity
});

module.exports = mongoose.model('Character', CharacterSchema);



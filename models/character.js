const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
});

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true },
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
    inventory: [[InventoryItemSchema]]
});

module.exports = mongoose.model('Character', CharacterSchema);

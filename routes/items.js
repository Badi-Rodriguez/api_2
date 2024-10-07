const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Item = require('../models/item');

// Add item to a character's inventory by code
router.post('/:id/inventory', async (req, res) => {
    try {
        const { itemCode, quantity } = req.body;
        console.log('Received itemCode:', itemCode);

        // Check if the item exists by its code
        const item = await Item.findOne({ code: itemCode });
        if (!item) {
            console.log('Item not found with code:', itemCode);
            return res.status(404).send({ message: 'Item not found' });
        }

        // Find the character by its ID
        const character = await Character.findById(req.params.id);
        if (!character) {
            console.log('Character not found with ID:', req.params.id);
            return res.status(404).send({ message: 'Character not found' });
        }

        // Add the item to the character's inventory using the code
        character.inventory.push({ itemCode: item.code, quantity: quantity || 1 });

        await character.save();
        res.status(200).send(character);
    } catch (error) {
        console.error('Error while adding item to inventory:', error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;

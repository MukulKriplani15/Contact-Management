
const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Create new contact

// router.post('/', async (req, res) => {
//     try {
//         // Check if a contact with the same first and last name already exists
//         const existingContact = await Contact.findOne({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName
//         });

//         if (existingContact) {
//             return res.status(409).json({ error: 'A contact with this name already exists.' });
//         }

//         const contact = new Contact(req.body);
//         await contact.save();
//         res.status(201).json(contact);
//     } catch (err) {
//         if (err.code === 11000) {  // MongoDB duplicate key error code
//             const duplicateField = Object.keys(err.keyValue)[0];
//             let errorMessage = 'A contact with this value already exists.';
//             // if (duplicateField === 'email') {
//                 // errorMessage = 'A contact with this email already exists.';
//             // } 
//              if (duplicateField === 'phoneNumber') {
//                 errorMessage = 'A contact with this phone number already exists.';
//             }
//             return res.status(409).json({ error: errorMessage });
//         }
//         res.status(500).json({ error: 'Server error' });
//     }
// });

router.post('/', async (req, res) => {
    try {
        // Check if a contact with the same first and last name already exists
        const existingNameContact = await Contact.findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        
        if (existingNameContact) {
            return res.status(409).json({ error: 'A contact with this name already exists.' });
        }

        // Check if a contact with the same phone number already exists
        const existingPhoneContact = await Contact.findOne({ phoneNumber: req.body.phoneNumber });
        
        if (existingPhoneContact) {
            return res.status(409).json({ error: 'A contact with this phone number already exists.' });
        }

        // If no duplicates are found, save the new contact
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a contact
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});


// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

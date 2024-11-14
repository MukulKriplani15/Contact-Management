import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid2, Typography } from '@mui/material';
import { createContact, updateContact } from '../api';

function ContactForm({ fetchContacts, editContact, clearEditContact }) {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
    });

    useEffect(() => {
        if (editContact) setContact(editContact);
    }, [editContact]);

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editContact) {
            await updateContact(editContact._id, contact);
        } else {
            await createContact(contact);
        }
        fetchContacts();
        setContact({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            company: '',
            jobTitle: ''
        });
        clearEditContact();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {editContact ? 'Update Contact' : 'Add New Contact'}
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12} sm={6}>
                    <TextField label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} fullWidth required />
                </Grid2>
                <Grid2 item xs={12} sm={6}>
                    <TextField label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} fullWidth  />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField label="Email" name="email" value={contact.email} onChange={handleChange} fullWidth required />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField label="Phone Number" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} fullWidth required />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField label="Company" name="company" value={contact.company} onChange={handleChange} fullWidth  />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField label="Job Title" name="jobTitle" value={contact.jobTitle} onChange={handleChange} fullWidth  />
                </Grid2>
                <Grid2 item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editContact ? 'Update Contact' : 'Add Contact'}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}

export default ContactForm;

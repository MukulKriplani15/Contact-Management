import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';
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

    const [error, setError] = useState('');  // To store the error message

    useEffect(() => {
        if (editContact) setContact(editContact);
    }, [editContact]);

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error message

        try {
            if (editContact) {
                await updateContact(editContact._id, contact); // Update existing contact
            } else {
                await createContact(contact); // Create a new contact
            }
            fetchContacts();
            clearEditContact();
            setContact({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: ''
            });
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError(err.response.data.error);  // Display specific error message from backend
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {editContact ? 'Update Contact' : 'Add New Contact'}
            </Typography>
            {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="First Name" name="firstName" value={contact.firstName} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Last Name" name="lastName" value={contact.lastName} onChange={handleChange} fullWidth  />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Email" name="email" value={contact.email} onChange={handleChange} fullWidth  />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Phone Number" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Company" name="company" value={contact.company} onChange={handleChange} fullWidth  />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Job Title" name="jobTitle" value={contact.jobTitle} onChange={handleChange} fullWidth  />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editContact ? 'Update Contact' : 'Add Contact'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default ContactForm;

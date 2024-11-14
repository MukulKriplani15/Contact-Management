
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { fetchContacts } from './api';

function App() {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);

    const loadContacts = async () => {
        const { data } = await fetchContacts();
        setContacts(data);
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const clearEditContact = () => setEditContact(null);

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Management
            </Typography>
            <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem' }}>
                <ContactForm fetchContacts={loadContacts} editContact={editContact} clearEditContact={clearEditContact} />
            </Paper>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <ContactsTable contacts={contacts} fetchContacts={loadContacts} setEditContact={setEditContact} />
            </Paper>
        </Container>
    );
}

export default App;

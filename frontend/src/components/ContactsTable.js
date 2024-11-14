import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { deleteContact } from '../api'; 
function ContactsTable({ contacts, fetchContacts, setEditContact }) {
    const handleDelete = async (id) => {
        await deleteContact(id);
        fetchContacts();
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>First Name</strong></TableCell>
                        <TableCell><strong>Last Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone Number</strong></TableCell>
                        <TableCell><strong>Company</strong></TableCell>
                        <TableCell><strong>Job Title</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact._id}>
                            <TableCell>{contact.firstName}</TableCell>
                            <TableCell>{contact.lastName}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phoneNumber}</TableCell>
                            <TableCell>{contact.company}</TableCell>
                            <TableCell>{contact.jobTitle}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" onClick={() => setEditContact(contact)} style={{ marginRight: '0.5rem' }}>
                                    Edit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(contact._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ContactsTable;

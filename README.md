Contact Management - Mini CRM

Description - This Contact Management feature is part of a mini CRM (Customer Relationship Management) system, designed to help users manage client and customer contact information efficiently. The app supports creating, reading, updating, and deleting (CRUD) contact information. It’s built using a React frontend with Material UI (MUI) for the user interface and a Node.js/Express backend with MongoDB for data storage.

Features: 

Add New Contacts: Create a new contact with fields like name, email, phone number, company, and job title.
View Contacts: Display a list of contacts in a paginated table with sorting options.
Edit Contacts: Update contact details to keep information current.
Delete Contacts: Remove outdated or duplicate contacts.

Tech Stack:

Frontend: React, Material UI (MUI)
Backend: Node.js, Express
Database: MongoDB (Mongoose ODM)

Setup Instructions

Prerequisites:
Node.js and npm
MongoDB installed locally or use a MongoDB Atlas account
Git

Installation
1.Clone the repository:

git clone https://github.com/your-username/contact-management-crm.git
cd contact-management-crm

2.Backend Setup

cd backend
npm install
Create a .env file in the backend directory and add your environment variables:
PORT=5000
DB_URI=mongodb://localhost:27017/contactDB # Replace with your MongoDB connection string

Start the backend server:

npm start
Frontend Setup

Navigate to the frontend folder:
cd ../frontend

Install dependencies:

npm install
Start the frontend development server:
npm start
The frontend will run on http://localhost:3000 and the backend on http://localhost:5000.

API Endpoints

Method	Endpoint	Description
POST	/contacts	Add a new contact
GET	/contacts	Retrieve all contacts
PUT	/contacts/:id	Update a specific contact
DELETE	/contacts/:id	Delete a specific contact

Database Schema
In MongoDB, the contacts collection uses the following schema:

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true }
});

Major Technical Decisions
MongoDB was chosen as the database due to its flexibility with JSON-like documents, which simplifies the data model and interactions for a contact management system.
MUI (Material UI) was selected for the frontend components to provide a responsive and modern UI with built-in styling and theming options.
Express & Node.js: Lightweight framework for building RESTful APIs and managing the CRUD operations for contacts.


How Each Part Works
Frontend: Users interact with the app through a React-based interface, where they can add, view, edit, and delete contacts. MUI components provide a polished, responsive design for forms and tables.

Backend: The Express server handles API requests and connects to MongoDB using Mongoose. It validates and manages CRUD operations for contacts.

Database: MongoDB stores the contact information with Mongoose schemas defining data structure and validation rules.

Challenges and Solutions

First It was challenging for me to use Material UI than with the help of resources present on Internet I found the solution.

Initially I have made email as required in my contactSchema but which should not be required also as we can save someone's contact without email also so for removing the required function we can not do only by removing the code (required : true) infact we have to write a code in mongoDB shell to remove this functionality as we have to delete the index which was created already the code is used to solve this problem is "db.contacts.dropIndex("email_1")"

While submitting the contact details sometimes runtime error arises for which I have add a functionality in the mongoDB connection code that is "serverSelectionTimeoutMS: 5000"

State Management in React: Managing edit mode and form state was essential for a smooth user experience. I solved this by using React’s useState and passing state as props between components.
API Integration: Implementing asynchronous functions with Axios to handle API calls for CRUD operations. Error handling was added to manage API failures gracefully.
Database Validation: To ensure data integrity, required fields were set in the Mongoose schema, and unique constraints were used for phone number.



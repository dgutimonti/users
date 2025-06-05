// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// User class
class User {
    constructor(id, name, username, email, password, updatedAt, image, rol) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.updatedAt = updatedAt;
        this.image = image;
        this.rol = rol;
    }

    updateProfile(newData) {
        if (newData.name) this.name = newData.name;
        if (newData.username) this.username = newData.username;
        if (newData.email) this.email = newData.email;
        if (newData.image) this.image = newData.image;
        this.updatedAt = new Date();
    }

    passwordValid(inputPassword) {
        return this.password === inputPassword;
    }
}

// In-memory data
let users = [
    new User(1, 'John Doe', 'johndoe', 'john@example.com', 'password123', new Date(), 'john.jpg', 'admin'),
    new User(2, 'Jane Smith', 'janesmith', 'jane@example.com', 'password123', new Date(), 'jane.jpg', 'user'),
    new User(3, 'Robert Brown', 'robbrown', 'robert@example.com', 'password123', new Date(), 'robert.jpg', 'user')
];

// Add Daniel Ivan Gutierrez Montiel
users.push(
    new User(
        users.length + 1,
        'Daniel Ivan Gutierrez Montiel',
        'danielguti',
        'daniel@gutierrezmontiel.com',
        'password123',
        new Date(),
        'daniel.jpg',
        'user'
    )
);

// Route to show users in an HTML table
app.get('/users/table', (req, res) => {
    let tableRows = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.rol}</td>
        </tr>
    `).join('');
    res.send(`
        <html>
        <head>
            <title>Users Table</title>
        </head>
        <body>
            <h1>Users</h1>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                ${tableRows}
            </table>
        </body>
        </html>
    `);
});

// CRUD Endpoints
// CRUD Endpoints

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, username, email, password, image, rol } = req.body;
    const newUser = new User(
        users.length + 1,
        name,
        username,
        email,
        password,
        new Date(),
        image,
        rol
    );
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        user.updateProfile(req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
});
app.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});
// Start server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

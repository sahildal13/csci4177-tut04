const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        email: "abc@abc.ca",
        firstName: "ABC",
        id: "5abf6783"
    },
    {
        email: "xyz@xyz.ca",
        firstName: "XYZ",
        id: "5abf674563"
    }
];

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: " Add /users to get user data."
    });
});

//GET: Retrieve all users
app.get('/users', (req, res) => {
    if (users.length > 0) {
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: users
        });
    } else {
        res.status(404).json({
            message: "No users found",
            success: false
        });
    }
});

//PUT: Modify existing user
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, firstName } = req.body;
    let userFound = false;

    users = users.map(user => {
        if (user.id === id) {
            userFound = true;
            return {
                ...user,
                email: email || user.email,
                firstName: firstName || user.firstName
            };
        }
        return user;
    });

    if (userFound) {
        res.status(200).json({
            message: "User information updated",
            success: true
        });
    } else {
        res.status(404).json({
            message: "Invalid entry - User not found",
            success: false
        });
    }
});

//POST: Add new users
app.post('/add', (req, res) => {
    const { email, firstName } = req.body;

    const id = Math.random();

    const newUser = {
        email,
        firstName,
        id
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added",
        success: true
    });
});

// GET: Find a single user using ID
app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id === id);

    if (user) {
        res.status(200).json({
            success: true,
            user: user
        });
    } else {
        res.status(404).json({
            message: "User not found",
            success: false
        });
    }
});


//Setting up server port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

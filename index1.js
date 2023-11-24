const express = require('express');
const app = express();

require('dotenv').config();

const API_KEY = process.env.API_KEY;

const apiKeyValidation = (req, res, next) => {
    const userApiKey = req.get("x-api-key");
    if (userApiKey && userApiKey === API_KEY){
    next();
    }else {
        res.status(401).send('Invalid API hey');
    }
    next();
};
app.use(express.json());
app.use(apiKeyValidation);
const port = 3000;

const users = [
    {
        "name": "Jair",
        "lastname": "Murillo",
        "Email": "jair@exampol.com",
        "Phone_number": 12345678901,
        "Address": "Cll #1"
    },

    {
        "name": "Andres",
        "lastname": "Murillo",
        "Email": "andres@exampol.com",
        "Phone_number": 12345678902,
        "Address": "Cll #2"
    },

    {
        "name": "Angela",
        "lastname": "Murillo",
        "Email": "angela@exampol.com",
        "Phone_number": 12345678903,
        "Address": "Cll #3"
    },

    {
        "name": "Alejandro",
        "lastname": "Murillo",
        "Email": "alejandro@exampol.com",
        "Phone_number": 12345678904,
        "Address": "Cll #4"
    },

    {
        "name": "Natalia",
        "lastname": 'Murillo',
        "Email": "natalia@exampol.com",
        "Phone_number": 12345678905,
        "Address": "Cll #5"
    },

    {
        "name": "Juana",
        "lastname": "Murillo",
        "Email": "juana@exampol.com",
        "Phone_number": 12345678906,
        "Address": "Cll #6"
    }

];
app.get('/users', function (req, res) {
    const foundUsers = users
    users.forEach((user) => {
        if (user.lastname === req.query.lastname) {
            foundUsers.push(user)
        }
    });
    return res.send(foundUsers);
});
app.get('/', function (req, res) {
    return res.end(users)
    console.log(users)
});

app.get('/users/:id', function (req, res) {
    const index = req.params.id;
    return res.send(users[index]);
});

app.post('/users', function (req, res) {
    console.log(req.body)
    req.body.forEach((user) => {
        users.push(user)
        res.status(201)
    })
    
    console.log(users)
    return res.send('Te haz registrado exitosamente');

});

app.put('/users/:id', function (req, res) {
    const index = req.params.id;
    users[index] = req.body;
    return res.send(users[index]);
})

app.delete('/users/:id', function (req, res) {
    const index = req.params.id;
    // users[index] = req.body;
    users.splice(index, 1);
    return res.send(users);

});


app.listen(port, function () {
    console.log(`server is run in port 3000`);
});
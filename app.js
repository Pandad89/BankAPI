const express = require('express');
const fs = require('fs');
const app = express();

const { addCustomer, depositFunds, withdrawFunds, updateCredit, transferFunds, readCustomer, listCustomers } = require('./customers')

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// app.get('/customers', (req, res) => {
//     try {
//         res.status(200).send(listCustomers());
//     } catch (e) {
//         res.status(400).send({ error: e.message });
//     }
// });

app.post('/customers/add', (req, res) => {
    try {
        res.status(201).send(addCustomer(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.patch('/customers/dep', (req, res) => {
    try {
        res.status(201).send(depositFunds(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.patch('/customers/with', (req, res) => {
    try {
        res.status(201).send(withdrawFunds(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.patch('/customers/cred', (req, res) => {
    try {
        res.status(201).send(updateCredit(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.patch('/customers/trans', (req, res) => {
    try {
        res.status(201).send(transferFunds(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.get('/customers/cust', (req, res) => {
    try {
        res.status(201).send(readCustomer(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})
app.get('/customers/list', (req, res) => {
    try {
        res.status(201).send(listCustomers(req.body));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})



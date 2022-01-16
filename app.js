const path = require('path');
const express = require('express');
const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const customers = require('./customers.js')

const app = express();

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add new customer to database',
        builder: {
            id: {
                describe: "Customer's ID number",
                demandOption: true,
                type: 'number'
            }
        },
        handler(argv) {
            customers.addCustomer(argv.id, argv.funds, argv.credit);
        }
    })
    .command({
        command: 'deposit',
        describe: "Deposit funds into the customer's account",
        builder: {
            id: {
                describe: "Customer's ID number",
                demandOption: true,
                type: 'number'
            },
            funds: {
                describe: "Requested amount of funds to add",
                demandOption: true,
                type: 'number'
            },
        },
        handler(argv) {
            customers.depositFunds(argv.id, argv.funds);
        }
    })
    .command({
        command: 'withdraw',
        describe: "Withdraw funds from the customer's account",
        builder: {
            id: {
                describe: "Customer's ID number",
                demandOption: true,
                type: 'number'
            },
            funds: {
                describe: "Requested amount of funds to add",
                demandOption: true,
                type: 'number'
            },
        },
        handler(argv) {
            customers.withdrawFunds(argv.id, argv.funds);
        }
    })
    .command({
        command: 'updateCredit',
        describe: "Update a customer's credit score",
        builder: {
            id: {
                describe: "Customer's ID number",
                demandOption: true,
                type: 'number'
            },
            credit: {
                describe: "Customer's credit score",
                demandOption: true,
                type: 'number'
            },
        },
        handler(argv) {
            customers.updateCredit(argv.id, argv.credit);
        }
    })
    .command({
        command: 'transfer',
        describe: 'Transfer funds from one customer to another',
        builder: {
            from: {
                describe: "Sending customer's ID number",
                demandOption: true,
                type: 'number'
            },
            to: {
                describe: "Recieving customer's ID number",
                demandOption: true,
                type: 'number'
            },
            funds: {
                describe: "Requested amount of funds to transfer",
                demandOption: true,
                type: 'number'
            },
        },
        handler(argv) {
            customers.transferFunds(argv.from, argv.to, argv.funds);
        }
    })
    .command({
        command: 'customerDetails',
        describe: 'Display the information of a specific customer',
        builder: {
            id: {
                describe: "Customer's ID number",
                demandOption: true,
                type: 'number'
            }
        },
        handler(argv) {
            customers.readCustomer(argv.id);
        }
    })
    .command({
        command: 'customerList',
        describe: 'Display the information of all registered customers',
        handler() {
            customers.listCustomers();
        }
    })
    .parse()


// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })
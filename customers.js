const fs = require('fs');
const chalk = require('chalk');


const addCustomer = (body) => {
    const customers = loadCustomers();
    const existingId = customers.find((customer) => customer.id === body.id);

    if (!existingId) {
        customers.push({
            id: body.id,
            funds: 0,
            credit: 0
        })
        saveCustomer(customers);
        throw ('New customer added to database');
    } else {
        throw Error('Customer ID already exists in database');
    }
}

const depositFunds = (body) => {
    const customers = loadCustomers();
    const existingId = customers.find((customer) => customer.id === body.id);
    let customer = customers.find((customer) => customer.id === body.id);

    if (existingId) {
        customer.funds = customer.funds + body.funds;

        saveCustomer(customers);
        console.log(chalk.greenBright.inverse('Funds deposited successfully'));
    } else {
        throw Error('Please enter a valid ID');
    }
}

const withdrawFunds = (body) => {
    const customers = loadCustomers();
    const existingId = customers.find((customer) => customer.id === body.id);
    let customer = customers.find((customer) => customer.id === body.id);

    if (existingId) {
        customer.funds = customer.funds - body.funds;

        saveCustomer(customers);
        console.log(chalk.greenBright.inverse('Funds withdrawn successfully'));
    } else {
        throw Error('Please enter a valid ID');
    }
}
const updateCredit = (body) => {
    const customers = loadCustomers();
    const existingId = customers.find((customer) => customer.id === body.id);
    const customer = customers.find((customer) => customer.id === body.id);

    if (existingId) {

        customer.credit = body.credit;

        saveCustomer(customers);
        console.log(chalk.greenBright.inverse('Credit score updated successfully'))
    } else {
        throw Error('Please enter a valid ID');
    }
}
const transferFunds = (body) => {
    const customers = loadCustomers();
    const existingId1 = customers.find((customer) => customer.id === body.id1);
    const existingId2 = customers.find((customer) => customer.id === body.id2);
    const customer1 = customers.find((customer) => customer.id === body.id1);
    const customer2 = customers.find((customer) => customer.id === body.id2);

    if (existingId1) {
        if (existingId2) {
            customer1.funds = customer1.funds - body.funds;
            customer2.funds = customer2.funds + body.funds;

        } else {
            console.log(chalk.red.inverse('Please enter a valid recipient ID'))
        }
        saveCustomer(customers);
        console.log(chalk.greenBright.inverse('Funds transferred successfully'))
    } else {
        console.log(chalk.red.inverse('Please enter a valid sender ID'));
    }

}
const readCustomer = (body) => {
    const customers = loadCustomers();
    const customer = customers.find((customer) => customer.id === body.id);

    return customer
}
const listCustomers = () => {
    const dataBuffer = fs.readFileSync('customers.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
}

saveCustomer = (customers) => {
    const dataJSON = JSON.stringify(customers);
    console.log(dataJSON);
    fs.writeFileSync('customers.json', dataJSON);
}

const loadCustomers = () => {
    try {
        const dataBuffer = fs.readFileSync('customers.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

module.exports = {
    addCustomer: addCustomer,
    depositFunds: depositFunds,
    withdrawFunds: withdrawFunds,
    updateCredit: updateCredit,
    transferFunds: transferFunds,
    readCustomer: readCustomer,
    listCustomers: listCustomers
}
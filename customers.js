const fs = require('fs');
const chalk = require('chalk');


const addCustomer = (id) => {
    const users = loadUsers();
    const existingId = users.find((user) => user.id === id);

    if (!existingId) {
        users.push({
            id: id,
            funds: 0,
            credit: 0
        })
        saveUser(users);
        console.log(chalk.greenBright.inverse('New customer added to database'));
    } else {
        console.log(chalk.red.inverse('Customer ID already exists in database'));
    }

    saveUser(users);
}
const depositFunds = (id, funds) => {
    const users = loadUsers();
    const existingId = users.find((user) => user.id === id);
    const user = users.find((user) => user.id === id);


    if (existingId) {

        user.funds = user.funds + funds;

        saveUser(users);
        console.log(chalk.greenBright.inverse('Funds deposited successfully'));
    } else {
        console.log(chalk.red.inverse('Please enter a valid ID'));
    }
}

const withdrawFunds = (id, funds) => {
    const users = loadUsers();
    const existingId = users.find((user) => user.id === id);
    const user = users.find((user) => user.id === id);

    if (existingId) {

        user.funds = user.funds - funds;

        saveUser(users);
        console.log(chalk.greenBright.inverse('Funds withdrawn successfully'))
    } else {
        console.log(chalk.red.inverse('Please enter a valid ID'));
    }
}
const updateCredit = (id, credit) => {
    const users = loadUsers();
    const existingId = users.find((user) => user.id === id);
    const user = users.find((user) => user.id === id);

    if (existingId) {

        user.credit = credit;

        saveUser(users);
        console.log(chalk.greenBright.inverse('Credit score updated successfully'))
    } else {
        console.log(chalk.red.inverse('Please enter a valid ID'));
    }
}
const transferFunds = (id1, id2, funds) => {
    const users = loadUsers();
    const existingId1 = users.find((user) => user.id === id1);
    const existingId2 = users.find((user) => user.id === id2);
    const user1 = users.find((user) => user.id === id1);
    const user2 = users.find((user) => user.id === id2);

    if (existingId1) {
        if (existingId2) {
            user1.funds = user1.funds - funds;
            user2.funds = user2.funds + funds;

        } else {
            console.log(chalk.red.inverse('Please enter a valid recipient ID'))
        }
        saveUser(users);
        console.log(chalk.greenBright.inverse('Funds transferred successfully'))
    } else {
        console.log(chalk.red.inverse('Please enter a valid sender ID'));
    }

}
const readCustomer = (id) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === id);

    if (user) {
        console.log(chalk.inverse('Customer information'))
        console.log(chalk(`ID: ${user.id}`))
        console.log(chalk(`Funds: ${user.funds}`))
        console.log(chalk(`Credit Score: ${user.credit}`))
    }
}
const listCustomers = () => {
    const users = loadUsers();

    console.log(chalk.inverse('Customer List'));

    users.forEach((user) => {
        console.log(chalk.yellow.inverse('ID:') + ' ' + chalk.yellow(user.id))
    })
}

saveUser = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync('customers.json', dataJSON);
}

const loadUsers = () => {
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
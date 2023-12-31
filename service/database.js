const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const formCollection = db.collection('formHistory');
const userCollection = db.collection('users');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Connected successfully to DB server");
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
      };
      await userCollection.insertOne(user);
    
      return user;
}

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function submitNewForm(form) {
    console.log("Entered submitNewForm()");
    
    const result = await formCollection.insertOne(form);
    return result;
}
  
function getHistory() {
    console.log("Entered getHistory()");

    const query = {};
    const options = {
        sort: { date: -1 },
    };
    const cursor = formCollection.find(query, options);

    return cursor.toArray();
}

module.exports = { createUser, getUser, getUserByToken, submitNewForm, getHistory };
// /db/conn.js
const mongoose = require('mongoose');

const DB = process.env.DATABASE;


const db = mongoose.connect(DB, {}).then(() => {
    console.log('connected to DB');
}).catch((err) => {console.log(err); });
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://mongo:glZZEPaNu5EfpzZY@cluster0.pztdvdn.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Mongo connected');
            db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        })
}

const getDb = () => {
    if(db){
        return db;
    } else {
        throw 'No database found';
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
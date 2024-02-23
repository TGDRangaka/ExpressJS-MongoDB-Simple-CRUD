const db = 'your database';
const username = 'your username';
const password = 'your password';
const uri = `mongodb+srv://${username}:${password}@cluster0.vllnh4g.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;
module.exports = uri;
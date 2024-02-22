const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = require('./atlas_uri');

const app = express();
const client = new MongoClient(uri);
const collection = client.db('test').collection('users'); // Give your database and collection
app.use(express.json());

app.get('/user', async (req, res)=>{
    try {
        const users = await getUsers();
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/user', async (req, res)=>{
    try{
        const result = await saveUsers(req.body);
        res.status(201).json(result);
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/user', async (req, res)=>{
    try{
        const result = await updateUser(req.body);
        if(result.matchedCount >= 1){
            res.status(201).json(result);
        }else{
            res.status(400).send('User not found');
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/user', async (req, res)=>{
    try{
        const result = await deleteUser(req.query._id);
        if(result.deletedCount >= 1){
            res.status(201).json(result);
        }else{
            res.status(400).send('User not found');
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen('3000', ()=>{
    console.log('listening on port 3000');
});

const connectMongodb = async () => {
    try {
        await client.connect();
        console.log('===============Connected-to-MongoDB================');
    } catch (error) {
        console.log(error);
    }
}

connectMongodb();


async function getUsers(){
    try {
        const users = await collection.find().toArray();
        return users;
    } catch (error) {
        throw error;
    }
}

async function saveUsers(user){
    try {
        const result = await collection.insertOne(user);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateUser(user){
    try {
        user._id = new ObjectId(user._id)
        const result = await collection.updateOne({_id: user._id}, {$set:user});
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId){
    try {
        userId = new ObjectId(userId)
        const result = await collection.deleteOne({_id: userId});
        return result;
    } catch (error) {
        throw error;
    }
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Port = process.env.PORT || 3001
const Note = require('./model/Notes');
const fast2sms = require('fast-two-sms')
const User = require('./model/User')
require('dotenv').config()

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sumit:Sumitjambharkar@cluster0.tseta.mongodb.net/sundaymern?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true })

app.get('/',(req,res)=>{res.send("Hello note Book")})

app.post('/create', function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({
        title,
        content
    });
    newNote.save()
})

app.get('/notes',(req,res)=>{
    Note.find().then(resData=>res.json(resData))

})

app.delete('notes/:id',(req,res)=>{
    const id = req.params.id
    const iteam = Note.findByIdAndDelete({_id:id})
    res.json(iteam)
    
})

app.post('/user-wifi',async(req,res)=>{
    const wifiUser = await User.create(req.body)
    res.status(200).json(wifiUser)

})
app.post('/user-feedback',async(req,res)=>{
    const feedBack = await User.create(req.body)
    res.status(200).json(feedBack)

})
app.post('/user-send-message',async(req,res)=>{
    try{
        const user = await User.create(req.body)
        const respone = await fast2sms.sendMessage({authorization : process.env.API_KEY , message :req.body.message, numbers : [7021595850]})
        res.status(200).send(respone).json(user)
    }catch(err) {
        console.error(err);
    }

})

app.listen(Port,()=>{
    console.log(`sever running port ${Port}`);

})
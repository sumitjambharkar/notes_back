const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Port = process.env.PORT || 3001
const Note = require('./model/Notes');

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

app.get('/notes/:id',(req,res)=>{
    const {id} = req.params
    const iteam = Note.findOneAndDelete(id)
    res.json(iteam)
    
})

app.listen(Port,()=>{
    console.log(`sever running port ${Port}`);

})
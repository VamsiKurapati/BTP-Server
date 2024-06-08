const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dataModel = require('./models/data')
const port = 5000;

const app = express();

mongoose.connect('mongodb+srv://vamsikrishnak20:Vamsi@cluster0.a3q0epr.mongodb.net/BTP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})
.catch((err)=>{
    console.log(err)
})


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// app.get("/",(req,res) => {
//     res.status(200).send({
//         msg : "Hello"
//     })
// })

// app.use((req,res,next) => {
//     console.log("Hello");
//     next()
// })

// Define a route for the root URL
app.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const data = new dataModel(req.body);
        await data.save();
        res.status(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "internal server error"});
    }
});

app.get('/getdata',async (req,res) => {
    try {
        const data = await dataModel .find({})
        .sort({ createdAt: -1 }) // Sort in descending order based on creation time
        .limit(1)
        console.log(data);
        res.status(200).json(data[0])
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "internal server error"});
    }
})
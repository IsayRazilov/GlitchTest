const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 1221 
const storage = require('node-persist');
// var util = require('util');

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async  (req, res) => {
 
    res.sendFile("index.html")
})


// app.listen(port, () => console.log(`Running at port http://localhost:${port}`)); 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up");
});
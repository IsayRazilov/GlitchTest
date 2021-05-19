const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 1221 
const storage = require('node-persist');
// var util = require('util');
const donations = 'Donations'

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

storage.init().then(() => {
    
    storage.getItem(donations).then(res => {
        // Set new item in first init. 
        if (res === undefined) {
            storage.setItem(donations, []).then(() => {
                console.log(`Successfully initialized new local storage`); 
            })
        }
    }).catch(err => console.log(`Can't getItem Err: ${err}`)); 
    
}).catch(err => console.log(`Can't init storage Err: ${err}`)); 


app.get('/', async  (req, res) => {
 
    res.sendFile("index.html")
})

app.post('/give', async (req, res) => {
    
    try {

        let error = ''

        if (req.body.amount === undefined) {
            error = `Amount values is undefined`
            res.json({ res: error }); 
        }
        else if (req.body.amount < 0) {
            error = 'Amount is less then 0'
            res.json({ res: error }); 
        }
    
        let donationsArr = await storage.getItem(donations)
        
        donationsArr.push({
            amount: req.body.amount,
            date: new Date()
        })
    
        await storage.setItem(donations, donationsArr)
    
        res.json({ res: 'OK' })
        
    }
    catch (err) {
        res.json({ res: err });
    }

})

app.listen(port, () => console.log(`Running at port http://localhost:${port}`)); 
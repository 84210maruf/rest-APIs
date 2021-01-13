// const means IMPORT
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const ContactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')

//MONGODB- My DataBase_name: contacts-db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contacts-db')
//test database
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database Connection Established')
})


const app = express()



app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000



// App = routes

app.use('/api/contacts', ContactRoute)
app.use('/api/users', userRoute)


app.get('/', (req, res) => {
    res.send('<div><h1>Hellow World</h1></div>')
})










app.listen(PORT, () => {
    console.log(`server is Running on PORT ${PORT}`)
    
})
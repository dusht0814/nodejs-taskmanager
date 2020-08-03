const mongoose = require('mongoose')
const path = require('path')
const User = require('../models/user')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})



// const me = new User({
//     name : 'Daushyant',
//     age: 26,
//     email : 'IAMDUSHYANT@gmail.com',
//     password: 'chummi@1234'
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log('Error!', error)
// })



// const me2 = new tasks({
//     name: 'Watch netflix'
// })

// me2.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

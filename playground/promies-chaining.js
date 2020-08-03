require('../src/db/mongoose')
const User = require('../src/models/user')

//

User.findByIdAndUpdate('5f1d712a6c73f91dfcf97a18',{ age: 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
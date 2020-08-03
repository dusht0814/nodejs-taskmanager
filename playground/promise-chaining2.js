require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5f1d73720f5c7f1e10c06c51').then((task)=>{
//     console.log(task)
//     return Task.find({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const doSomething =  async(id) =>{ 
    await Task.findByIdAndUpdate(id,{completed:false})
    const cnt = await Task.countDocuments({completed:true})
    return cnt

}

doSomething('5f1ec582bd94ac230ce08224',true).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})





// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient


// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if (error){
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    // db.collection('users').findOne({_id: new ObjectID("5f17ff6d33d1430dc4e3036d")},(error, user)=> {
    //     if(error){
    //         return console.log('unable to fetch!')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age: 25}).count((error, count)=> {
    //     console.log(count)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f17ff6d33d1430dc4e3036d")
    // },  {
    //         $inc :{
    //             age: 1
    //         }
        
    // }).then( (result) => {
    //     console.log(result)
    // }) .catch((error)=>{
    //     console.log(error )
        
    // })

    // db.collection('tasks').updateMany({
    //     boolean : true
    // },  {
    //         $set :{
    //             boolean : false
    //         }
        
    // }).then( (result) => {
    //     console.log(result)
    // }) .catch((error)=>{
    //     console.log(error )
        
    // })k66

    db.collection('users').deleteMany({
        age: 25
    }.then( (result) => {
        console.log(result)
    }).catch((error)=>{
        console.log(error )
        
    })
    )



    // updatePromise.then( (result) => {
    //     console.log(result)
    // }) .catch((error)=>{
    //     console.log(error )
        
    // })
    // // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 25
    // },(error,results) => {
    //     if(error){
    //     return console.log('Unable to insert user!')
    // }
    // console.log(results.ops)
    // })


//     db.collection('users').insertMany([
//      {   name: 'Ross',
//         age: 32
//     },{
//         name:'Gunther',
//         age:52
//     }
// ],(error,results)=> {
//     if(error){
//         return console.log('Unable to insert documents!')
//     }
//     console.log(results.ops)
// }
//     )    
//     db.collection('tasks').insertMany([
//         {
//             desciption:'Wash clothes',
//             boolean: false
//         },
//         {
//             desciption:'bring groceries',
//             boolean: true
//         },
//         {
//             desciption:'call HR',
//             boolean: true
//         }

//     ],(error,results)=>{
//     if(error){
//         return console.log(error)
//     }
//     console.log(results.ops)
// })


 })
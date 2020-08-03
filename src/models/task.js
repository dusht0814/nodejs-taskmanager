const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema =  new mongoose.Schema({
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed : {
        type: Boolean,
        default : false
    
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps:true
})

taskSchema.methods.toJSON = function(){
    const task = this
    const taskObject = task.toObject()
    delete taskObject.owner
    delete taskObject._id
    delete taskObject.__v
    return taskObject
}

const tasks = mongoose.model('tasks',taskSchema)

module.exports = tasks
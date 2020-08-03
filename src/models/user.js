const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true 
    },
    age:{
        type : Number,
        required: true
    },  
    email: {
        type: String,
        unique: true,
        trim : true,
        lowercase: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }

    },
    password: {
        type: String,
        trim: true,
        required:true,
        minlength:6,
        validate(value){
             if(value.toLowerCase().includes('password')){
                throw new Error("password can't contain the string password!")
            }
        }

    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
    
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token

}

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    console.log('just before saving')

    next()
})

userSchema.pre('remove',async function (next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()

})

const User = mongoose.model('User',userSchema)

module.exports= User


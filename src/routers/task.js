const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
    await task.save()
    res.status(201).send(task) }
    catch{
        res.status(400).send(error)
    }
})



router.get('/tasks',auth,async(req,res)=>{
    try{
        const tasks = await Task.find({owner:req.user._id})
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        
        const completedTask= []
        tasks.forEach((doc)=>{
            if(doc.completed.toString() === req.query.completed)
                completedTask.push(doc)
            if(req.query.completed===undefined)
                completedTask.push(doc)
            
        })
        // const limitedTask =[]
       
        // const from = skip
        // const to = from+limit
        // if(completedTask.length < from){
        //     limitedTask.push(completedTask)
        // }
        // else{  
        //     for(i = from ; i<to ; i++){
        //         limitedTask.push(completedTask[i])
        //     }
        // }
         //   console.log(limitedTask.length)
       

         tasks = tasks.filter((task)=>{
             console.log(task.completed.toString() , ' ',req.query.completed)
            return (task.completed.toString() === req.query.completed);
         })
          res.status(202).send(tasks)
    }catch(e){
        res.status(500).send()
        
        
    }
})

    

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
    const task = await Task.findOne({_id,owner: req.user._id}) 
    if(!task){
             res.status(400).send(task)
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})


router.patch('/tasks/:id', auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every( (update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update'})
    }

    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
      
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id', auth,async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.send(500).send()
    }
})

module.exports = router
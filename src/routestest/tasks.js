const express = require("express");
const router=express.Router()

const auth=require('../middleware/auth')
const {addtask,updateTask,getAllTasks,deletetask}=require('../routes/task')

router.post('/add',auth,addtask)
router.get('/get/:id',getAllTasks)
router.delete('/delete/:id',deletetask)
router.put('/update/:id',updateTask)
module.exports= router
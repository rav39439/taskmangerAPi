
const mongoose=require('mongoose')

const taskmodel=require('../model/taskmodel')
const addtask=async(req,res)=>{
    const task=req.body;
    const posttask=new taskmodel({
        ...task
    })
    try{
        await posttask.save();
        res.status(200).json("Posted new question successfully")

    } catch(err){
        console.log(err)
        res.status(400).json("Couldn't post a new question")
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params; // Extract task ID from request parameters
    const updatedTask = req.body; // Get updated task data from request body

    try {
        const task = await taskmodel.findByIdAndUpdate(id, updatedTask, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong while updating the task" });
    }
};


const getAllTasks=async(req,res)=>{
    const { id } = req.params; // Extract task ID from request parameters

    try{
        const tasklist=await taskmodel.find({userid:id});
        res.status(200).json(tasklist)
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

// const deletetask=async(req,res)=>{
//     const { id } = req.params; // Extract task ID from request parameters

//     try{
//         console.log(id)

//         await taskmodel.findByIdAndRemove({_id:id});
//          res.status(200).json({message:"Successfully deleted"})
//     }  catch(err){
//         res.status(404).json({message:err.message})
//     }
// }

const deletetask = async (req, res) => {
    const { id } = req.params; // Extract task ID from request parameters

    try {
        console.log("Deleting task with ID:", id);

        const deletedTask = await taskmodel.findByIdAndDelete(id); // Pass only the ID
        console.log(deletedTask);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports={addtask,updateTask,getAllTasks,deletetask}
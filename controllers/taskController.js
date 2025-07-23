const Task = require('../models/Tasks');

class TaskController{
    // [GET] /tasks 
    async get(req, res, next){
        const userId = req.user.id;
        let tasks = await Task.find({user : userId})
        res.json(tasks)
    }

    // [POST] /tasks
    async create(req, res, next){
        const {title} = req.body;
        const userId = req.user.id;
        console.log("decoded user : ", req.user);
        if(!title){
            return res.status(404).json({error : "invalid title"});
        }
        const newTask = await Task.create({title, user: userId});
        res.status(201).json({newTask});
    }

    // [GET] /tasks/todos
    async todo(req, res, next){
        const body = req.user;
        const username = body.username;
        const toDoList = await Task.find({user : body.id})
        res.json({username, toDoList});
    }
    
    async update(req, res, next){
        const {id} = req.params;
        const {title} = req.body;
        const updatedTask = await Task.findById(id)
        await updatedTask.updateOne({title});
        res.json({msg : "Updated done!"})
    }

    async delete(req, res, next){
        const {id} = req.params;
        await Task.deleteOne({ _id : id });
        res.json({msg : "Deleted done!"})
    }

    async toggle(req, res, next){
        const {id} = req.params;
        const toggleTask = await Task.findById(id)

        // the noob way
        // // res.send(toggleTask['completed']); return;
        // let tmp = {};
        // tmp = {...toggleTask.toObject(), completed : !toggleTask['completed]};
        // await toggleTask.updateOne(tmp);
        // res.json({msg : "Updated done!"})

        // the pro way
        toggleTask.completed = !toggleTask.completed;
        await toggleTask.save();
        res.json({msg : "Updated done!"})
    }
}

module.exports = new TaskController();
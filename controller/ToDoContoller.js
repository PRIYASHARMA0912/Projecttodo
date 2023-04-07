const todos = require("../models/todotable")

const TODO = []
let id = 0

const index = (req, res) => {
    try {
        return res.render('ToDo')
    } catch (error) {
        console.error(error)
    }
}

const addTodo =  async(req, res) => {
    try {
        const reqData = req.body;
        const userId = req.user.id;
        if (!reqData.taskinput) {
            return res.send('please fill all mandatory fields') // validation
        }
        
        const insertData = await todos.create({
            todo : reqData.taskinput,
            userId,
            isDone :false,
            
        })
        console.log("hyyyyyy");
        if(!insertData) {
            return  res.send("Something went wrong");
        }
        return res.json({ message: 'ToDo added successfully!', status: true, toDoObj : insertData })
    } catch (error) {
        console.error(error)
    };
}



module.exports = {
    index,
    addTodo
}
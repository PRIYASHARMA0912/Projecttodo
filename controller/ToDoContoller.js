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
        
      
        if(!insertData) {
            return  res.send("Something went wrong");
        }
        return res.json({ message: 'ToDo added successfully!', status: true, toDoObj : insertData })
    } catch (error) {
        console.error(error)
    };
}


const updateToDo = async (req,res) => {
    try{
         console.log(req.body)
         console.log(req.user)
    }catch(error){
          console.error(error);
    }
}
/*const deleteToDo = async (req ,res) => {

    try{
        
            
          });
          
         
        
    } catch (error){

    }
}
 */

const check = async(req,res) => {
    try{
         console.log("working");
        const result= await todos.update({isDone : true})
        return res.json({ message: 'Task completed successfully!', status: true, toDoObjj : result })
    }catch (error) {
        console.error(error)
    }
}

const deleteall = async(req,res) => {
    try{
        console.log("reached");
       const deleted = await todos.destroy({where:{} , truncate : true})
       return res.json({ message: 'ToDo deleted successfully ', status: true, toDoObjjj : deleted })
        
    }catch (error) {
        console.error(error)
    }
}

module.exports = {
    index,
    addTodo,
   // deleteToDo,
    updateToDo,
    check,
    deleteall
}
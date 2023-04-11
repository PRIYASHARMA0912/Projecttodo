const todos = require("../models/todotable")

const TODO = []
let id = 0

const index = async(req, res) => {
    try {
        const findAllToDo = await todos.findAll({where : { userId : req.user.id}})
        return res.render('ToDo' , {findAllToDo})
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

/*
const updateToDo = async (req,res) => {
    try{
         console.log(req.body)
         console.log(req.user)
    }catch(error){
          console.error(error);
    }
}
const deleteToDo = async (req ,res) => {

    try{
        
            
          });
          
         
        
    } catch (error){

    }
}
 */

const check = async(req,res) => {
    try{
        
        
         
         const checked = req.body.check
         console.log(checked);
        const result= await todos.update({ isDone: "true"} , {where: {Id: checked}})
        return res.json({ message: 'Task completed successfully!', status: true, toDoCheck : result })
    }catch (error) {
        console.error(error)
    }
}

const deleteall = async(req,res) => {
    try{
        
        let useeer= req.user.id
        
       const deleted = await todos.destroy({where:{userId :useeer } , truncate : true})
       return res.json({ message: 'ToDo deleted successfully ', status: true })
        
    }catch (error) {
        console.error(error)
    }
}

module.exports = {
    index,
    addTodo,
   // deleteToDo,
   // updateToDo,
    check,
    deleteall
}
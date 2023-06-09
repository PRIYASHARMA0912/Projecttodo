const todos = require("../models/todotable")
const users = require("../models/users")

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
        console.log(req.body)
        console.log(req.param)
        console.log(req.query)

        
        if (!reqData.toDoData) {
            return res.send('please fill all mandatory fields') // validation
        }
        
        const insertDat̥̥a = await todos.create({
            todo : reqData.toDoData,
            userId,
            isDone :false,
            
        })
        
      
        if(!insertDat̥̥a) {
            return  res.send("Something went wrong");
        }
        
        return res.json({ message: 'ToDo added successfully!', status: true, toDoObj : insertDat̥̥a })
    } catch (error) {
        console.error(error)
    };
}


const deleteToDo = async (req ,res) => {

    try{
        const deleteId = req.body.toDelete
        console.log(deleteId)
        
        
            
          } catch (error){
            console.log(erro̥r)
    }
}  
 

const check = async(req,res) => {
    try{
         const checked = req.body.check
         console.log("req.body", req.body)
         console.log("req.parametre", req.param)
         console.log("req.query", req.query)
         
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



const getSingleTodo = async(req,res)=>{
    try{
        const todoId = req.query.update;
        console.log("req body" , req.body)
        console.log("req query" , req.query)
        console.log("req paramss" , req.params)
        console.log(todoId);
        const getAToDo = await todos.findOne({where:{id:todoId}})
        console.log(getAToDo);
        return res.json({message:"update task working",status:true,toDoObj:getAToDo})
    }
    catch(error){
        console.log(error)
    }
}


const updatedTask = async(req,res)=>{
    try{
        console.log(req.body)
        const getUpdatedTodoId = req.body.todoId;
        console.log("response from updated task",getUpdatedTodoId)
        
        
        console.log(getUpdatedTodoId);
        const updateTodo = await todos.update({todo: req.body.value},{where:{id:getUpdatedTodoId}})
        console.log(updateTodo);
        return res.json({message:"update on screen working",status:true,updatedObj:updateTodo})
    }
    catch(error){
            console.log(error)
    }
}

const userData = async(req , res)=>{
    try{
        console.log("userdata is being processed");
        console.log(req.user.id)
        const currentUser = await users.findOne({where:{id:req.user.id}})

        console.log(currentUser);
        return res.json({message:"update on screen working",status:true, object :currentUser})
    }catch(error){
        console.log(error)
    }
}
  const updateUserProfile = async(req,res) => {
   
    const newFirstname = req.body.updatedfirstname
    const newLastname = req.body.updatedlastname
    const newEmail = req.body.updatedemail
    console.log(newFirstname);
    console.log(newLastname);
    console.log(newEmail);
    const updatedProfileObj = await users.update({firstName : req.body.updatedfirstname , lastName :req.body.updatedlastname ,email: req.body.updatedemail } , {where : {id : req.user.id}})
    console.log(updatedProfileObj)
    return res.json({message:"updated userProfile", status:true , finalProfileobj :updatedProfileObj  })

  }

module.exports = {
    index,
    addTodo,
    deleteToDo,
    updatedTask ,
    check,
    deleteall,
    getSingleTodo,
    userData,
    updateUserProfile
}
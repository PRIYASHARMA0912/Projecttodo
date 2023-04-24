function onSubmitToDo(event){
    event.preventDefault()
    const toDoData = $('#taskinput').val()
    $.ajax({
        type:"POST",
        url:"/toDo/addToDo",
        data:{ toDoData },
        success: function(response){
           console.log( "hyy", response.toDoObj);
           const row = `<tr><td>${response.toDoObj.id}</td>
           <td>${response.toDoObj.todo}</td>
           <td><input type=checkbox id="checkboxx" title="check"  data-toDoid= "${response.toDoObj.id}"  onclick="check(this)" value=${response.toDoObj.isDone}>
           <button id="btn" onclick = "getTodo(this)" data-update = "${response.toDoObj.id}">Update</button></td>
           
           </tr>`
           $('#toDoBody').append(row)
           
        },
        error: function (response) {
            // hide_loader();
        },
    });

        }
    




function deleteToDo(_this){
     const toDelete = $(_this).data('del')
    $.ajax({
        type: "DELETE",
        url : "/toDo/deleteToDo",
        data :{toDelete} ,
        success: function(response){
             console.log(response);
        },
        error: function (response) {
            // hide_loader();

        },
    })
}




function check(_this){
    
    const check = $(_this).data('todoid')
    $.ajax({
        type :"PUT",
        url: "/toDo/check",
        data: {check},
        success: function(response){
            console.log(response);
        }
    })
}



function deleted(event){
  event.preventDefault()
    $('#toDoBody').empty()
    $.ajax({
        type :"DELETE",
        url: "/toDo/deleteall",
        success: function(response̥̥̥̥){
            console.log(response);  
        }
    })
}



function getTodo(_this){
    const update = $(_this).data('update');
    $.ajax({
        type:"GET",
        url: "/toDo/getSingleToDo",
        data:{update},
        success :function(response){
            console.log(response);
            $('#taskinput').val(response.toDoObj.todo)
            //$('#tasksubmit').val("Update Task") ;
            $('#submitTodo').html(`
            <input type="button" id="updatetasksubmit" onclick="updatetask(this)" value="Update Task" data-todoid=${response.toDoObj.id}>`)
            
           
        }
    })
}


function updatetask(_this){
   
    const todoId = $(_this).data('todoid');
    const value = $("#taskinput").val();
    console.log("reached updatetask");
    console.log(todoId);
    $.ajax({
        type:"PUT",
        url:"/toDo/updatedTask",
        data:{todoId,value},
        success:
        function(response){
            console.log(response);
            window.location.reload();
          
        }
    })
}

function userProfile(_this){
    
    console.log("this is working");
    document.querySelector('#header').style.display = "none";
    document.querySelector('#header').style.pointerEvents = "none";
     document.querySelector('#main').style.display = "none";
     document.querySelector('#main').style.pointerEvents = "none";
     document.querySelector('.form').style.display = "block";
     document.querySelector('.form').style.pointerEvents = "all";
    $('#userButton').val("Home");
    $('#buTTon').html(`<input id="homeButton" type="submit" value="Home" onclick="gotoHome(event)">`);
   
    $.ajax({
        type:"GET",
        url: "/toDo/userProfile",
        
        success :
         function(response){
            $('#exampleInputfirstName').val(response.object.firstName);
            $('#exampleInputlastname').val(response.object.lastName);
            $('#exampleInputEmail1').val(response.object.email);
            $('#exampleInputPassword1').val(response.object.password);
         }
    })
        
}
function editFirstname(event){
    event.preventDefault()
    console.log("button is working");
     const updatedfirstname=$('#exampleInputfirstName').val();
     console.log(updatedfirstname)
     $.ajax({
        type:"PUT",
        url:"/toDo/updateFirstname",
        data: {updatedfirstname},
        success :
        function (response){
            console.log(response);
        }
     })
}

function gotoHome(event){
    window.location.reload();
} 
  
function allowEdit1(event)
{
    $('#exampleInputEmail1').removeAttr("readonly");
    console.log("removed");
}

function allowEdit2(event)
{
    $('#exampleInputfirstName').removeAttr("readonly");
    console.log("removed");
}

function allowEdit3(event)
{
    $('#exampleInputlastname').removeAttr("readonly");
    console.log("removed");
}

function updateProfile(event){
    event.preventDefault()
    console.log("button is working");
    const updatedfirstname=$('#exampleInputfirstName').val();
    const updatedlastname=$('#exampleInputlastname').val();
    const updatedemail=$('#exampleInputEmail1').val();
    console.log(updatedfirstname)
    console.log(updatedlastname)
    console.log(updatedemail)
    $.ajax({
        type: "PUT",
        url: "/toDo/updateProfile",
        data: {updatedfirstname ,updatedlastname, updatedemail },
        success:
           function (response){
            console.log(response);
           }
    })

}
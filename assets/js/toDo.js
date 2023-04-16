
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
           <button id="btn" onclick = "getToDo(this)" data-update = "${response.toDoObj.id}">Update</button></td>
           
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



function getToDo(_this){
    const update = $(_this).data('update');
    $.ajax({
        type:"GET",
        url: "/toDo/getSingleToDo",
        data:{update},
        success :function(response){
            console.log(response);
            $('#taskinput').val(response.toDoObj.todo)
            $('#tasksubmit').val("Update Task") ;
            $('#submitToDo').html(`
            <input type="submit" id="updatetasksubmit" value="Update Task" data-updateid=${response.toDoObj.id} onsubmit="updateTask(this)">`)  
        }
    })
}


function updateTask(_this){
    

    const postToDo = $(_this).data('updateid');
    console.log(postToDo);
    
    $.ajax({
        type: "POST",
        url : "toDo/postToDo",
        data: {postToDo},
        success : function(response){
            console.log(response);
        }
    })
}
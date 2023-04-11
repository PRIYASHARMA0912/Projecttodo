function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    
    const requestBody = todoData.reduce((obj, item) => {
        
        obj[item.name] = item.value;
        console.log(obj);
        return obj;
    }, {});
    
    
    if (!requestBody) {
        $('#errorMsg').html('Please fill all Mandatory Fields')
        return;
    }
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: requestBody,
        success: function (response) {
            
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)
            
           
            const row = `<tr><td>${response.toDoObj.id}</td>
            <td>${response.toDoObj.todo}</td>
            <td><input type=checkbox id="checkboxx" title="check"  data-id= "${response.toDoObj.id}" placeholder="tick" onclick="check(this)" value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
            </td></tr>`
            $('#toDoBody').append(row)
            
            


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}


function updateToDo(_this){
    
    const toDoId = $(_this).data('id')
    console.log($(_this));
    $.ajax({
        type : "PUT",
        url:"/toDo/updateToDo",
        data: {toDoId},
        success: function(response){
            console.log(response);

        },
        error: function (response) {
            // hide_loader();

        },
    })
    
}


function deleteToDo(event){
    
    event.preventDefault()
    $.ajax({
        type: "DELETE",
        url : "/toDo/deleteToDo",
        data : requestBody,
        success: function(response){
             console.log(response);
        },
        error: function (response) {
            // hide_loader();

        },
        
    })
}


function check(_this){
    
    const check = $(_this).data('id')
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
        
        success: function(response){
            console.log(response);
           
        }
    })
}


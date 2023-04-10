function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    
    const requestBody = todoData.reduce((obj, item) => {
        
        obj[item.name] = item.value;
        console.log(obj);
        return obj;
    }, {});
    
    console.log(todoData);
    console.log(requestBody);
    if (!todoData) {
        $('#errorMsg').html('Please fill all Mandatory Fields')
        return;
    }
    $.ajax({
        type: "POST",
        url: "/toDo/addToDo",
        data: todoData,
        success: function (response) {
            console.log(response)
            console.log("🚀 ~ file: toDo.js:26 ~ response:", response.toDoObj)
            
           
            const row = `<tr><td>${response.toDoObj.id}</td>
            <td>${response.toDoObj.todo}</td>
            <td><input type=checkbox id="checkboxx" title="check"  data-idd= "${response.toDoObj.id}" placeholder="tick" onclick="check(this)" value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
            <button id="buttonn" data-id="${response.toDoObj.id}" onclick="updateToDo(this)">Update</button> &nbsp &nbsp &nbsp
            <button id="buttonnn" onclick="deleteToDo(event)"> Delete </button></td></tr>`
            $('#toDoBody').append(row)
            
            


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}


function updateToDo(_this){
    console.log("function called");
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
    console.log("ye bhi chal raha hai");
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
    console.log("check is working");
    const check = $(_this).data('idd')
    $.ajax({
        type :"PUT",
        url: "/todo/check",
        data: {check},
        success: function(response){
            console.log(response);
        }
    })
}

function deleted(event){
    console.log("deleted is working");
    

    event.preventDefault()
    $('#toDoBody').empty()
    
    $.ajax({
        type :"DELETE",
        url: "/toDo/deleteall",
        //data: req.user.id,
        success: function(response){
            console.log(response);
           
        }
    })
}


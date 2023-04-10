function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    const requestBody = todoData.reduce((obj, item) => {
        console.log( obj,item)
        console.log( "exactly",todoData)
        obj[item.name] = item.value;
        console.log('hey', obj, item)
        return obj;
    }, {});
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
            <td><input type=checkbox id="checkboxx" title="check" placeholder="tick" onclick="check(event)" value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
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
        data : req.user.id,
        success: function(response){
             console.log(response);
        },
        error: function (response) {
            // hide_loader();

        },
        
    })
}


function check(event){
    console.log("check is working");
    $.ajax({
        type :"POST",
        url: "/todo/check",
        data: req.user.id,
        success: function(response){
            console.log(response.todoobjj);
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
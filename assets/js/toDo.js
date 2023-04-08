function onSubmitTodo(event) {
    event.preventDefault()
    const todoData = $('#taskform').serializeArray()
    const requestBody = todoData.reduce((obj, item) => {
        console.log(obj,item)
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
            <td><input type=checkbox id="checkboxx" title="check" placeholder="tick"  value=${response.toDoObj.isDone}> &nbsp &nbsp &nbsp
            <button id="buttonn" onclick="updateToDo(event)">Update</button> &nbsp &nbsp &nbsp
            <button id="buttonnn" onclick="deleteToDo(event)"> Delete </button></td></tr>`
            $('#toDoBody').append(row)
            
            


            // hide_loader();

        },
        error: function (response) {
            // hide_loader();

        },
    });

}

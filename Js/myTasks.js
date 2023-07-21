(function fetchMyTasks (){
    let username = localStorage.getItem("userName");

    sendRequest("api/ChangeForm/fetchmyTasks?userName="+username, "GET",{}, (data) => {
        tasksCaller(data);
    });
})()
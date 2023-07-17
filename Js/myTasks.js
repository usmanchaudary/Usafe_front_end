(function fetchMyTasks (){
    let username = localStorage.getItem("userName");

    sendRequest("api/ChangeForm/fetchReports?userName="+username, "GET",{}, (data) => {
        tasksCaller(data);
    });
})()
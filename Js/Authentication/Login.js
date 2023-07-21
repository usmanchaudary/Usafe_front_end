const Login = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = {username: username, password: password};
   sendRequest('api/account/login', 'POST', JSON.stringify(data), (data) => {
    if(data){
        if(data.status === 'success'){
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("siteId", data.siteId);
            //set token
            localStorage.setItem("token", data.token);
            localStorage.setItem("userRole", data.userRole);
            localStorage.setItem("fullName", data.fullName);
            //make an api call to get departments and store it in local storage
            sendRequest('Department/GetDepartments?siteId='+data.siteId, 'GET', {}, (data) => {
                if(data){
                    localStorage.removeItem("departments");
                    localStorage.setItem("departments", JSON.stringify(data));
                    window.location.href = '/Pages/reporting/reporting.html'
                }
                else{
                    console.log("Error in getting departments");
                }
            });

            //set expiry date to 1 day
            let expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            localStorage.setItem("expiryDate", expiryDate);
        }
        else{    
            alert(data.message);
        }
    }
   });
}
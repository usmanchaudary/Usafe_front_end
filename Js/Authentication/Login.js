const Login = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = {username: username, password: password};
   sendRequest('api/account/login', 'POST', JSON.stringify(data), (data) => {
    if(data){
        if(data.status === 'success'){
            localStorage.setItem("userName", data.userName);
            //set expiry date to 1 day
            let expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            localStorage.setItem("expiryDate", expiryDate);
            window.location.href = '/Pages/reporting/reporting.html'
        }
        else{    
            alert(data.message);
        }
    }
   });
}
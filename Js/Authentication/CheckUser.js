let userName = localStorage.getItem("userName");
//check for expiry date of user
let expiryDate = localStorage.getItem("expiryDate");
if(expiryDate){
    let currentDate = new Date();
    if(currentDate > expiryDate){
        localStorage.removeItem("userName");
        localStorage.removeItem("expiryDate");
        window.location.href = '/Pages/Authentication/loginPage/loginPage.html';
    }
}
else{
    localStorage.removeItem("userName");
    localStorage.removeItem("expiryDate");
    window.location.href = '/Pages/Authentication/loginPage/loginPage.html';
}
if(!userName){
    window.location.href = '/Pages/Authentication/loginPage/loginPage.html';
}
